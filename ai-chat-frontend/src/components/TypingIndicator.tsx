import type { TypingIndicatorProps } from '../types';
import { useResponsive } from '../hooks/useResponsive';
import { Bot } from 'lucide-react';

export function TypingIndicator({ visible }: TypingIndicatorProps) {
  const { isMobile } = useResponsive();
  
  if (!visible) return null;

  const avatarSize = isMobile ? 'w-7 h-7' : 'w-8 h-8';
  const iconSize = isMobile ? 14 : 16;
  const spacing = isMobile ? 'space-x-2' : 'space-x-3';
  const padding = isMobile ? 'px-3 py-2' : 'px-4 py-3';

  return (
    <div className="flex justify-start mb-3 sm:mb-4 animate-fade-in animate-slide-in-ai">
      <div className={`flex max-w-[85%] sm:max-w-[75%] items-start ${spacing}`}>
        <div className={`flex-shrink-0 ${avatarSize} rounded-full flex items-center justify-center bg-theme-tertiary text-theme-secondary shadow-theme-sm transition-colors duration-300`}>
          <Bot size={iconSize} />
        </div>
        
        <div className={`ai-bubble ${padding} shadow-theme-soft transition-all duration-300`}>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-theme-secondary rounded-full animate-typing"></div>
              <div className="w-2 h-2 bg-theme-secondary rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-theme-secondary rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-theme-secondary`}>
              AI正在输入...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}