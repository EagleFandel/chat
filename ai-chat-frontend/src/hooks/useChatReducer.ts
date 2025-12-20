import type { ChatState, ChatAction, Message, ChatSession } from '../types';
import { generateId } from '../utils/helpers';
import { detectMessageType } from '../utils/validation';

// 初始状态
export const initialChatState: ChatState = {
  session: {
    id: generateId(),
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  isTyping: false,
  isLoading: false,
  error: null,
};

// 聊天状态reducer
export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SEND_MESSAGE': {
      const newMessage: Message = {
        id: generateId(),
        content: action.payload.content,
        sender: 'user',
        timestamp: new Date(),
        type: detectMessageType(action.payload.content),
      };

      const updatedSession: ChatSession = {
        ...state.session,
        messages: [...state.session.messages, newMessage],
        updatedAt: new Date(),
      };

      return {
        ...state,
        session: updatedSession,
        isLoading: true,
        error: null,
      };
    }

    case 'RECEIVE_MESSAGE': {
      const newMessage: Message = {
        id: generateId(),
        content: action.payload.content,
        sender: 'ai',
        timestamp: new Date(),
        type: detectMessageType(action.payload.content),
      };

      const updatedSession: ChatSession = {
        ...state.session,
        messages: [...state.session.messages, newMessage],
        updatedAt: new Date(),
      };

      return {
        ...state,
        session: updatedSession,
        isTyping: false,
        isLoading: false,
        error: null,
      };
    }

    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload.isTyping,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        isTyping: false,
      };

    case 'CLEAR_CHAT': {
      const newSession: ChatSession = {
        id: generateId(),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        ...state,
        session: newSession,
        isTyping: false,
        isLoading: false,
        error: null,
      };
    }

    case 'LOAD_SESSION':
      return {
        ...state,
        session: action.payload.session,
        isTyping: false,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
}