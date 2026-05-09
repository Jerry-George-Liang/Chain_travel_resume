# Changelog

本文件记录项目的所有重要变更。格式基�?[Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)�?版本号遵�?[语义化版本](https://semver.org/lang/zh-CN/)�?
This file records all notable changes to this project. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [2.0.5] - 2026-05-08

### Added / 新增

- 新增 Editorial（编辑风）简历模板，提供杂志风格的排版体�?  - Added new 'Editorial' resume template with magazine-style layout ([107a9d8](https://github.com/JOYCEQL/magic-resume/commit/107a9d8))
- 新增 Creative（创意）模板支持
- 新增小米（Xiaomi MiMo）AI 模型支持，扩�?AI 提供商选择
- 新增富文本链接功能，支持在内容中插入可点击链�?  - Add rich text link functionality ([b6f01d9](https://github.com/JOYCEQL/magic-resume/commit/b6f01d9))
- 新增模板快照功能，预生成模板缩略图以提升加载性能
  - Implement template snapshot ([0ec010e](https://github.com/JOYCEQL/magic-resume/commit/0ec010e))
  - Introduce pre-generated template snapshots ([fd76ba1](https://github.com/JOYCEQL/magic-resume/commit/fd76ba1))
- 新增 AI 润色自定义指令功能，允许用户指定特定的润色要�?  - Add custom instructions feature to AIPolishDialog ([9d1d6c4](https://github.com/JOYCEQL/magic-resume/commit/9d1d6c4))
- 新增 Markdown 导出功能，支持将简历导出为 Markdown 格式
  - Add markdown export ([2277da9](https://github.com/JOYCEQL/magic-resume/commit/2277da9))
- 新增备份配置状态显示功�?  - Add backup configuration status ([9e35a5e](https://github.com/JOYCEQL/magic-resume/commit/9e35a5e))
- 新增项目自定义链接标签和自定义字段显示标签支�?  - Add custom link labels for projects and support custom field display labels ([3f3e9a6](https://github.com/JOYCEQL/magic-resume/commit/3f3e9a6))
- 新增 BaseInfo 区域自定义字段可点击链接功能
  - Add clickable links for custom fields in BaseInfo sections ([475d9e2](https://github.com/JOYCEQL/magic-resume/commit/475d9e2))

### Changed / 改进

- 重构侧边栏主题色选择�?UI，提升用户体�?  - Redesign theme color selection in side panel ([78ccc3e](https://github.com/JOYCEQL/magic-resume/commit/78ccc3e))
- 优化 File System API 数据同步机制，引入防抖处理减�?IO 操作
  - Implement debounced file sync ([52d65ec](https://github.com/JOYCEQL/magic-resume/commit/52d65ec))
- 字体版权合规性更�?  - Font copyright ([4ecf99d](https://github.com/JOYCEQL/magic-resume/commit/4ecf99d))
- 字体权重渲染优化
  - Font-weight render ([d6e723d](https://github.com/JOYCEQL/magic-resume/commit/d6e723d))
- 更新网页截图资源
  - Update web-shot screenshot asset ([6eb7b34](https://github.com/JOYCEQL/magic-resume/commit/6eb7b34))
- 教育经历预览样式优化
  - Education preview ([8d4aa02](https://github.com/JOYCEQL/magic-resume/commit/8d4aa02))
- Modern 模板 contentPadding 调整�?0
  - Reduce contentPadding to 0 in modern template configuration ([342f1ba](https://github.com/JOYCEQL/magic-resume/commit/342f1ba))

### Fixed / 修复

- 修复字体导出问题
  - Font export ([b5468f6](https://github.com/JOYCEQL/magic-resume/commit/b5468f6))
- 修复微信二维码图片问�?  - Wechat.jpg ([6a74d8a](https://github.com/JOYCEQL/magic-resume/commit/6a74d8a))
- 修复富文本列表后多余空段落问�?  - Remove trailing empty paragraphs after lists in rich text content ([7111b3f](https://github.com/JOYCEQL/magic-resume/commit/7111b3f))
- 改进富文本编辑器状态管�?  - Improve RichEditor state ([afb8f5d](https://github.com/JOYCEQL/magic-resume/commit/afb8f5d))
- 统一各模�?BaseInfo 字段居中对齐并清理布局代码格式
  - Center align base info fields across templates and clean up layout code formatting ([9585b00](https://github.com/JOYCEQL/magic-resume/commit/9585b00))

### Refactored / 重构

- 升级 Tiptap 编辑器至 v3 版本，替换旧版列表类为原�?CSS 样式
  - Upgrade Tiptap to v3 and replace legacy list classes with native CSS styling ([99b4ae2](https://github.com/JOYCEQL/magic-resume/commit/99b4ae2))

### Documentation / 文档

- 更新许可证文�?  - Update license ([757030e](https://github.com/JOYCEQL/magic-resume/commit/757030e))
- 更新 README 和微信相关信�?  - Readme.md, wechat updates ([b0f7827](https://github.com/JOYCEQL/magic-resume/commit/b0f7827), [70389bf](https://github.com/JOYCEQL/magic-resume/commit/70389bf), [f1f05da](https://github.com/JOYCEQL/magic-resume/commit/f1f05da), [042bb72](https://github.com/JOYCEQL/magic-resume/commit/042bb72), [675f38d](https://github.com/JOYCEQL/magic-resume/commit/675f38d))
- 更新 FAQ 文档
  - Update FAQ ([5c53ece](https://github.com/JOYCEQL/magic-resume/commit/5c53ece))
- 添加赞助者信息到 README
  - Add sponsors section to README files ([92e7a57](https://github.com/JOYCEQL/magic-resume/commit/92e7a57))

---

## [2.0.4] - 2026-04-xx

### Added / 新增

- 新增 Editorial 简历模�?  - Add new 'Editorial' resume template ([107a9d8](https://github.com/JOYCEQL/magic-resume/commit/107a9d8))
- 新增富文本链接功�?- 新增模板快照和预生成快照系统
- 新增 AI 自定义指令功�?- 新增备份配置状态显�?- 新增防抖文件同步机制
- 新增项目自定义链接标签支�?- 新增自定义字段可点击链接

### Changed / 改进

- 侧边栏主题色选择器重新设�?- File System API 同步优化
- 字体版权和渲染优�?
### Fixed / 修复

- 字体导出、微信图片、富文本空段落等问题修复
- BaseInfo 字段对齐优化

---

## [2.0.3] - 2026-03-xx

### Added / 新增

- 新增日期输入"至今"开关功能，激活时禁用结束日期选择�?  - Add 'To Present' switch for date and date range inputs ([023c9cb](https://github.com/JOYCEQL/magic-resume/commit/023c9cb))
- 新增 Modern 模板侧边栏布局，调整教育经历位置并优化样式
  - Introduce a sidebar layout for the Modern template ([3330265](https://github.com/JOYCEQL/magic-resume/commit/3330265))
- 新增自我评价模块
  - Add self-evaluation section ([c5225a2](https://github.com/JOYCEQL/magic-resume/commit/c5225a2))
- 新增证书管理模块（含图片上传�?  - Add certificates section with image ([e870bd4](https://github.com/JOYCEQL/magic-resume/commit/e870bd4))
- 扩展字体配置选项
  - Add more fonts config ([a875349](https://github.com/JOYCEQL/magic-resume/commit/a875349), [395eda2](https://github.com/JOYCEQL/magic-resume/commit/395eda2))
- 实现字体导出功能
  - Export font ([0a4dfd9](https://github.com/JOYCEQL/magic-resume/commit/0a4dfd9))

### Changed / 改进

- 更新默认 Gemini 模型�?`gemini-flash-latest`
  - Update default Gemini model to gemini-flash-latest ([c62e983](https://github.com/JOYCEQL/magic-resume/commit/c62e983))
- 优化各模块描述和详情的上边距
- 优化模板 UI 样式
- 移除 Field 组件�?required 属性和星号指示�?
### Fixed / 修复

- 修复预览栏导出按钮问�?  - PreviewDock bar export ([dee081e](https://github.com/JOYCEQL/magic-resume/commit/dee081e))

### Refactored / 重构

- 提取简历列表页面组件和工具函数到独立文�?  - Extract resume list page components and utilities ([f78518b](https://github.com/JOYCEQL/magic-resume/commit/f78518b))

---

## [2.0.2] - 2026-02-xx

### Added / 新增

- 实现空白简历创建功能，增强标准模块管理和新增模�?UI
  - Implement blank resume creation and enhance section management ([5c6dc7f](https://github.com/JOYCEQL/magic-resume/commit/5c6dc7f))
- 集成 Gemini API，实现简历导入、AI 润色和语法检查三大核心功�?  - Integrate Gemini API for resume import && AI polishing && AI grammar ([7dda46a](https://github.com/JOYCEQL/magic-resume/commit/7dda46a))

### CI/CD

- 添加 GitHub Actions 自动发布工作流和版本更新流程
  - Add GitHub Actions workflow for automated releases ([34ff7ba](https://github.com/JOYCEQL/magic-resume/commit/34ff7ba))
  - Bumpp and release ([950a328](https://github.com/JOYCEQL/magic-resume/commit/950a328))

---

## [2.0.1] - 2026-01-xx

### Added / 新增

- 实现简历创建弹窗，包含模板选择和预览功�?  - Implement resume creation modal with template selection ([accd34d](https://github.com/JOYCEQL/magic-resume/commit/accd34d))

### Fixed / 修复

- 修复 Creative �?Modern 模板 BaseInfo 区域白色文字颜色问题
  - Set white text color in BaseInfo sections of creative and modern templates ([86d5c55](https://github.com/JOYCEQL/magic-resume/commit/86d5c55))

---

## [2.0.0] - 2025-12-xx

🎉 **重大更新：迁移至 TanStack Start 框架**

**Major Update: Migration to TanStack Start Framework**

本次发布标志着 ��;Resume 的重大里程碑——我们已完全将核心框架迁移至 [TanStack Start](https://tanstack.com/start/latest)�?这为路由、性能和开发者体验带来了巨大的改进�?
This release marks a significant milestone as we have completely migrated our core framework to TanStack Start,
bringing massive improvements in routing, performance, and developer experience.

### Added / 新增

#### 核心框架重构
- **框架迁移**: 从原有架构完全迁移到 TanStack Start (React 18 + TypeScript + Vite 7)
  - refactor: to tanstack start ([68d8036](https://github.com/JOYCEQL/magic-resume/commit/68d8036))
- **UI 组件库集�?*: 集成 Shadcn/ui、Radix UI、HeroUI 组件体系
  - Shadcn/ui config ([ebc240d](https://github.com/JOYCEQL/magic-resume/commit/ebc240d))

#### AI 功能增强
- **多模型支�?*: 支持 6 �?AI 提供商（Gemini / DeepSeek / OpenAI / 豆包 / 小米 / 自定义）
- **Gemini 集成**: 实现 AI 简历导入、润色和语法检�?  - Integrate Gemini API for resume import && AI polishing && AI grammar ([7dda46a](https://github.com/JOYCEQL/magic-resume/commit/7dda46a))
- **语法检查抽�?*: 新增 AI 语法检查功能，支持错误管理和国际化
  - Introduce a grammar check drawer ([d14176d](https://github.com/JOYCEQL/magic-resume/commit/d14176d))
- **Markdown 处理**: AI 校对功能引入 Markdown 处理，使�?Streamdown 渲染，添加阿里巴巴粗体字�?  - Introduce Markdown processing for AI proofreading ([2bc2664](https://github.com/JOYCEQL/magic-resume/commit/2bc2664))

#### 模板系统重构
- **注册表模�?*: 将模板系统重构为可扩展的注册表架�?  - refactor: reorganize template system ([8a4c6d5](https://github.com/JOYCEQL/magic-resume/commit/8a4c6d5))
- **动态预�?*: 实现支持国际化的动态模板预览和本地感知路由
  - Implement dynamic template previews with i18n support ([77a5e67](https://github.com/JOYCEQL/magic-resume/commit/77a5e67))
- **实时预览**: 在模板选择中实现实时预览，移除 Compact �?Professional 模板
  - Implement live template previews in selection ([489be81](https://github.com/JOYCEQL/magic-resume/commit/489be81))
- **新增模板**: 添加更多专业模板（Creative、Editorial 等）
  - add more template ([797bcf2](https://github.com/JOYCEQL/magic-resume/commit/797bcf2))

#### 布局与交互增�?- **自动一页纸**: 智能自动布局功能，自动调整字体大小、边距和间距使简历适应单页
  - feat: Introduce auto one-page layout ([1884bd8](https://github.com/JOYCEQL/magic-resume/commit/1884bd8))
- **可折叠预览面�?*: 带专用停靠图标和支持国际化的可折叠预览面�?  - Implement collapsible preview panel ([f0edb3c](https://github.com/JOYCEQL/magic-resume/commit/f0edb3c))
- **移动端工作台**: 实现带标签导航的专用移动端工作台，增强整体响应式设计
  - Implement a dedicated mobile workbench ([6c1954b](https://github.com/JOYCEQL/magic-resume/commit/6c1954b))
- **自定义颜色选择�?*: 实现自定�?ColorPicker 组件并集成到侧边�?  - Implement a custom ColorPicker component ([f6cf5bf](https://github.com/JOYCEQL/magic-resume/commit/f6cf5bf))
- **统一日期组件**: 使用 HeroUI 实现统一的日期和日期范围输入组件
  - Add unified date and date range input components ([d7389d0](https://github.com/JOYCEQL/magic-resume/commit/d7389d0))
- **日期格式�?*: 增强日期格式化工具函数的本地化支�?  - Enhance date formatting utility with locale support ([0917d67](https://github.com/JOYCEQL/magic-resume/commit/0917d67))
- **简历复�?*: 实现简历复制功�?  - feat: duplicated resume ([c0b9dff](https://github.com/JOYCEQL/magic-resume/commit/c0b9dff))
- **模块删除确认**: 侧边栏模块删除确认对话框
  - feat: sidebar module delete confirm ([bc49353](https://github.com/JOYCEQL/magic-resume/commit/bc49353))

#### 状态管理与数据持久�?- **Zustand 集成**: 采用 Zustand 进行状态管理，配合双轨持久化中间件
  - localStorage 即时保存
  - File System Access API 本地文件存储

#### SEO 与部�?- **Sitemap**: 实现 sitemap.xml 和公共路由动�?SEO，应用路由设�?noindex
  - implement sitemap and dynamic seo ([5b8454f](https://github.com/JOYCEQL/magic-resume/commit/5b8454f))
- **Docker 支持**: 实现 Docker 构建流程
  - feat: docker build process ([f25ae5b](https://github.com/JOYCEQL/magic-resume/commit/f25ae5b))
- **Cloudflare Workers**: 添加 Cloudflare Workers 部署配置
  - chore: cloudflare workers ([41491df](https://github.com/JOYCEQL/magic-resume/commit/41491df))
  - Merge cloudflare build branch ([979cae2](https://github.com/JOYCEQL/magic-resume/commit/979cae2))

### Changed / 改进

- **预览面板隐藏方式**: �?DOM 移除改为 CSS 隐藏，确保导出时 DOM 元素始终存在
  - changed preview panel's hiding method to CSS hiding ([f7b9877](https://github.com/JOYCEQL/magic-resume/commit/f7b9877))
- **侧边栏断�?*: 将侧边栏折叠断点�?1920px 调整�?1440px
  - Adjust side panel collapse breakpoint from 1920px to 1440px ([653fb02](https://github.com/JOYCEQL/magic-resume/commit/653fb02))
- **响应式布局**: 改进响应式布局并清理未使用代码
  - Improve responsive layout and clean up unused code ([d163125](https://github.com/JOYCEQL/magic-resume/commit/d163125))
- **UUID 替换**: 使用 UUID 库替�?crypto.randomUUID 以提高兼容�?  - Use UUID instead of crypto.randomUUID ([5950819](https://github.com/JOYCEQL/magic-resume/commit/5950819))
- **进度条优�?*: 简化进度处理逻辑并改进自动滑动功�?  - Streamline progress handling and improve auto-slide functionality ([8a7fd32](https://github.com/JOYCEQL/magic-resume/commit/8a7fd32))
- **全局样式清理**: 清理全局样式并改进富文本编辑器列表样�?  - Clean up global styles and enhance list styling in rich text editor ([46bc845](https://github.com/JOYCEQL/magic-resume/commit/46bc845))
- **移除 use client**: 移除大量组件中冗余的 'use client' 指令
  - remove redundant 'use client' directives ([2876da4](https://github.com/JOYCEQL/magic-resume/commit/2876da4))
- **移除 Vercel Analytics**: 移除 Vercel Analytics 集成
  - remove Vercel Analytics integration ([1aacd57](https://github.com/JOYCEQL/magic-resume/commit/1aacd57))
- **国际化支�?*: 添加模块删除确认消息的国际化支持
  - add i18n support for module deletion confirmation ([ef9bfcd](https://github.com/JOYCEQL/magic-resume/commit/ef9bfcd))
- **PostCSS 配置**: 配置 PostCSS 构建流程
  - Post-css configuration ([9b37093](https://github.com/JOYCEQL/magic-resume/commit/9b37093), [3f6814e](https://github.com/JOYCEQL/magic-resume/commit/3f6814e))
- **ESLint 配置**: 配置 ESLint 代码规范
  - eslint config ([054b721](https://github.com/JOYCEQL/magic-resume/commit/054b721))
- **构建忽略**: 配置 TypeScript 构建忽略规则
  - build ignore ts ([6f147d4](https://github.com/JOYCEQL/magic-resume/commit/6f147d4))
- **Shadcn/ui 更新**: 更新 Shadcn/ui 组件�?  - Update shadcn/ui ([30e7623](https://github.com/JOYCEQL/magic-resume/commit/30e7623))

### Fixed / 修复

- **AI 润色点击事件**: 修复 AI 润色按钮点击事件问题
  - fix: ai polish click event ([4d35740](https://github.com/JOYCEQL/magic-resume/commit/4d35740))
- **工作区滚动锁�?*: 实现工作区视图的 body 滚动锁定
  - Implement body scroll lock for workbench view ([1c75dd8](https://github.com/JOYCEQL/magic-resume/commit/1c75dd8))
- **模板图片类型**: 更新模板图片类型定义和映射变量名
  - update template image type definition ([2193331](https://github.com/JOYCEQL/magic-resume/commit/2193331))

### Removed / 移除

- **NestJS 后端**: 移除后台 NestJS 文件�?  - remove background nestjs folder ([eb860d6](https://github.com/JOYCEQL/magic-resume/commit/eb860d6))
- **Compact & Professional 模板**: 移除这两个模板，专注于更精简的模板集�?
---

## [1.x] - 初始版本 / Initial Release

### Added / 新增

- **基础简历编辑功�?*: 可视化简历编辑器，支持多模块内容管理
- **PDF 导出**: 高质�?PDF 导出功能，保持排版格式完整�?- **多模板支�?*: 6 种初始模�?  - Classic �?传统简洁布局
  - Modern �?现代大胆设计
  - Left-Right �?双栏侧边栏布局
  - Timeline �?时间线叙事格�?  - Minimalist �?极简无干扰美�?  - Elegant �?优雅精致排版
- **国际化支�?*: 中文（简体）和英文双语界�?- **深色模式**: 完整的深色主题实�?- **实时预览**: 所见即所得的实时编辑预览
- **localStorage 持久�?*: 浏览器端数据自动保存

---

## 版本说明 / Version Notes

**语义化版本规�?(Semantic Versioning)**:
- **主版本号 (MAJOR)**: 不兼容的 API 变更
- **次版本号 (MINOR)**: 向后兼容的功能新�?- **修订�?(PATCH)**: 向后兼容的问题修�?
**变更分类 (Change Types)**:
- **Added**: 新功�?- **Changed**: 现有功能的变�?- **Deprecated**: 即将移除的功�?- **Removed**: 已移除的功能
- **Fixed**: Bug 修复
- **Security**: 安全相关修复

---

## 许可�?/ License

本项目采�?[Apache License 2.0](LICENSE) 开源协议�?
Licensed under the [Apache License, Version 2.0](LICENSE).
