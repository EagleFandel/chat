import { useState, useRef, useEffect } from 'react';
import type { MessageInputProps } from '../types';
import { Send, Loader2 } from 'lucide-react';
import { isValidMessageContent } from '../utils/validation';
import { useResponsive } from '../hooks/useResponsive';

export function MessageInput({ onSendMessage, disabled, placeholder = "输入消息..." }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isMobile } = useResponsive();

  // 自动调整文本框高度
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = isMobile ? 100 : 120;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [message, isMobile]);

  // 聚焦到输入框
  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (!isValidMessageContent(message) || disabled) {
      return;
    }

    onSendMessage(message.trim());
    setMessage('');
    
    // 重置文本框高度
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 处理中文输入法
    if (isComposing) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const isMessageValid = isValidMessageContent(message);
  const buttonSize = isMobile ? 'w-10 h-10' : 'w-12 h-12';
  const iconSize = isMobile ? 18 : 20;
  const minHeight = isMobile ? '44px' : '48px';

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className={`flex items-end ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={`w-full resize-none rounded-2xl input-theme focus:input-theme transition-all duration-200 ${
              isMobile ? 'px-3 py-2.5 pr-10 text-sm' : 'px-4 py-3 pr-12 text-sm'
            } disabled:opacity-50 disabled:cursor-not-allowed shadow-theme-sm focus:shadow-theme-md`}
            style={{ 
              minHeight,
              maxHeight: isMobile ? '100px' : '120px'
            }}
          />
          
          {/* 字符计数 */}
          {message.length > 0 && (
            <div className={`absolute ${isMobile ? 'bottom-1 right-8' : 'bottom-1 right-12'} text-xs text-theme-tertiary`}>
              {message.length}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!isMessageValid || disabled}
          className={`flex-shrink-0 ${buttonSize} rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-theme-tertiary disabled:cursor-not-allowed transition-all duration-200 shadow-theme-md hover:shadow-theme-lg disabled:shadow-theme-sm transform hover:scale-105 active:scale-95`}
        >
          {disabled ? (
            <Loader2 size={iconSize} className="animate-spin" />
          ) : (
            <Send size={iconSize} />
          )}
        </button>
      </form>

      {/* 提示文本 - 仅在桌面端显示 */}
      {!isMobile && (
        <div className="mt-2 text-xs text-theme-tertiary text-center">
          按 Enter 发送，Shift + Enter 换行
        </div>
      )}
    </div>
  );
}