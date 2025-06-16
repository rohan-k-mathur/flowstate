import { describe, it, expect } from 'vitest';
import { parseDeepseekResponse } from '../route';

describe('parseDeepseekResponse', () => {
  it('parses JSON wrapped in code fences', () => {
    const data = {
      choices: [
        { message: { content: '```json\n{ "nodes": [], "edges": [] }\n```' } },
      ],
    };
    expect(parseDeepseekResponse(data)).toEqual({ nodes: [], edges: [] });
  });

  it('parses plain JSON', () => {
    const data = {
      choices: [{ message: { content: '{ "nodes": [], "edges": [] }' } }],
    };
    expect(parseDeepseekResponse(data)).toEqual({ nodes: [], edges: [] });
  });

  it('throws on invalid JSON', () => {
    const data = {
      choices: [{ message: { content: '```json\n{ invalid }\n```' } }],
    };
    expect(() => parseDeepseekResponse(data)).toThrow();
  });
});
