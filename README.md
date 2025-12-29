# 🤖 AI Chat - 智能对话助手

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/DeepSeek-v3.2-FF6B6B?style=for-the-badge" alt="DeepSeek">
</p>

<p align="center">
  基于 Next.js 16 和 React 19 构建的现代化 AI 聊天应用，集成 DeepSeek-v3.2-exp 大语言模型，提供流畅的智能对话体验。
</p>

<p align="center">
  <a href="#-功能特性">功能特性</a> •
  <a href="#-快速开始">快速开始</a> •
  <a href="#-项目结构">项目结构</a> •
  <a href="#-部署指南">部署指南</a> •
  <a href="#-技术栈">技术栈</a>
</p>

---

## ✨ 功能特性

- 🤖 **AI 智能对话** - 集成 DeepSeek-v3.2-exp 大语言模型，支持自然语言理解和生成
- 🎨 **现代化 UI** - 精美的聊天界面，支持深色/浅色主题切换
- 📱 **响应式设计** - 完美适配桌面端、平板和移动设备
- ⚡ **高性能** - 基于 Next.js 16 App Router 和 React 19，极致性能体验
- 🔄 **智能降级** - API 不可用时自动切换到备用响应，确保服务可用性
- 💬 **Markdown 支持** - 支持代码高亮、列表、链接等富文本格式
- 🛡️ **类型安全** - 完整的 TypeScript 支持，代码更健壮
- 🎯 **错误处理** - 完善的错误捕获和用户友好提示

## 📦 项目包含

本仓库包含两个独立的聊天应用实现：

| 项目 | 技术栈 | 说明 |
|------|--------|------|
| `ai-chat-nextjs` | Next.js 16 + React 19 | 全栈应用，包含 API 路由 |
| `ai-chat-frontend` | React + Vite | 纯前端应用 |

## 🚀 快速开始

### 环境要求

- Node.js 18.0+
- npm 或 yarn

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/EagleFandel/chat.git
cd chat

# 选择项目（推荐 Next.js 版本）
cd ai-chat-nextjs

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 添加你的 API 密钥

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始使用！

### 环境变量配置

```env
# Infini AI 配置
INFINI_AI_API_KEY=your_api_key_here
INFINI_AI_BASE_URL=https://cloud.infini-ai.com/maas/v1
INFINI_AI_MODEL=deepseek-v3.2-exp

# 应用配置
NEXT_PUBLIC_APP_NAME=AI聊天助手
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 📁 项目结构

```
chat/
├── ai-chat-nextjs/          # Next.js 全栈应用
│   ├── src/
│   │   ├── app/             # App Router
│   │   │   ├── api/chat/    # API 路由
│   │   │   └── page.tsx     # 主页面
│   │   ├── components/      # React 组件
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── types/           # TypeScript 类型
│   │   └── utils/           # 工具函数
│   └── vercel.json          # Vercel 配置
│
├── ai-chat-frontend/        # React + Vite 前端应用
│   ├── src/
│   │   ├── components/      # React 组件
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── services/        # API 服务
│   │   └── types/           # TypeScript 类型
│   └── vite.config.ts       # Vite 配置
│
└── AI_INTEGRATION_GUIDE.md  # AI 集成指南
```

## 🚀 部署指南

### 部署到 Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/EagleFandel/chat&project-name=ai-chat&repository-name=ai-chat&root-directory=ai-chat-nextjs)

**手动部署步骤：**

1. Fork 本仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 设置根目录为 `ai-chat-nextjs`
4. 配置环境变量
5. 点击 Deploy

详细部署指南请参考 [DEPLOYMENT_GUIDE.md](./ai-chat-nextjs/DEPLOYMENT_GUIDE.md)

### 其他部署平台

项目支持部署到：
- Netlify
- Railway
- Render
- AWS Amplify
- Docker

## 🛠️ 技术栈

### 核心框架
- **Next.js 16** - React 全栈框架
- **React 19** - 用户界面库
- **TypeScript 5** - 类型安全

### 样式和动画
- **Tailwind CSS 4** - 原子化 CSS 框架
- **Framer Motion** - 动画库

### AI 集成
- **Infini AI** - AI 服务提供商
- **DeepSeek-v3.2-exp** - 大语言模型

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化

## 📖 API 文档

### POST /api/chat

发送消息到 AI 助手。

**请求：**
```json
{
  "message": "你好，请介绍一下自己"
}
```

**响应：**
```json
{
  "message": "你好！我是一个AI助手...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/chat

检查 API 状态。

**响应：**
```json
{
  "status": "ok",
  "message": "AI聊天API正在运行",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel 部署指南](https://vercel.com/docs)
- [Infini AI](https://cloud.infini-ai.com)

## 📞 联系方式

如有问题或建议，欢迎提交 Issue 或 Pull Request！

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/EagleFandel">EagleFandel</a>
</p>