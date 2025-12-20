import { ChatProvider } from './hooks/ChatContext';
import { ChatContainer } from './components/ChatContainer';
import './index.css';

function App() {
  return (
    <ChatProvider>
      <div className="w-full h-screen">
        <ChatContainer />
      </div>
    </ChatProvider>
  );
}

export default App;