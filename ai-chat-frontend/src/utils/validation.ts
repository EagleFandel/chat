import type { Message, ChatSession } from '../types';

/**
 * 验证消息内容是否有效
 * @param content 消息内容
 * @returns 是否有效
 */
export function isValidMessageContent(content: string): boolean {
  // 检查是否为空或只包含空白字符
  return content.trim().length > 0;
}

/**
 * 验证消息对象是否有效
 * @param message 消息对象
 * @returns 是否有效
 */
export function isValidMessage(message: any): message is Message {
  return (
    typeof message === 'object' &&
    message !== null &&
    typeof message.id === 'string' &&
    typeof message.content === 'string' &&
    (message.sender === 'user' || message.sender === 'ai') &&
    message.timestamp instanceof Date &&
    (message.type === 'text' || message.type === 'code' || message.type === 'error')
  );
}

/**
 * 验证聊天会话是否有效
 * @param session 聊天会话对象
 * @returns 是否有效
 */
export function isValidChatSession(session: any): session is ChatSession {
  return (
    typeof session === 'object' &&
    session !== null &&
    typeof session.id === 'string' &&
    Array.isArray(session.messages) &&
    session.messages.every(isValidMessage) &&
    session.createdAt instanceof Date &&
    session.updatedAt instanceof Date
  );
}

/**
 * 清理和标准化消息内容
 * @param content 原始消息内容
 * @returns 清理后的消息内容
 */
export function sanitizeMessageContent(content: string): string {
  return content.trim().replace(/\s+/g, ' ');
}

/**
 * 检测消息内容类型
 * @param content 消息内容
 * @returns 消息类型
 */
export function detectMessageType(content: string): 'text' | 'code' | 'error' {
  // 检测代码块
  if (content.includes('```') || content.includes('`')) {
    return 'code';
  }
  
  // 检测错误消息
  if (content.toLowerCase().includes('error') || content.toLowerCase().includes('错误')) {
    return 'error';
  }
  
  return 'text';
}