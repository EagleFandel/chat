// 消息类型定义
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'code' | 'error';
}

// 聊天会话类型定义
export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// 聊天状态类型定义
export interface ChatState {
  session: ChatSession;
  isTyping: boolean;
  isLoading: boolean;
  error: string | null;
}

// 聊天动作类型定义
export type ChatAction =
  | { type: 'SEND_MESSAGE'; payload: { content: string } }
  | { type: 'RECEIVE_MESSAGE'; payload: { content: string } }
  | { type: 'SET_TYPING'; payload: { isTyping: boolean } }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean } }
  | { type: 'SET_ERROR'; payload: { error: string | null } }
  | { type: 'CLEAR_CHAT' }
  | { type: 'LOAD_SESSION'; payload: { session: ChatSession } };

// 组件Props接口
export interface ChatContainerProps {
  className?: string;
}

export interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
}

export interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export interface TypingIndicatorProps {
  visible: boolean;
}

// 服务接口
export interface ChatService {
  sendMessage(message: string): Promise<string>;
  isConnected(): boolean;
}

export interface StorageService {
  saveSession(session: ChatSession): void;
  loadSession(): ChatSession | null;
  clearSession(): void;
}

// 上下文类型
export interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}