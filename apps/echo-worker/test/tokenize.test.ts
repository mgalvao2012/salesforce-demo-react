import { describe, it, expect } from 'vitest';
import { chunkForStream } from '../src/tokenize.js';

describe('chunkForStream', () => {
  it('splits a sentence into word chunks with leading whitespace attached', () => {
    expect(chunkForStream('hello world')).toEqual(['hello', ' world']);
  });

  it('reassembles to the original string', () => {
    const input = 'You said: testing 1 2 3\nnewlines too';
    expect(chunkForStream(input).join('')).toBe(input);
  });

  it('returns an empty array for empty input', () => {
    expect(chunkForStream('')).toEqual([]);
  });

  it('returns an empty array for whitespace-only input', () => {
    expect(chunkForStream('   \n\t  ')).toEqual([]);
  });

  it('handles single-word input', () => {
    expect(chunkForStream('hi')).toEqual(['hi']);
  });
});
