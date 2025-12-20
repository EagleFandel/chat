import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { ChatContextType } from '../types';
import { chatReducer, initialChatState } from './useChatReducer';
import { isValidMessageContent } from '../utils/validation';
import { delay } from '../utils/helpers';

// 创建上下文
const ChatContext = createContext<ChatContextType | null>(null);

// 模拟AI服务 - 用于MVP版本
const mockAIService = {
  async sendMessage(message: string): Promise<string> {
    // 模拟网络延迟
    await delay(1000 + Math.random() * 2000);
    
    // 简单的模拟回复逻辑
    const responses = [
      `我理解你说的"${message}"。这是一个很有趣的话题！`,
      `关于"${message}"，我可以为你提供一些见解...`,
      `你提到的"${message}"让我想到了几个相关的观点。`,
      `这是一个很好的问题关于"${message}"。让我来详细解释一下。`,
      `我注意到你对"${message}"很感兴趣。这确实是一个值得探讨的主题。`,
    ];
    
    // 如果包含代码相关关键词，返回代码示例
    if (message.toLowerCase().includes('代码') || message.toLowerCase().includes('code') || message.toLowerCase().includes('编程')) {
      return `关于编程，这里是一个简单的例子：

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

这个函数演示了基本的JavaScript语法。你还有其他编程相关的问题吗？`;
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  },
  
  isConnected(): boolean {
    return true;
  }
};

// 聊天提供者组件
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  // 发送消息函数
  const sendMessage = useCallback(async (content: string) => {
    // 验证消息内容
    if (!isValidMessageContent(content)) {
      dispatch({
        type: 'SET_ERROR',
        payload: { error: '消息内容不能为空' }
      });
      return;
    }

    try {
      // 发送用户消息
      dispatch({
        type: 'SEND_MESSAGE',
        payload: { content }
      });

      // 显示打字指示器
      dispatch({
        type: 'SET_TYPING',
        payload: { isTyping: true }
      });

      // 调用AI服务
      const aiResponse = await mockAIService.sendMessage(content);

      // 接收AI回复
      dispatch({
        type: 'RECEIVE_MESSAGE',
        payload: { content: aiResponse }
      });

    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: { error: '发送消息失败，请重试' }
      });
    }
  }, []);

  // 清除聊天记录
  const clearChat = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT' });
  }, []);

  // 从本地存储加载会话（后续实现）
  useEffect(() => {
    // 这里将来会从本地存储加载会话
    // const savedSession = storageService.loadSession();
    // if (savedSession) {
    //   dispatch({ type: 'LOAD_SESSION', payload: { session: savedSession } });
    // }
  }, []);

  // 保存会话到本地存储（后续实现）
  useEffect(() => {
    // 这里将来会保存会话到本地存储
    // storageService.saveSession(state.session);
  }, [state.session]);

  const contextValue: ChatContextType = {
    state,
    dispatch,
    sendMessage,
    clearChat,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

// 使用聊天上下文的Hook
export function useChatContext(): ChatContextType {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

// 便捷的状态和动作Hooks
export function useChatState() {
  const { state } = useChatContext();
  return state;
}

export function useChatActions() {
  const { sendMessage, clearChat } = useChatContext();
  return { sendMessage, clearChat };
}