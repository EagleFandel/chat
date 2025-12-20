import type { MessageBubbleProps } from '../types';
import { formatTimestamp, linkifyText, hasCodeBlock, extractCodeLanguage } from '../utils/helpers';
import { useResponsive } from '../hooks/useResponsive';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../hooks/useTheme';

export function MessageBubble({ message, isUser }: MessageBubbleProps) {
  const { isMobile } = useResponsive();
  const { resolvedTheme } = useTheme();

  const bubbleClasses = isUser
    ? 'user-bubble shadow-theme-md'
    : 'ai-bubble shadow-theme-soft';

  const containerClasses = isUser
    ? 'flex justify-end'
    : 'flex justify-start';

  const avatarClasses = isUser
    ? 'bg-primary-600 text-white shadow-theme-sm'
    : 'bg-theme-tertiary text-theme-secondary shadow-theme-sm';

  const animationClass = isUser ? 'animate-slide-in-user' : 'animate-slide-in-ai';

  const maxWidth = isMobile ? 'max-w-[85%]' : 'max-w-[75%]';
  const spacing = isMobile ? 'space-x-2' : 'space-x-3';
  const padding = isMobile ? 'px-3 py-2' : 'px-4 py-3';
  const avatarSize = isMobile ? 'w-7 h-7' : 'w-8 h-8';
  const iconSize = isMobile ? 14 : 16;

  return (
    <div className={`${containerClasses} mb-3 sm:mb-4 ${animationClass}`}>
      <div className={`flex ${maxWidth} items-start ${spacing}`}>
        {!isUser && (
          <div className={`flex-shrink-0 ${avatarSize} rounded-full flex items-center justify-center ${avatarClasses} transition-colors duration-300`}>
            <Bot size={iconSize} />
          </div>
        )}
        
        <div className={`rounded-2xl ${padding} ${bubbleClasses} transition-all duration-300 hover:shadow-theme-lg`}>
          <div className={`${isMobile ? 'text-sm' : 'text-sm'}`}>
            {message.type === 'code' || hasCodeBlock(message.content) ? (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : extractCodeLanguage(message.content);
                    
                    return !inline ? (
                      <div className="my-2 first:mt-0 last:mb-0">
                        <SyntaxHighlighter
                          style={resolvedTheme === 'dark' ? oneDark : oneLight}
                          language={language}
                          PreTag="div"
                          className="!rounded-lg !bg-theme-tertiary !text-theme-primary !text-xs sm:!text-sm overflow-x-auto"
                          customStyle={{
                            margin: 0,
                            padding: isMobile ? '0.75rem' : '1rem',
                            fontSize: isMobile ? '0.75rem' : '0.875rem',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-theme-tertiary text-theme-primary px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                        {children}
                      </code>
                    );
                  },
                  p({ children }) {
                    return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
                  },
                  a({ href, children }) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`underline hover:no-underline transition-colors duration-200 ${
                          isUser 
                            ? 'text-blue-100 hover:text-white' 
                            : 'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'
                        }`}
                      >
                        {children}
                      </a>
                    );
                  },
                  ul({ children }) {
                    return <ul className="list-disc list-inside mb-2 last:mb-0 space-y-1">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="list-decimal list-inside mb-2 last:mb-0 space-y-1">{children}</ol>;
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className="border-l-4 border-theme-secondary pl-4 my-2 italic text-theme-secondary">
                        {children}
                      </blockquote>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: linkifyText(message.content),
                }}
              />
            )}
          </div>
          
          <div className={`${isMobile ? 'text-xs' : 'text-xs'} mt-2 opacity-75 ${
            isUser ? 'text-blue-100' : 'text-theme-tertiary'
          }`}>
            {formatTimestamp(message.timestamp)}
          </div>
        </div>

        {isUser && (
          <div className={`flex-shrink-0 ${avatarSize} rounded-full flex items-center justify-center ${avatarClasses} transition-colors duration-300`}>
            <User size={iconSize} />
          </div>
        )}
      </div>
    </div>
  );
}