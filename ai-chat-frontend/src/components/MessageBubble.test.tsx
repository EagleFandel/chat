import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { MessageBubble } from './MessageBubble';
import type { Message } from '../types';
import { generateId } from '../utils/helpers';

describe('MessageBubble Property Tests', () => {
  /**
   * **Feature: ai-chat-frontend, Property 5: 消息渲染一致性**
   * **Validates: Requirements 2.1, 2.2**
   * 
   * 对于任何消息，用户消息应该在右侧渲染，AI消息应该在左侧渲染，都包含头像和时间戳
   */
  it('should render user messages on the right and AI messages on the left with avatars and timestamps', () => {
    fc.assert(
      fc.property(
        // 生成简单的字母数字字符串，避免特殊字符
        fc.stringMatching(/^[a-zA-Z0-9\s]+$/).filter(s => s.trim().length > 0),
        fc.constantFrom('user', 'ai'),
        fc.constantFrom('text', 'code', 'error'),
        (content, sender, type) => {
          const message: Message = {
            id: generateId(),
            content,
            sender: sender as 'user' | 'ai',
            timestamp: new Date(),
            type: type as 'text' | 'code' | 'error',
          };

          const { container } = render(
            <MessageBubble message={message} isUser={sender === 'user'} />
          );

          // 检查基本结构是否存在
          expect(container.firstChild).toBeTruthy();

          // 检查时间戳是否存在
          const timestampElements = container.querySelectorAll('.text-xs');
          expect(timestampElements.length).toBeGreaterThan(0);

          // 检查头像是否存在
          const avatarElements = container.querySelectorAll('svg');
          expect(avatarElements.length).toBeGreaterThan(0);

          // 检查布局方向
          const containerDiv = container.firstChild as HTMLElement;
          if (sender === 'user') {
            expect(containerDiv).toHaveClass('justify-end');
          } else {
            expect(containerDiv).toHaveClass('justify-start');
          }

          // 检查气泡样式
          const bubbleElements = container.querySelectorAll('.rounded-2xl');
          expect(bubbleElements.length).toBeGreaterThan(0);
          
          const bubble = bubbleElements[0] as HTMLElement;
          if (sender === 'user') {
            expect(bubble).toHaveClass('bg-primary-500');
            expect(bubble).toHaveClass('text-white');
          } else {
            expect(bubble).toHaveClass('bg-white');
            expect(bubble).toHaveClass('text-gray-800');
          }
        }
      ),
      { numRuns: 30 }
    );
  });

  it('should handle different message types consistently', () => {
    fc.assert(
      fc.property(
        // 生成简单的字母数字字符串
        fc.stringMatching(/^[a-zA-Z0-9\s]+$/).filter(s => s.trim().length > 0),
        fc.constantFrom('text', 'code', 'error'),
        (content, type) => {
          const message: Message = {
            id: generateId(),
            content,
            sender: 'user',
            timestamp: new Date(),
            type: type as 'text' | 'code' | 'error',
          };

          const { container } = render(
            <MessageBubble message={message} isUser={true} />
          );

          // 所有类型的消息都应该正确渲染
          expect(container.firstChild).toBeTruthy();
          
          // 都应该有基本的气泡结构
          const bubbleElements = container.querySelectorAll('.rounded-2xl');
          expect(bubbleElements.length).toBeGreaterThan(0);
          
          // 应该有内容区域
          const contentElements = container.querySelectorAll('.text-sm');
          expect(contentElements.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 20 }
    );
  });
});