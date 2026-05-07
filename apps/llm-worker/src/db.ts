import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required');

// Heroku Postgres serves a self-signed cert; relax verification.
const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes('localhost') ? undefined : { rejectUnauthorized: false },
  max: 5,
});

export async function migrate(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_history (
      id BIGSERIAL PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      message_id TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'tool')),
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (message_id)
    );
  `);
  await pool.query(`
    CREATE INDEX IF NOT EXISTS chat_history_conv_created_idx
      ON chat_history (conversation_id, created_at);
  `);
}

export interface HistoryRow {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
}

/** Returns the last `limit` messages for a conversation, oldest-first. */
export async function loadHistory(conversationId: string, limit = 20): Promise<HistoryRow[]> {
  const { rows } = await pool.query<HistoryRow>(
    `SELECT role, content
       FROM chat_history
      WHERE conversation_id = $1
      ORDER BY created_at DESC
      LIMIT $2`,
    [conversationId, limit],
  );
  return rows.reverse();
}

export async function appendMessage(args: {
  conversationId: string;
  messageId: string;
  role: HistoryRow['role'];
  content: string;
}): Promise<void> {
  await pool.query(
    `INSERT INTO chat_history (conversation_id, message_id, role, content)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (message_id) DO NOTHING`,
    [args.conversationId, args.messageId, args.role, args.content],
  );
}

export async function closePool(): Promise<void> {
  await pool.end();
}
