export type ChatEventType =
  | 'token'
  | 'message_complete'
  | 'tool_call'
  | 'error';

export interface TokenFrameData {
  messageId: string;
  delta: string;
}

export interface MessageCompleteFrameData {
  messageId: string;
  tokens: number;
}

export interface ToolCallFrameData {
  name: string;
  args: unknown;
}

export interface ErrorFrameData {
  code: string;
  message: string;
}

export type ChatFrame =
  | { id: string; type: 'token'; data: TokenFrameData }
  | { id: string; type: 'message_complete'; data: MessageCompleteFrameData }
  | { id: string; type: 'tool_call'; data: ToolCallFrameData }
  | { id: string; type: 'error'; data: ErrorFrameData };

export interface SendMessageRequest {
  conversationId: string;
  content: string;
}

export interface SendMessageResponse {
  messageId: string;
}

export interface ChatToken {
  token: string;
  sseUrl: string;
  exp: number;
}
