// Infini AI服务配置
const INFINI_AI_BASE_URL = import.meta.env.VITE_INFINI_AI_BASE_URL || 'https://cloud.infini-ai.com/maas/v1';
const INFINI_AI_API_KEY = import.meta.env.VITE_INFINI_AI_API_KEY;
const INFINI_AI_MODEL = import.meta.env.VITE_INFINI_AI_MODEL || 'deepseek-v3.2-exp';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  message: string;
  timestamp: string;
}

// 调用Infini AI API
export async function callInfiniAI(message: string): Promise<string> {
  if (!INFINI_AI_API_KEY) {
    throw new Error('VITE_INFINI_AI_API_KEY 环境变量未设置');
  }

  const url = `${INFINI_AI_BASE_URL}/chat/completions`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${INFINI_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: INFINI_AI_MODEL,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    })
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // 检查响应格式
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error('API响应格式不正确');
    }
  } catch (error) {
    console.error('Infini AI API调用失败:', error);
    throw error;
  }
}

// 备用模拟响应
export async function generateFallbackResponse(message: string): Promise<string> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
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

// 主要的AI响应函数
export async function generateAIResponse(message: string): Promise<AIResponse> {
  let responseMessage: string;
  
  try {
    // 尝试调用Infini AI API
    responseMessage = await callInfiniAI(message);
  } catch (error) {
    console.warn('Infini AI API不可用，使用备用响应:', error);
    // 如果API调用失败，使用备用响应
    responseMessage = await generateFallbackResponse(message);
  }
  
  return {
    message: responseMessage,
    timestamp: new Date().toISOString(),
  };
}