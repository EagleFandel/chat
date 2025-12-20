// 测试Infini AI API连接
const API_KEY = 'your_actual_api_key_here'; // 替换为你的真实API密钥
const BASE_URL = 'https://cloud.infini-ai.com/maas/v1';
const MODEL = 'deepseek-v3.2-exp';

async function testAPI() {
  console.log('测试Infini AI API连接...');
  
  const url = `${BASE_URL}/chat/completions`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: '你好，请简单介绍一下自己'
        }
      ]
    })
  };

  try {
    console.log('发送请求到:', url);
    console.log('使用模型:', MODEL);
    
    const response = await fetch(url, options);
    
    console.log('响应状态:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API错误响应:', errorText);
      return;
    }
    
    const data = await response.json();
    console.log('API响应成功!');
    console.log('AI回复:', data.choices?.[0]?.message?.content || '无回复内容');
    
  } catch (error) {
    console.error('API调用失败:', error.message);
  }
}

testAPI();