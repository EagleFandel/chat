# Vercel环境变量配置指南

## 🎯 快速配置清单

在Vercel Dashboard中配置以下环境变量：

### 必需的环境变量

| 变量名 | 值 | 环境 | 说明 |
|--------|----|----|------|
| `INFINI_AI_API_KEY` | `你的真实API密钥` | Production, Preview | Infini AI的API密钥 |
| `INFINI_AI_BASE_URL` | `https://cloud.infini-ai.com/maas/v1` | Production, Preview | API基础URL |
| `INFINI_AI_MODEL` | `deepseek-v3.2-exp` | Production, Preview | 使用的AI模型 |

### 可选的环境变量

| 变量名 | 值 | 环境 | 说明 |
|--------|----|----|------|
| `NEXT_PUBLIC_APP_NAME` | `AI聊天助手` | Production, Preview | 应用名称 |
| `NEXT_PUBLIC_APP_VERSION` | `1.0.0` | Production, Preview | 应用版本 |
| `NODE_ENV` | `production` | Production | Node.js环境 |

## 📍 详细配置步骤

### 步骤1：访问项目设置
1. 登录 [vercel.com](https://vercel.com)
2. 在Dashboard中找到你的项目
3. 点击项目名称
4. 点击顶部的 "Settings" 标签

### 步骤2：进入环境变量页面
- 在左侧菜单中点击 "Environment Variables"
- 或者URL直接访问：`https://vercel.com/你的用户名/项目名/settings/environment-variables`

### 步骤3：添加环境变量
对于每个环境变量：

1. **点击 "Add New"**
2. **填写信息**：
   - Name: 变量名（如 `INFINI_AI_API_KEY`）
   - Value: 变量值（如你的API密钥）
   - Environments: 选择 `Production` 和 `Preview`
3. **点击 "Save"**

### 步骤4：重新部署
添加环境变量后：
1. 回到项目主页
2. 点击 "Deployments" 标签
3. 点击最新部署右侧的三个点
4. 选择 "Redeploy"
5. 确认重新部署

## 🔍 验证配置

### 检查环境变量是否生效：

1. **访问API端点**：
   ```
   https://你的项目域名.vercel.app/api/chat
   ```

2. **查看响应**：
   应该返回类似：
   ```json
   {
     "status": "ok",
     "message": "AI聊天API正在运行",
     "timestamp": "2024-01-01T00:00:00.000Z"
   }
   ```

3. **测试聊天功能**：
   - 访问应用主页
   - 发送测试消息
   - 检查是否收到AI回复

### 查看日志：

1. **进入Functions页面**：
   - 项目Dashboard > Functions
   - 点击 `/api/chat` 函数

2. **查看日志**：
   - 点击 "View Function Logs"
   - 检查是否有错误信息

## ⚠️ 常见问题

### 问题1：API密钥无效
**症状**：收到401 Unauthorized错误
**解决**：
- 检查API密钥是否正确
- 确认API密钥有效期
- 重新生成API密钥

### 问题2：环境变量不生效
**症状**：应用仍使用默认值
**解决**：
- 确认变量名拼写正确
- 检查是否选择了正确的环境
- 重新部署应用

### 问题3：部署失败
**症状**：构建或部署过程中出错
**解决**：
- 检查构建日志
- 确认所有依赖正确安装
- 检查代码语法错误

## 🔐 安全提示

1. **不要在代码中硬编码API密钥**
2. **定期更换API密钥**
3. **只在必要的环境中设置敏感变量**
4. **使用Preview环境测试配置**

## 📞 获取帮助

如果遇到问题：
1. 查看Vercel官方文档
2. 检查项目的构建日志
3. 查看函数执行日志
4. 联系Vercel支持团队