import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { buildPrompt, systemPrompt } from '../src/prompt.js';
import type { HistoryRow } from '../src/db.js';

describe('systemPrompt', () => {
  const original = process.env.SYSTEM_PROMPT;
  beforeEach(() => {
    delete process.env.SYSTEM_PROMPT;
  });
  afterEach(() => {
    if (original === undefined) delete process.env.SYSTEM_PROMPT;
    else process.env.SYSTEM_PROMPT = original;
  });

  it('falls back to the hardcoded default when env var is unset', () => {
    expect(systemPrompt()).toMatch(/helpful assistant/);
  });

  it('uses SYSTEM_PROMPT when set', () => {
    process.env.SYSTEM_PROMPT = 'You are pirate-Gemini.';
    expect(systemPrompt()).toBe('You are pirate-Gemini.');
  });

  it('treats whitespace-only env var as unset', () => {
    process.env.SYSTEM_PROMPT = '   \n  ';
    expect(systemPrompt()).toMatch(/helpful assistant/);
  });
});

describe('buildPrompt', () => {
  const sys = 'sys';

  it('returns systemInstruction separately and a single user turn in contents', () => {
    const out = buildPrompt([], 'hello', sys);
    expect(out.systemInstruction).toBe(sys);
    expect(out.contents).toEqual([{ role: 'user', parts: [{ text: 'hello' }] }]);
  });

  it("maps assistant history rows to Gemini's 'model' role", () => {
    const history: HistoryRow[] = [
      { role: 'user', content: 'q1' },
      { role: 'assistant', content: 'a1' },
      { role: 'user', content: 'q2' },
    ];
    const out = buildPrompt(history, 'q3', sys);
    expect(out.contents.map((c) => c.role)).toEqual(['user', 'model', 'user', 'user']);
    expect(out.contents[3]).toEqual({ role: 'user', parts: [{ text: 'q3' }] });
  });

  it('drops tool rows because the MVP does not surface them to the model', () => {
    const history: HistoryRow[] = [
      { role: 'user', content: 'q1' },
      { role: 'tool', content: 'sql result' },
      { role: 'assistant', content: 'a1' },
    ];
    const out = buildPrompt(history, 'next', sys);
    expect(out.contents.map((c) => c.role)).toEqual(['user', 'model', 'user']);
    const flat = out.contents.flatMap((c) => c.parts.map((p) => p.text));
    expect(flat).not.toContain('sql result');
  });

  it('folds system history rows into the systemInstruction', () => {
    const history: HistoryRow[] = [
      { role: 'system', content: 'extra rule A' },
      { role: 'user', content: 'q1' },
      { role: 'system', content: 'extra rule B' },
    ];
    const out = buildPrompt(history, 'q2', sys);
    expect(out.systemInstruction).toContain(sys);
    expect(out.systemInstruction).toContain('extra rule A');
    expect(out.systemInstruction).toContain('extra rule B');
    expect(out.contents.map((c) => c.role)).toEqual(['user', 'user']);
  });
});
