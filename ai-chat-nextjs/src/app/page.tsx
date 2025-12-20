'use client';

import { ChatProvider } from '@/hooks/ChatContext';
import { ChatContainer } from '@/components/ChatContainer';

export default function Home() {
  return (
    <ChatProvider>
      <main className="h-screen">
        <ChatContainer />
      </main>
    </ChatProvider>
  );
}