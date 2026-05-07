#!/usr/bin/env bash
set -euo pipefail

# Deploy sse-edge (web) + echo-worker + llm-worker to a single Heroku app as
# one combined slug. All three process types share the same Redis add-on.
#
# The slug is a normal Node app: a unified package.json with all apps'
# runtime deps, three compiled dist/ directories under web/, worker_echo/ and
# worker_llm/, and a vendored copy of @chat/protocol referenced as a file:
# dependency. Heroku runs a clean `npm install` against that — no monorepo
# buildpack, no workspace deps, no shipped node_modules.
#
# A small dispatcher (worker.js) at the slug root selects the worker
# implementation at runtime via WORKER_MODE=echo|llm. The Procfile points
# the `worker` process type at the dispatcher, so switching workers is one
# `heroku config:set WORKER_MODE=...` away — no redeploy needed.
#
# After the first deploy:
#   heroku config:set WORKER_MODE=echo -a <app>   # or llm
#   heroku ps:scale web=N worker=1 -a <app>
#
# Override the target git URL with HEROKU_GIT_URL=<url>; otherwise the
# repo's `heroku` git remote is used. Set DEPLOY_DRY_RUN=1 to assemble the
# slug and print its path without pushing.

REPO_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$REPO_ROOT"

if [[ "${DEPLOY_DRY_RUN:-0}" != "1" ]]; then
  HEROKU_GIT_URL="${HEROKU_GIT_URL:-$(git remote get-url heroku)}"
fi
COMMIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo nogit)"
COMMIT_MSG="deploy ${COMMIT_SHA} $(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo "==> Building workspace (sse-edge + echo-worker + llm-worker + deps)"
pnpm --filter sse-edge... --filter echo-worker... --filter llm-worker... build

DEPLOY_DIR="$(mktemp -d -t heroku-slug-XXXXXX)"
if [[ "${DEPLOY_DRY_RUN:-0}" != "1" ]]; then
  trap 'rm -rf "$DEPLOY_DIR"' EXIT
fi

echo "==> Assembling combined slug at $DEPLOY_DIR"

# 1. Each app's compiled output goes into its own subdirectory.
mkdir -p "$DEPLOY_DIR/web" "$DEPLOY_DIR/worker_echo" "$DEPLOY_DIR/worker_llm"
cp -R apps/sse-edge/dist     "$DEPLOY_DIR/web/dist"
cp -R apps/echo-worker/dist  "$DEPLOY_DIR/worker_echo/dist"
cp -R apps/llm-worker/dist   "$DEPLOY_DIR/worker_llm/dist"

# 2. Heroku metadata at the slug root.
cp apps/sse-edge/.nvmrc      "$DEPLOY_DIR/.nvmrc"
cp apps/sse-edge/app.json    "$DEPLOY_DIR/app.json"

# Worker dispatcher: chooses an implementation based on WORKER_MODE.
# Defaults to echo so a misconfiguration doesn't surprise-bill the OpenAI
# account. Unknown modes fail fast.
cat > "$DEPLOY_DIR/worker.js" <<'EOF'
const mode = (process.env.WORKER_MODE || 'echo').toLowerCase();
const entry = { echo: './worker_echo/dist/index.js', llm: './worker_llm/dist/index.js' }[mode];
if (!entry) {
  console.error(`[worker dispatcher] unknown WORKER_MODE=${mode}; expected echo|llm`);
  process.exit(1);
}
console.error(`[worker dispatcher] starting ${mode} (${entry})`);
await import(entry);
EOF

# Procfile points at the dispatcher; switching workers is a config var
# change, no redeploy required.
cat > "$DEPLOY_DIR/Procfile" <<'EOF'
web: node web/dist/index.js
worker: node worker.js
EOF

# 3. Vendor @chat/protocol once; all apps resolve it via the file: dep.
mkdir -p "$DEPLOY_DIR/vendor/chat-protocol"
cp -R packages/chat-protocol/dist "$DEPLOY_DIR/vendor/chat-protocol/dist"
node --input-type=module -e "
  import fs from 'node:fs';
  const pkg = JSON.parse(fs.readFileSync('packages/chat-protocol/package.json', 'utf8'));
  delete pkg.scripts;
  delete pkg.devDependencies;
  fs.writeFileSync('$DEPLOY_DIR/vendor/chat-protocol/package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# 4. Combined package.json: union of all apps' runtime deps + the vendored
#    @chat/protocol as a file: dep. Conflicts (same dep, different ranges)
#    surface here: the script aborts so we don't ship mismatched versions.
node --input-type=module -e "
  import fs from 'node:fs';

  const edge = JSON.parse(fs.readFileSync('apps/sse-edge/package.json', 'utf8'));
  const echo = JSON.parse(fs.readFileSync('apps/echo-worker/package.json', 'utf8'));
  const llm  = JSON.parse(fs.readFileSync('apps/llm-worker/package.json', 'utf8'));

  const merged = {};
  for (const [src, deps] of [['edge', edge.dependencies], ['echo', echo.dependencies], ['llm', llm.dependencies]]) {
    for (const [name, range] of Object.entries(deps)) {
      if (name === '@chat/protocol') continue;
      if (merged[name] && merged[name] !== range) {
        console.error(\`Version conflict for \${name}: existing=\${merged[name]} \${src}=\${range}\`);
        process.exit(1);
      }
      merged[name] = range;
    }
  }
  merged['@chat/protocol'] = 'file:./vendor/chat-protocol';

  const slug = {
    name: 'sse-edge-slug',
    version: edge.version,
    private: true,
    type: 'module',
    engines: edge.engines,
    scripts: { start: 'node web/dist/index.js' },
    dependencies: merged,
  };
  fs.writeFileSync('$DEPLOY_DIR/package.json', JSON.stringify(slug, null, 2) + '\n');
"

if [[ "${DEPLOY_DRY_RUN:-0}" == "1" ]]; then
  echo "==> Dry run: slug ready at $DEPLOY_DIR"
  echo "    Procfile:"
  sed 's/^/      /' "$DEPLOY_DIR/Procfile"
  echo "    worker.js:"
  sed 's/^/      /' "$DEPLOY_DIR/worker.js"
  echo "    Top-level files:"
  (cd "$DEPLOY_DIR" && find . -maxdepth 2 -type f | sort | sed 's/^/      /')
  exit 0
fi

echo "==> Initializing deploy git repo"
cd "$DEPLOY_DIR"
git init -q -b main
git add -A
git -c user.email=deploy@local -c user.name=deploy commit -q -m "$COMMIT_MSG"

echo "==> Force-pushing to $HEROKU_GIT_URL"
git push --force "$HEROKU_GIT_URL" main:main
