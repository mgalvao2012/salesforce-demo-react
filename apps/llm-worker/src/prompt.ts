import type { HistoryRow } from './db.js';

const DEFAULT_SYSTEM_PROMPT =
  'You are a helpful assistant embedded in a Salesforce-hosted React chat UI. ' +
  'Be concise. Format short answers as plain text; use Markdown only when it helps clarity.';

export const systemPrompt = (): string =>
  process.env.SYSTEM_PROMPT && process.env.SYSTEM_PROMPT.trim().length > 0
    ? process.env.SYSTEM_PROMPT
    : DEFAULT_SYSTEM_PROMPT;

/** Gemini content shape: role is 'user' or 'model'; assistant maps to 'model'. */
export interface GeminiContent {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export interface GeminiPrompt {
  systemInstruction: string;
  contents: GeminiContent[];
}

/**
 * Builds the Gemini-shaped prompt from stored history + the new user turn.
 *  - System prompt is returned separately (Gemini takes it as `systemInstruction`).
 *  - Contents alternate user/model. 'system' history rows are folded into the
 *    system instruction; 'tool' rows are dropped (the MVP doesn't expose tools).
 *  - 'assistant' maps to Gemini's 'model' role.
 *  - Caller is responsible for trimming history to fit the context window.
 */
export function buildPrompt(
  history: HistoryRow[],
  newUserContent: string,
  system: string = systemPrompt(),
): GeminiPrompt {
  const systemAdditions: string[] = [];
  const contents: GeminiContent[] = [];

  for (const row of history) {
    if (row.role === 'user') {
      contents.push({ role: 'user', parts: [{ text: row.content }] });
    } else if (row.role === 'assistant') {
      contents.push({ role: 'model', parts: [{ text: row.content }] });
    } else if (row.role === 'system') {
      systemAdditions.push(row.content);
    }
    // 'tool' rows are dropped.
  }

  contents.push({ role: 'user', parts: [{ text: newUserContent }] });

  const systemInstruction =
    systemAdditions.length > 0 ? `${system}\n\n${systemAdditions.join('\n\n')}` : system;

  return { systemInstruction, contents };
}
