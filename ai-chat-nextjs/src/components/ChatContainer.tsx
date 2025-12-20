'use client';

import type { ChatContainerProps } from '../types';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatState, useChatActions } from '../hooks/ChatContext';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { MessageCircle, RotateCcw, AlertCircle, Sun, Moon, Monitor } from 'lucide-react';

export function ChatContainer({ className = '' }: ChatContainerProps) {
  const { session, isTyping, isLoading, error } = useChatState();
  const { sendMessage, clearChat } = useChatActions();
  const { theme, toggleTheme } = useTheme();
  const { isMobile } = useResponsive();

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleClearChat = () => {
    if (session.messages.length > 0) {
      const confirmed = window.confirm('确定要清除所有聊天记录吗？');
      if (confirmed) {
        clearChat();
      }
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={18} />;
      case 'dark':
        return <Moon size={18} />;
      case 'system':
        return <Monitor size={18} />;
      default:
        return <Sun size={18} />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return '浅色模式';
      case 'dark':
        return '深色模式';
      case 'system':
        return '跟随系统';
      default:
        return '浅色模式';
    }
  };

  return (
    <div className={`flex flex-col h-screen bg-theme-primary transition-colors duration-300 ${className}`}>
      {/* 头部 */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-theme-primary bg-theme-primary shadow-theme-sm">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-500 flex items-center justify-center shadow-theme-md ${
            isTyping ? 'animate-pulse-soft' : ''
          }`}>
            <MessageCircle size={isMobile ? 16 : 20} className="text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-theme-primary">
              {isMobile ? 'AI助手' : 'AI聊天助手'}
            </h1>
            <p className="text-xs sm:text-sm text-theme-secondary">
              {isTyping ? 'AI正在输入...' : '在线'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            className="p-2 text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary rounded-full transition-all duration-200 group"
            title={getThemeLabel()}
          >
            <div className="group-hover:scale-110 transition-transform duration-200">
              {getThemeIcon()}
            </div>
          </button>

          {/* 清除聊天按钮 */}
          {session.messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="p-2 text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary rounded-full transition-all duration-200 group"
              title="清除聊天记录"
            >
              <div className="group-hover:rotate-180 transition-transform duration-300">
                <RotateCcw size={18} />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className={`mx-3 sm:mx-4 mt-3 sm:mt-4 p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-xl flex items-start space-x-2 animate-slide-up ${
          isMobile ? 'text-sm' : ''
        }`}>
          <AlertCircle size={16} className="text-error-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-error-700 dark:text-error-300 font-medium">出错了</span>
            <p className="text-error-600 dark:text-error-400 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* 消息列表 */}
      <MessageList messages={session.messages} isTyping={isTyping} />

      {/* 输入区域 */}
      <div className={`border-t border-theme-primary bg-theme-primary ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder={isMobile ? "输入消息..." : "输入消息，按回车发送..."}
        />
        
        {/* 移动端提示 */}
        {isMobile && (
          <div className="mt-2 text-xs text-theme-tertiary text-center">
            按回车发送消息
          </div>
        )}
      </div>
    </div>
  );
}