import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { chatReducer, initialChatState } from './useChatReducer';
import type { ChatAction } from '../types';

describe('Chat Reducer Property Tests', () => {
  /**
   * **Feature: ai-chat-frontend, Property 1: 消息添加一致性**
   * **Validates: Requirements 1.1**
   * 
   * 对于任何有效的消息内容，发送消息应该将其添加到消息历史中，并且消息数量增加1
   */
  it('should add message to history and increase count by 1', () => {
    fc.assert(
      fc.property(
        // 生成非空字符串作为消息内容
        fc.string().filter(s => s.trim().length > 0),
        (messageContent) => {
          const initialMessageCount = initialChatState.session.messages.length;
          
          const action: ChatAction = {
            type: 'SEND_MESSAGE',
            payload: { content: messageContent }
          };
          
          const newState = chatReducer(initialChatState, action);
          
          // 消息数量应该增加1
          expect(newState.session.messages.length).toBe(initialMessageCount + 1);
          
          // 最新的消息应该是我们发送的消息
          const lastMessage = newState.session.messages[newState.session.messages.length - 1];
          expect(lastMessage.content).toBe(messageContent);
          expect(lastMessage.sender).toBe('user');
          
          // 应该设置加载状态
          expect(newState.isLoading).toBe(true);
          expect(newState.error).toBe(null);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle AI message reception correctly', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => s.trim().length > 0),
        (aiResponse) => {
          // 先发送一个用户消息
          const userAction: ChatAction = {
            type: 'SEND_MESSAGE',
            payload: { content: 'test message' }
          };
          const stateAfterUserMessage = chatReducer(initialChatState, userAction);
          
          // 然后接收AI回复
          const aiAction: ChatAction = {
            type: 'RECEIVE_MESSAGE',
            payload: { content: aiResponse }
          };
          const finalState = chatReducer(stateAfterUserMessage, aiAction);
          
          // 应该有两条消息
          expect(finalState.session.messages.length).toBe(2);
          
          // 最新的消息应该是AI的回复
          const lastMessage = finalState.session.messages[1];
          expect(lastMessage.content).toBe(aiResponse);
          expect(lastMessage.sender).toBe('ai');
          
          // 应该清除加载和打字状态
          expect(finalState.isLoading).toBe(false);
          expect(finalState.isTyping).toBe(false);
          expect(finalState.error).toBe(null);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain message order consistency', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string().filter(s => s.trim().length > 0), { minLength: 1, maxLength: 10 }),
        (messages) => {
          let currentState = initialChatState;
          
          // 依次发送所有消息
          messages.forEach(content => {
            const action: ChatAction = {
              type: 'SEND_MESSAGE',
              payload: { content }
            };
            currentState = chatReducer(currentState, action);
          });
          
          // 验证消息顺序
          expect(currentState.session.messages.length).toBe(messages.length);
          
          messages.forEach((expectedContent, index) => {
            expect(currentState.session.messages[index].content).toBe(expectedContent);
            expect(currentState.session.messages[index].sender).toBe('user');
          });
        }
      ),
      { numRuns: 50 }
    );
  });
});
  /**
   * **Feature: ai-chat-frontend, Property 11: 会话清除完整性**
   * **Validates: Requirements 4.1, 4.3**
   * 
   * 对于任何包含消息的会话，执行清除操作应该删除所有消息并重置会话状态
   */
  it('should clear all messages and reset session state', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string().filter(s => s.trim().length > 0), { minLength: 1, maxLength: 20 }),
        (messages) => {
          let currentState = initialChatState;
          
          // 添加一些消息到会话中
          messages.forEach(content => {
            const sendAction: ChatAction = {
              type: 'SEND_MESSAGE',
              payload: { content }
            };
            currentState = chatReducer(currentState, sendAction);
            
            // 也添加一些AI回复
            const receiveAction: ChatAction = {
              type: 'RECEIVE_MESSAGE',
              payload: { content: `AI回复: ${content}` }
            };
            currentState = chatReducer(currentState, receiveAction);
          });
          
          // 确保会话中有消息
          expect(currentState.session.messages.length).toBeGreaterThan(0);
          
          // 执行清除操作
          const clearAction: ChatAction = { type: 'CLEAR_CHAT' };
          const clearedState = chatReducer(currentState, clearAction);
          
          // 验证清除结果
          expect(clearedState.session.messages.length).toBe(0);
          expect(clearedState.session.messages).toEqual([]);
          
          // 验证状态重置
          expect(clearedState.isTyping).toBe(false);
          expect(clearedState.isLoading).toBe(false);
          expect(clearedState.error).toBe(null);
          
          // 验证会话ID已更新（新会话）
          expect(clearedState.session.id).not.toBe(currentState.session.id);
          
          // 验证时间戳已更新
          expect(clearedState.session.createdAt.getTime()).toBeGreaterThanOrEqual(
            currentState.session.createdAt.getTime()
          );
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should handle clearing empty session gracefully', () => {
    const clearAction: ChatAction = { type: 'CLEAR_CHAT' };
    const clearedState = chatReducer(initialChatState, clearAction);
    
    // 即使是空会话，清除操作也应该正常工作
    expect(clearedState.session.messages.length).toBe(0);
    expect(clearedState.isTyping).toBe(false);
    expect(clearedState.isLoading).toBe(false);
    expect(clearedState.error).toBe(null);
    
    // 应该创建新的会话ID
    expect(clearedState.session.id).not.toBe(initialChatState.session.id);
  });