/**
 * Splits a string into chunks roughly resembling LLM token boundaries:
 * each whitespace run stays attached to the following word. Streaming these
 * one-by-one with a small delay produces a natural-looking typing effect.
 */
export function chunkForStream(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/\s*\S+/g);
  return matches ?? [];
}
