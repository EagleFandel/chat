import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { ChatContextType } from '../types';
import { chatReducer, initialChatState } from './useChatReducer';
import { isValidMessageContent } from '../utils/validation';
import { generateAIResponse } from '../services/aiService';

// 创建上下文
const ChatContext = createContext<ChatContextType | null>(null);

// AI服务接口
const aiService = {
  async sendMessage(message: string): Promise<string> {
    const response = await generateAIResponse(message);
    return response.message;
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
      const aiResponse = await aiService.sendMessage(content);

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