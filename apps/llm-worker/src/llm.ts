import { GoogleGenAI } from '@google/genai';
import type { GeminiPrompt } from './prompt.js';

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) throw new Error('GOOGLE_API_KEY is required');

const client = new GoogleGenAI({ apiKey });

const MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';

export interface StreamResult {
  text: string;
  tokens: number;
}

export interface StreamCallbacks {
  onDelta: (delta: string) => void | Promise<void>;
}

/**
 * Streams a Gemini chat completion and returns the assembled text + token
 * count. Each non-empty chunk text fires `onDelta`. Token count comes from
 * the final chunk's usageMetadata when present; otherwise we fall back to
 * the chunk count as a rough proxy.
 */
export async function streamChat(
  prompt: GeminiPrompt,
  callbacks: StreamCallbacks,
  signal: AbortSignal,
): Promise<StreamResult> {
  const stream = await client.models.generateContentStream({
    model: MODEL,
    contents: prompt.contents,
    config: {
      systemInstruction: prompt.systemInstruction,
    },
  });

  let text = '';
  let chunkCount = 0;
  let usageTokens = 0;

  for await (const chunk of stream) {
    if (signal.aborted) break;
    const delta = chunk.text;
    if (delta) {
      text += delta;
      chunkCount += 1;
      await callbacks.onDelta(delta);
    }
    const out = chunk.usageMetadata?.candidatesTokenCount;
    if (typeof out === 'number') usageTokens = out;
  }

  return { text, tokens: usageTokens || chunkCount };
}
