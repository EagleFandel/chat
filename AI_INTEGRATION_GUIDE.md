# AI大模型集成指南

## 概述

已成功集成Infini AI的DeepSeek-v3.2-exp模型到两个聊天应用项目中：
- `ai-chat-nextjs` - Next.js版本
- `ai-chat-frontend` - React + Vite版本

## 配置步骤

### 1. 获取API密钥

首先需要从Infini AI获取API密钥。

### 2. Next.js项目配置

在 `ai-chat-nextjs` 目录下：

1. 复制环境变量文件：
```bash
cp .env.example .env.local
```

2. 编辑 `.env.local` 文件，添加你的API密钥：
```env
INFINI_AI_API_KEY=your_actual_api_key_here
INFINI_AI_BASE_URL=https://cloud.infini-ai.com/maas/v1
INFINI_AI_MODEL=deepseek-v3.2-exp
```

### 3. React项目配置

在 `ai-chat-frontend` 目录下：

1. 复制环境变量文件：
```bash
cp .env.example .env.local
```

2. 编辑 `.env.local` 文件，添加你的API密钥：
```env
VITE_INFINI_AI_API_KEY=your_actual_api_key_here
VITE_INFINI_AI_BASE_URL=https://cloud.infini-ai.com/maas/v1
VITE_INFINI_AI_MODEL=deepseek-v3.2-exp
```

## 功能特性

### 1. 智能降级
- 优先使用Infini AI API
- 当API不可用时自动切换到备用响应
- 确保应用始终可用

### 2. 错误处理
- 完整的错误捕获和处理
- 用户友好的错误提示
- 详细的控制台日志

### 3. 环境变量验证
- 启动时检查必要的环境变量
- 清晰的错误提示

## API调用示例

集成的API调用格式：

```javascript
const url = 'https://cloud.infini-ai.com/maas/v1/chat/completions';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer $API_KEY'
  },
  body: JSON.stringify({
    model: 'deepseek-v3.2-exp',
    messages: [
      {
        role: 'user',
        content: '你的消息内容'
      }
    ]
  })
};
```

## 文件修改说明

### Next.js项目
- `src/app/api/chat/route.ts` - 更新API路由以使用Infini AI
- `.env.example` - 添加Infini AI配置项

### React项目
- `src/services/aiService.ts` - 新建AI服务文件
- `src/hooks/ChatContext.tsx` - 更新聊天上下文以使用新服务
- `.env.example` - 添加Infini AI配置项

## 测试

配置完成后，可以通过以下方式测试：

1. 启动开发服务器
2. 在聊天界面发送消息
3. 检查控制台是否有错误日志
4. 验证AI响应是否正常

## 注意事项

1. **API密钥安全**：
   - 不要将API密钥提交到版本控制
   - 使用环境变量管理敏感信息

2. **错误处理**：
   - 应用会在API不可用时自动降级
   - 查看控制台日志了解详细错误信息

3. **费用控制**：
   - 监控API调用次数
   - 根据需要设置调用限制

## 故障排除

### 常见问题

1. **API密钥错误**：
   - 检查环境变量是否正确设置
   - 验证API密钥是否有效

2. **网络连接问题**：
   - 检查网络连接
   - 验证API端点是否可访问

3. **响应格式错误**：
   - 检查API响应格式是否符合预期
   - 查看控制台错误日志

如有问题，请检查控制台日志获取详细错误信息。