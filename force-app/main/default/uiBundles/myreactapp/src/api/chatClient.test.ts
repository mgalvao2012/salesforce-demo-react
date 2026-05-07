import { describe, it, expect } from 'vitest';
import { mapMessageNodeToChatMessage, mapConversationListNode } from './chatClient';

describe('mapMessageNodeToChatMessage', () => {
  it('maps a well-formed assistant message node', () => {
    const node = {
      Id: 'a01...',
      External_Id__c: { value: 'msg-1' },
      Role__c: { value: 'assistant' },
      Content__c: { value: 'Hello' },
      Created_At__c: { value: '2026-05-06T10:00:00.000Z' },
    };
    const msg = mapMessageNodeToChatMessage(node);
    expect(msg).toEqual({
      id: 'msg-1',
      role: 'assistant',
      content: 'Hello',
      status: 'final',
      createdAt: new Date('2026-05-06T10:00:00.000Z').getTime(),
    });
  });

  it('returns null when External_Id__c is missing', () => {
    const node = {
      Id: 'a01...',
      External_Id__c: { value: null },
      Role__c: { value: 'user' },
      Content__c: { value: 'hi' },
      Created_At__c: { value: '2026-05-06T10:00:00.000Z' },
    };
    expect(mapMessageNodeToChatMessage(node)).toBeNull();
  });

  it('returns null for unknown roles', () => {
    const node = {
      Id: 'a01...',
      External_Id__c: { value: 'msg-1' },
      Role__c: { value: 'admin' },
      Content__c: { value: 'hi' },
      Created_At__c: { value: '2026-05-06T10:00:00.000Z' },
    };
    expect(mapMessageNodeToChatMessage(node)).toBeNull();
  });

  it('coerces null content to empty string', () => {
    const node = {
      Id: 'a01...',
      External_Id__c: { value: 'msg-1' },
      Role__c: { value: 'tool' },
      Content__c: null,
      Created_At__c: { value: '2026-05-06T10:00:00.000Z' },
    };
    expect(mapMessageNodeToChatMessage(node)?.content).toBe('');
  });
});

describe('mapConversationListNode', () => {
  it('maps a node with an explicit title', () => {
    const node = {
      Id: 'a02...',
      External_Id__c: { value: 'conv-1' },
      Title__c: { value: 'Onboarding chat' },
      Started_At__c: { value: '2026-05-06T09:00:00.000Z' },
      Ended_At__c: null,
      Status__c: { value: 'Active' },
    };
    expect(mapConversationListNode(node)).toEqual({
      externalId: 'conv-1',
      title: 'Onboarding chat',
      startedAt: new Date('2026-05-06T09:00:00.000Z').getTime(),
      endedAt: null,
      status: 'Active',
    });
  });

  it('falls back to startedAt-based title when Title__c is null', () => {
    const node = {
      Id: 'a02...',
      External_Id__c: { value: 'conv-2' },
      Title__c: null,
      Started_At__c: { value: '2026-05-06T09:00:00.000Z' },
      Ended_At__c: null,
      Status__c: null,
    };
    const summary = mapConversationListNode(node);
    expect(summary?.title).toBeTruthy();
    expect(summary?.title).not.toBe('');
    expect(summary?.externalId).toBe('conv-2');
  });

  it('returns null when External_Id__c is missing', () => {
    const node = {
      Id: 'a02...',
      External_Id__c: { value: null },
      Title__c: { value: 'orphan' },
      Started_At__c: null,
      Ended_At__c: null,
      Status__c: null,
    };
    expect(mapConversationListNode(node)).toBeNull();
  });

  it('uses "Untitled conversation" when Title__c and Started_At__c are both null', () => {
    const node = {
      Id: 'a02...',
      External_Id__c: { value: 'conv-3' },
      Title__c: null,
      Started_At__c: null,
      Ended_At__c: null,
      Status__c: null,
    };
    expect(mapConversationListNode(node)?.title).toBe('Untitled conversation');
  });
});
