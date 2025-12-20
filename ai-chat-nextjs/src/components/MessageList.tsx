'use client';

import { useEffect, useRef } from 'react';
import type { MessageListProps } from '../types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { useResponsive } from '../hooks/useResponsive';

export function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 当有新消息或打字状态改变时滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const padding = isMobile ? 'p-3' : 'p-4';
  const spacing = isMobile ? 'space-y-3' : 'space-y-4';

  return (
    <div 
      ref={containerRef}
      className={`flex-1 overflow-y-auto ${padding} ${spacing} bg-theme-secondary transition-colors duration-300`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-theme-secondary max-w-sm mx-auto">
            <div className={`${isMobile ? 'text-4xl' : 'text-6xl'} mb-4 animate-bounce-gentle`}>🤖</div>
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium mb-2 text-theme-primary`}>
              欢迎使用AI聊天助手
            </h3>
            <p className={`${isMobile ? 'text-sm' : 'text-sm'} text-theme-secondary`}>
              {isMobile ? '发送消息开始对话' : '发送消息开始对话吧！'}
            </p>
            <div className="mt-6 space-y-2">
              <div className={`inline-block px-3 py-1.5 bg-theme-tertiary rounded-full text-xs text-theme-secondary ${
                isMobile ? 'mx-1' : 'mx-2'
              }`}>
                💬 支持普通对话
              </div>
              <div className={`inline-block px-3 py-1.5 bg-theme-tertiary rounded-full text-xs text-theme-secondary ${
                isMobile ? 'mx-1' : 'mx-2'
              }`}>
                💻 支持代码高亮
              </div>
              {!isMobile && (
                <div className="inline-block px-3 py-1.5 bg-theme-tertiary rounded-full text-xs text-theme-secondary mx-2">
                  🔗 支持链接识别
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isUser={message.sender === 'user'}
            />
          ))}
          
          <TypingIndicator visible={isTyping} />
        </>
      )}
      
      {/* 滚动锚点 */}
      <div ref={messagesEndRef} />
    </div>
  );
}