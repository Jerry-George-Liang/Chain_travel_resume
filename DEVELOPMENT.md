# ��;Resume 开发指�?
## 目录

- [项目概述](#项目概述)
- [环境搭建](#环境搭建)
- [快速开始](#快速开�?
- [项目结构](#项目结构)
- [开发规范](#开发规�?
- [调试技巧](#调试技�?
- [测试](#测试)
- [性能优化](#性能优化)
- [常见开发场景](#常见开发场�?
- [部署指南](#部署指南)

---

## 项目概述

**��;Resume** 是一个基�?AI 的智能简历生成与编辑平台，支持多模板、多语言、实时预览和 PDF 导出功能�?
| 属�?| �?|
|------|-----|
| 项目名称 | liantu-resume |
| 当前版本 | 2.0.5 |
| 包管理器 | pnpm 10.3.0 |
| Node.js 要求 | >= 18 (推荐 20+) |
| TypeScript | 5.x |
| 构建工具 | Vite 7.3.1 |
| 框架 | TanStack Start (@tanstack/react-start ^1.160.2) |
| UI 组件�?| Shadcn/ui + Radix UI + HeroUI |
| 状态管�?| Zustand |
| 富文本编辑器 | Tiptap |
| CSS 框架 | Tailwind CSS 3.4 |

---

## 环境搭建

### 运行时要�?
| 工具 | 版本要求 | 推荐版本 |
|------|----------|----------|
| Node.js | >= 18.0.0 | 20.x LTS |
| pnpm | >= 8.0.0 | 10.3.0 |
| Git | 最新版 | - |

### 安装步骤

```bash
# 1. 克隆仓库
git clone <repository-url>
cd liantu-resume-main

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev
```

### 开发工具推�?
**IDE**: VS Code

**推荐扩展**:

| 扩展名称 | 用�?|
|----------|------|
| ESLint | 代码检�?|
| Prettier | 代码格式�?|
| TypeScript Vue Plugin (Volar) | TypeScript 支持 |
| Tailwind CSS IntelliSense | Tailwind 类名提示 |
| Path Intellisense | 路径自动补全 |

### 环境变量

本项目主要在客户端运行，无必需的环境变量。AI 功能需要用户在应用设置中自行配�?API Key（存储于 localStorage）�?
---

## 快速开�?
### 可用脚本命令

```bash
# 开发模式（端口 3010�?pnpm dev

# 生产构建（含路由生成�?pnpm build

# 启动生产服务�?pnpm start

# 预览构建结果
pnpm preview

# 版本发布（自动化版本号管理）
pnpm release

# 生成模板截图
pnpm generate:template-snapshots

# 安装 Playwright 测试浏览�?pnpm install:playwright
```

### 首次运行验证

1. 执行 `pnpm dev` 启动开发服务器
2. 浏览器访�?`http://localhost:3010`
3. 确认页面正常加载，无控制台报�?
---

## 项目结构

```
liantu-resume-main/
├── public/                      # 静态资�?�?  ├── fonts/                   # 字体文件
�?  ├── template-snapshots/      # 模板截图（中英文�?�?  └── features/                # 功能图标资源
├── src/
�?  ├── actions/                 # 服务�?Action
�?  ├── app/                     # 应用路由与布局
�?  �?  ├── api/                 # API 路由（语法检查、润色等�?�?  �?  └── app/                 # 页面组件
�?  �?      ├── dashboard/       # 仪表盘（简历列表、AI、设置、模板）
�?  �?      └── workbench/       # 编辑工作�?�?  ├── components/              # 组件�?�?  �?  ├── ai/                  # AI 相关组件（模型图标）
�?  �?  ├── editor/              # 简历编辑器面板
�?  �?  �?  ├── basic/           # 基础信息编辑
�?  �?  �?  ├── experience/      # 工作经历
�?  �?  �?  ├── education/       # 教育背景
�?  �?  �?  ├── project/         # 项目经验
�?  �?  �?  ├── skills/          # 技能标�?�?  �?  �?  ├── certificates/    # 证书
�?  �?  �?  ├── custom/          # 自定义模�?�?  �?  �?  ├── grammar/         # 语法检�?�?  �?  �?  ├── layout/          # 布局设置
�?  �?  �?  └── self-evaluation/ # 自我评价
�?  �?  ├── home/                # 首页组件
�?  �?  ├── mobile/              # 移动端适配
�?  �?  ├── preview/             # 预览相关
�?  �?  ├── shared/              # 共享组件
�?  �?  ├── templates/           # 简历模板（8种风格）
�?  �?  �?  ├── classic/         # 经典模板
�?  �?  �?  ├── modern/          # 现代模板
�?  �?  �?  ├── minimalist/      # 极简模板
�?  �?  �?  ├── elegant/         # 优雅模板
�?  �?  �?  ├── creative/        # 创意模板
�?  �?  �?  ├── editorial/       # 编辑风模�?�?  �?  �?  ├── left-right/      # 左右分栏模板
�?  �?  �?  ├── timeline/        # 时间线模�?�?  �?  �?  └── shared/          # 模板共享组件
�?  �?  └── ui/                  # 基础 UI 组件（Shadcn/ui�?�?  ├── config/                  # 配置文件
�?  �?  ├── ai.ts                # AI 模型配置
�?  �?  ├── constants.ts         # 全局常量
�?  �?  ├── initialResumeData.ts # 初始简历数�?�?  �?  └── modules.ts           # 模块配置
�?  ├── hooks/                   # 自定�?Hooks
�?  ├── i18n/                    # 国际�?�?  �?  ├── locales/             # 翻译文件（en.json, zh.json�?�?  �?  └── config.ts            # i18n 配置
�?  ├── lib/                     # 工具函数�?�?  ├── routes/                  # TanStack Router 路由定义
�?  ├── store/                   # Zustand 状态管�?�?  ├── styles/                  # 全局样式
�?  ├── theme/                   # 主题配置
�?  ├── types/                   # TypeScript 类型定义
�?  └── utils/                   # 工具函数
├── scripts/                     # 构建脚本
├── vite.config.ts               # Vite 配置
├── tailwind.config.ts           # Tailwind 配置
├── tsconfig.json                # TypeScript 配置
├── components.json              # Shadcn/ui 配置
├── wrangler.toml                # Cloudflare Workers 配置
└── server.mjs                   # 生产服务入口
```

### 关键配置说明

#### vite.config.ts

- 开发服务器端口：`3010`（strictPort 模式�?- 构建目标：ES2020
- SSR 配置：pdfjs-dist 不外部化
- 插件链：tsconfigPaths �?tanstackStart �?viteReact

#### tailwind.config.ts

- 暗色模式：class 策略
- 自定义主题色系统（CSS 变量驱动�?- 字体：Inter（无衬线�? Newsreader（衬线）
- 动画：fade-in/out, shimmer, float �?- 集成 HeroUI �?tailwindcss-animate

#### tsconfig.json

- 严格模式启用（strict: true�?- 路径别名：`@/*` �?`./src/*`
- 目标：ESNext，模块解析：bundler

---

## 开发规�?
### 代码风格

| 规范�?| 标准 |
|--------|------|
| 语言 | TypeScript 严格模式 |
| 组件范式 | 函数式组�?+ Hooks |
| 缩进 | 2 空格 |
| 尾逗号 | ES5 以上对象/数组使用 trailing comma |
| 引号 | 根据 ESLint 配置（推荐单引号�?|

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `ResumeCardItem.tsx`, `EditorHeader.tsx` |
| 工具/Hook | camelCase | `useResumeStore.ts`, `useAutoOnePage.ts` |
| 常量 | UPPER_SNAKE_CASE | `DEFAULT_CONFIG`, `MAX_FILE_SIZE` |
| 类型接口 | PascalCase | `ResumeData`, `TemplateConfig` |

### 文件组织规范

- 每个独立组件使用独立文件�?- 主组件文件名：`index.tsx`
- 配置文件：`config.ts`
- 类型定义优先同目录或 `types/` 子目�?- 共享逻辑提取�?`lib/` �?`utils/`

### Git 工作�?
#### 分支策略

| 分支类型 | 用�?| 命名示例 |
|----------|------|----------|
| main | 生产稳定分支 | - |
| develop | 开发集成分�?| - |
| feature/* | 新功能开�?| feature/add-video-template |
| fix/* | Bug 修复 | fix/editor-crash-on-paste |
| hotfix/* | 紧急修�?| hotfix/critical-pdf-export |

#### 提交信息规范（Conventional Commits�?
```
<type>(<scope>): <subject>

<body>
```

**Type 列表**:

| Type | 用�?|
|------|------|
| feat | 新功�?|
| fix | Bug 修复 |
| docs | 文档更新 |
| style | 代码格式调整（不影响功能�?|
| refactor | 重构（非新功能、非修复�?|
| test | 测试相关 |
| chore | 构建/工具�?依赖变更 |

**提交示例**:

```bash
feat(template): add minimalist template design

Implement a clean, single-column layout with minimal visual elements.
Includes responsive adjustments for mobile viewports.

fix(editor): resolve tiptap editor crash on paste

Handle null content edge case in onPaste handler by adding
optional chaining before calling editor.commands.insertContent().
docs(readme): update installation guide for Windows
```

#### PR 流程

1. Fork 仓库 �?创建特性分�?2. 完成开发并提交
3. 创建 Pull Request，包含：
   - 变更说明
   - 关联 Issue 编号
   - 测试方法
   - UI 变更需附截�?4. Code Review �?通过后合�?
---

## 调试技�?
### React DevTools

- 安装浏览器扩展（Chrome/Firefox�?- 查看 Component 树层级和 Props 传�?- 监控 State 变更历史
- 使用 Profiler 进行性能分析

### Zustand DevTools

Store 已集�?devtools 中间件，支持�?
- 查看 State 变更完整历史
- 时间旅行调试（回溯到任意状态快照）
- 导出/导入 State 快照

### 网络请求调试

使用浏览�?DevTools Network 面板�?
- 查看 AI API 请求/响应详情
- SSE（Server-Sent Events）流式响应实时查�?- Performance 面板分析页面加载时间�?- 分析资源大小和加载顺�?
### 常见问题排查

| 问题 | 解决方案 |
|------|----------|
| 端口 3010 被占�?| 修改 `vite.config.ts` �?`server.port` 或终止占用进�?|
| 依赖安装失败 | 清除缓存：`rm -rf node_modules pnpm-lock.yaml && pnpm install` |
| TypeScript 编译错误 | 运行 `pnpm build` 查看完整错误堆栈 |
| 样式未生�?| 检�?Tailwind 类名拼写、CSS 作用域冲�?|
| 路由不匹�?| 检�?`routes/` 目录结构�?`$` 参数命名 |
| HMR 不生�?| 重启开发服务器，检�?Vite 配置 |

---

## 测试

### E2E 测试

| 属�?| �?|
|------|-----|
| 工具 | Playwright ^1.58.2 |
| 安装命令 | `pnpm install:playwright` |
| 浏览�?| Chromium |
| 测试目录 | `tests/`（待建立�?|

```bash
# 安装浏览�?pnpm install:playwright

# 运行 E2E 测试
npx playwright test

# 运行特定测试文件
npx playwright test resume-editor.spec.ts

# UI 模式调试
npx playwright test --ui
```

### 单元测试（建议配置）

当前项目尚未配置单元测试框架，建议采用以下技术栈�?
- **测试框架**: Vitest
- **测试�?*: @testing-library/react
- **Mock �?*: msw（API Mock�?
```bash
# 建议安装
pnpm add -D vitest @testing-library/react jsdom @testing-library/jest-dom
```

---

## 性能优化

### 开发环境优�?
- **HMR（热模块替换�?*: Vite 默认开启，修改代码即时生效
- **React.memo**: 对纯展示型组件包裹，避免不必要的重渲�?- **虚拟滚动**: 大量列表数据时使用（简历条目较多场景）
- **计算缓存**: 避免�?render 内进行重度运�?
### 构建优化

| 优化策略 | 说明 |
|----------|------|
| 代码分割 | 使用动�?`import()` 实现路由级懒加载 |
| Tree Shaking | Vite 自动移除未使用的导出代码 |
| 资源压缩 | esbuild 压缩 JS/CSS，自动处�?|
| 图片优化 | 优先使用 WebP 格式，按需加载 |

### 运行时优�?
- **防抖/节流**: 用户输入搜索、窗�?resize 等高频事�?- **路由级懒加载**: TanStack Router 支持代码分割
- **结果缓存**: API 响应缓存、计算密集操�?memoization
- **Web Workers**: PDF 生成等重型任务可迁移�?Worker 线程

---

## 常见开发场�?
### 添加新模�?
1. �?`src/components/templates/` 下创建新目录（如 `my-template/`�?
2. 编写 `config.ts` 定义模板元信息：

```typescript
export const myTemplateConfig: TemplateConfig = {
  id: 'my-template',
  name: 'My Template',
  nameZh: '我的模板',
  thumbnail: '/template-snapshots/en/my-template.png',
  // ...
}
```

3. 编写 `index.tsx` 主组件和 `sections/` 子组�?
4. �?`src/components/templates/registry.ts` 注册模板

5. 生成模板截图�?
```bash
pnpm generate:template-snapshots
```

### 添加新的 AI 模型

1. 编辑 `src/config/ai.ts`，添加模型配置对�?
2. 实现 `AIModelConfig` 接口（endpoint、参数映射等�?
3. 更新 `AIModelType` 类型联合

4. 在设置页面（`src/app/app/dashboard/settings/page.tsx`）添加配�?UI

5. 如需图标，在 `src/components/ai/icon/` 创建对应图标组件

### 添加新语言支持

1. �?`src/i18n/locales/` 下新建翻译文件（�?`ja.json`�?
2. 更新 `src/i18n/config.ts` 添加语言选项

3. 更新 `src/config/initialResumeData.ts` 添加该语言默认数据

4. 生成对应语言的模板截�?
### 修改简历数据结�?
1. 更新 `src/types/resume.ts` 类型定义

2. 更新 Store（`src/store/useResumeStore.ts`）的初始状态和操作

3. 更新所有引用该类型的组件（编辑器、预览、导出等�?
4. 考虑向后兼容：旧数据的自动迁移策�?
---

## 部署指南

> 详细部署文档请参�?[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### 本地部署

```bash
pnpm build
pnpm start
```

### Docker 部署

```bash
docker compose up -d
```

### Vercel 部署（推荐）

- 连接 GitHub 仓库，开启自�?CI/CD
- 支持 Edge Functions 边缘函数
- 自动 HTTPS �?CDN 加�?
### Cloudflare Workers

- 配置文件：`wrangler.toml`
- 适用于全球边缘节点部�?
---

## 附录

### 技术栈速查

| 类别 | 技�?|
|------|------|
| 框架 | TanStack Start (React Server Components) |
| 路由 | TanStack Router (文件系统路由) |
| UI 基础 | Radix UI + Shadcn/ui + HeroUI |
| 样式方案 | Tailwind CSS + CSS Variables |
| 状态管�?| Zustand |
| 富文�?| Tiptap |
| 国际�?| 自定�?i18n 方案 |
| PDF 生成 | html2canvas + html2pdf.js / Puppeteer |
| AI 集成 | OpenAI / Gemini / DeepSeek / Doubao |
| E2E 测试 | Playwright |
| 部署 | Vercel / Cloudflare Workers / Docker |

### 关键文件索引

| 文件路径 | 用�?|
|----------|------|
| [vite.config.ts](./vite.config.ts) | Vite 构建与开发服务器配置 |
| [tailwind.config.ts](./tailwind.config.ts) | Tailwind 主题与样式配�?|
| [tsconfig.json](./tsconfig.json) | TypeScript 编译选项 |
| [components.json](./components.json) | Shadcn/ui 组件配置 |
| [wrangler.toml](./wrangler.toml) | Cloudflare Workers 部署配置 |
| [src/config/ai.ts](./src/config/ai.ts) | AI 模型配置中心 |
| [src/store/useResumeStore.ts](./src/store/useResumeStore.ts) | 简历状态管�?Store |
| [src/types/resume.ts](./src/types/resume.ts) | 简历数据类型定�?|
| [src/components/templates/registry.ts](./src/components/templates/registry.ts) | 模板注册�?|
| [src/routes/](./src/routes/) | TanStack Router 路由定义 |
