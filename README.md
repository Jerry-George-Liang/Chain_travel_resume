# 链途Resume

AI 驱动的在线简历编辑器 | [简体中文](./README.zh-CN.md)

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-2.0.5-green)

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | TanStack Start (React 18 + TypeScript + Vite 7) |
| 状态管理 | Zustand + persist |
| UI 组件 | Radix UI + HeroUI + Shadcn/ui |
| 富文本编辑 | Tiptap |
| 样式 | Tailwind CSS 3.4 + Framer Motion |
| AI 集成 | Google Gemini SDK / OpenAI 兼容 API |
| PDF 导出 | html2pdf.js |

## 核心功能

- **AI 辅助写作** - 支持 Gemini/DeepSeek/OpenAI/豆包/小米/自定义模型
- **8 种简历模板** - Classic/Modern/Left-Right/Timeline/Minimalist/Elegant/Creative/Editorial
- **实时预览** - 所见即所得编辑
- **PDF 导出** - 高质量导出
- **多语言** - 中文/英文
- **自动保存** - localStorage + File System API
- **深色模式** - 完整主题切换
- **语法检查** - AI 错别字检测

## 快速开始

```bash
git clone https://github.com/Jerry-George-Liang/Chain_travel_resume.git
cd Chain_travel_resume
pnpm install
pnpm dev
```

访问 http://localhost:3010

## 项目结构

```
src/
├── app/              # TanStack 路由页面
├── components/
│   ├── templates/    # 8 个简历模板
│   ├── editor/       # 编辑器组件
│   └── ui/           # 基础组件
├── config/           # AI 模型配置
├── store/            # Zustand Store
├── types/            # TypeScript 类型
└── i18n/             # 国际化 (zh/en)
```

## Docker 部署

```bash
docker compose up -d
# 或
docker build -t liantu-resume .
docker run -d -p 3010:3010 liantu-resume
```

## API 接口

详见 [API_DOCS.md](API_DOCS.md)

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/polish` | POST | AI 简历润色 (SSE 流式) |
| `/api/grammar` | POST | 语法检查 |
| `/api/resume-import` | POST | 简历导入 (PDF/MD) |
| `/api/proxy/image` | GET/POST | 图片代理 |

## 文档

- [ARCHITECTURE.md](ARCHITECTURE.md) - 系统架构设计
- [API_DOCS.md](API_DOCS.md) - 接口规范
- [DEVELOPMENT.md](DEVELOPMENT.md) - 开发指南
- [MODULES.md](MODULES.md) - 模块详解
- [FAQ.md](FAQ.md) - 常见问题

## License

Apache 2.0 - 个人免费，商业使用需授权
