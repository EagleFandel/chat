import { NextRequest, NextResponse } from 'next/server';

// 模拟AI服务响应
async function generateAIResponse(message: string): Promise<string> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
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
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: '消息内容不能为空' },
        { status: 400 }
      );
    }
    
    const response = await generateAIResponse(message.trim());
    
    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'AI聊天API正在运行',
    timestamp: new Date().toISOString(),
  });
}