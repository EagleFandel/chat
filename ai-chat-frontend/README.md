# AI聊天前端 - MVP演示

一个现代化的AI聊天前端应用，使用React + TypeScript构建，支持实时对话、代码高亮和响应式设计。

## 🚀 功能特性

### ✅ 已实现功能
- **实时聊天界面** - 美观的消息气泡设计，支持用户和AI消息区分
- **智能消息处理** - 自动检测和处理文本、代码、链接等不同类型内容
- **代码语法高亮** - 支持多种编程语言的语法高亮显示
- **响应式设计** - 适配桌面和移动设备
- **打字指示器** - 显示AI正在输入的动画效果
- **消息时间戳** - 智能显示消息发送时间
- **自动滚动** - 新消息自动滚动到底部
- **输入验证** - 防止发送空消息
- **错误处理** - 友好的错误提示和重试机制
- **会话管理** - 支持清除聊天记录
- **模拟AI服务** - 内置智能回复逻辑，支持代码示例生成

### 🎨 UI/UX特性
- **现代化设计** - 使用Tailwind CSS构建的美观界面
- **流畅动画** - 消息出现、打字指示器等动画效果
- **直观交互** - 支持回车发送、Shift+回车换行
- **视觉反馈** - 加载状态、悬停效果等
- **可访问性** - 支持键盘导航和屏幕阅读器

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **状态管理**: React Context + useReducer
- **样式系统**: Tailwind CSS
- **构建工具**: Vite
- **测试框架**: Vitest + Testing Library
- **属性测试**: fast-check
- **代码高亮**: react-syntax-highlighter
- **Markdown渲染**: react-markdown
- **图标库**: Lucide React

## 📦 安装和运行

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:5173 查看应用

### 构建生产版本
```bash
npm run build
```

### 运行测试
```bash
# 运行所有测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:run
```

## 🧪 测试策略

本项目采用双重测试方法：

### 单元测试
- 验证特定功能和边缘情况
- 测试组件渲染和交互
- 验证错误处理逻辑

### 属性测试 (Property-Based Testing)
- 使用fast-check库进行随机输入测试
- 验证系统在各种输入下的正确性
- 每个属性测试运行100+次迭代

### 测试覆盖的属性
1. **消息添加一致性** - 发送消息正确添加到历史
2. **空消息拒绝** - 空白消息被正确拒绝
3. **消息渲染一致性** - 用户/AI消息正确渲染
4. **会话清除完整性** - 清除操作正确重置状态

## 🎯 MVP演示功能

### 基本对话
1. 在输入框中输入任何消息
2. 按回车或点击发送按钮
3. AI会智能回复相关内容

### 代码演示
输入包含"代码"、"code"或"编程"的消息，AI会返回带语法高亮的代码示例：

```
用户: 请给我一个JavaScript代码示例
AI: 关于编程，这里是一个简单的例子：

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

### 链接处理
发送包含URL的消息，链接会自动转换为可点击的超链接。

### 响应式测试
- 调整浏览器窗口大小查看响应式效果
- 在移动设备上测试触摸交互

## 🔧 项目结构

```
src/
├── components/          # React组件
│   ├── ChatContainer.tsx    # 主聊天容器
│   ├── MessageList.tsx      # 消息列表
│   ├── MessageBubble.tsx    # 消息气泡
│   ├── MessageInput.tsx     # 消息输入
│   └── TypingIndicator.tsx  # 打字指示器
├── hooks/              # 自定义Hooks
│   ├── ChatContext.tsx      # 聊天上下文
│   └── useChatReducer.ts    # 状态管理
├── types/              # TypeScript类型定义
│   └── index.ts
├── utils/              # 工具函数
│   ├── validation.ts        # 验证函数
│   └── helpers.ts           # 辅助函数
└── test/               # 测试配置
    └── setup.ts
```

## 🚧 后续开发计划

### 后端集成
- 集成真实的AI API（如OpenAI、Claude等）
- 实现用户认证和会话持久化
- 添加消息历史存储

### 功能增强
- 支持文件上传和图片消息
- 添加消息搜索功能
- 实现多会话管理
- 支持消息导出

### 性能优化
- 实现虚拟滚动处理大量消息
- 添加消息懒加载
- 优化包大小和加载速度

## 📝 开发说明

### 状态管理
使用React Context + useReducer模式管理全局状态，支持：
- 消息发送和接收
- 打字状态管理
- 错误处理
- 会话管理

### 样式系统
采用Tailwind CSS + 自定义CSS的混合方案：
- Tailwind用于快速原型和响应式设计
- 自定义CSS用于复杂动画和特殊效果

### 测试哲学
遵循"测试金字塔"原则：
- 大量单元测试验证核心逻辑
- 属性测试验证系统正确性
- 少量集成测试验证用户流程

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [React](https://reactjs.org/) - 用户界面库
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Vite](https://vitejs.dev/) - 构建工具
- [fast-check](https://fast-check.dev/) - 属性测试库

---

**注意**: 这是一个MVP演示版本，AI回复功能使用模拟数据。在生产环境中需要集成真实的AI服务。