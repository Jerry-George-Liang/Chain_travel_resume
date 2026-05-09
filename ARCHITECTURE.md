# ��;Resume 系统架构设计文档

## 1. 系统概述

��;Resume 是一款面向求职者和职场人士的现代化在线简历编辑器，基�?TanStack Start 全栈框架构建。系统核心价值在�?*AI 驱动的智能写作辅�?*�?*高度可定制的多模板渲染引�?*的结合�?
目标用户包括�?- **应届毕业�?*：需要快速生成专业格式的首份简�?- **职场跳槽�?*：需要针对不同岗位定制多版本简�?- **自由职业�?*：需要频繁更新作品集和项目经�?
核心能力矩阵�?| 能力维度 | 实现方式 |
|---------|---------|
| 智能写作 | Gemini/DeepSeek/OpenAI �?6 �?AI 模型接入 |
| 视觉呈现 | 8 套专业模�?+ 实时预览 + 自定义主�?|
| 数据安全 | 本地存储优先 + File System API 双轨持久�?|
| 导出能力 | PDF 导出（html2pdf.js 客户�?/ Puppeteer 服务端） |
| 国际�?| 中英双语完整支持 |

---

## 2. 整体架构�?
```
┌─────────────────────────────────────────────────────────────────────�?�?                        Client Browser                              �?�? ┌──────────�? ┌────────────�? ┌─────────────�? ┌───────────────�? �?�? �? Landing  �? �?Dashboard  �? �? Workbench  �? �? Template     �? �?�? �?  Page    �? �? (CRUD)    �? �?(Editor+PV)  �? �? Gallery     �? �?�? └────┬─────�? └─────┬──────�? └──────┬──────�? └───────┬───────�? �?�?      └──────────────┴────────────────┴─────────────────�?          �?�?                           �?                                       �?�? ┌───────────────────────────────────────────────────────────────�? �?�? �?                   Zustand Store Layer                         �? �?�? �? ┌─────────────────�? ┌─────────────�? ┌──────────────────�? �? �?�? �? �?useResumeStore  �? │useAIConfigSt�? �?useGrammarStore  �? �? �?�? �? �?(persist+FS)    �? �?   ore      �? �?                 �? �? �?�? �? └────────┬────────�? └──────┬──────�? └────────┬─────────�? �? �?�? �?          └──────────────────┼───────────────────�?           �? �?�? └──────────────────────────────┼────────────────────────────────�? �?�?                                �?                                  �?�? ┌──────────────────────────────┼────────────────────────────────�? �?�? �?             Component Layer (React 18 + TypeScript)            �? �?�? �? ┌──────────�? ┌──────────�? ┌──────────�? ┌────────────────�? �? �?�? �? �?Editor   �? �?Preview  �? │Template  �? �?Shared/UI      �? �? �?�? �? �?Panels   �? �?Renderer �? �?Registry �? �?(Radix+HeroUI) �? �? �?�? �? └──────────�? └──────────�? └──────────�? └────────────────�? �? �?�? └────────────────────────────────────────────────────────────────�? �?└─────────────────────────────────────────────────────────────────────�?                                    �?                                    �?HTTP / SSE
┌─────────────────────────────────────────────────────────────────────�?�?                   Server (TanStack Start SSR)                      �?�?                                                                    �?�? ┌─────────────────────────────────────────────────────────────�?   �?�? �?                   API Routes Layer                          �?   �?�? �? ┌──────────────�? ┌────────────�? ┌─────────────────────�? �?   �?�? �? �?/api/polish  �? �?/api/gramm �? �?/api/proxy/image    �? �?   �?�? �? �?(AI润色-SSE) �? �?ar(语法检�?�? �?(CORS代理)          �? �?   �?�? �? └──────┬───────�? └─────┬──────�? └──────────┬──────────�? �?   �?�? �?        └────────────────┼────────────────────�?            �?   �?�? └─────────────────────────┼───────────────────────────────────�?   �?�?                            �?                                      �?�? ┌─────────────────────────┼───────────────────────────────────�?   �?�? �?             Service / Lib Layer                             �?   �?�? �? ┌──────────────────�? ┌──────────────────────────────────�? �?   �?�? �? �?lib/server/      �? �?PDF Export (Puppeteer SSR)       �? �?   �?�? �? �?gemini.ts        �? �?utils/export.ts                  �? �?   �?�? �? └──────────────────�? └──────────────────────────────────�? �?   �?�? └─────────────────────────────────────────────────────────────�?   �?└─────────────────────────────────────────────────────────────────────�?          �?                   �?                   �?          �?                   �?                   �?┌────────────────�? ┌─────────────────�? ┌──────────────────�?�?AI Providers   �? �?External APIs   �? �?Storage          �?�?               �? �?                �? �?                 �?�?�?Google Gemini�? �?�?Image CDN     �? �?�?localStorage   �?�?�?DeepSeek     �? �?  (proxy)       �? �?�?File System API�?�?�?OpenAI       �? �?                �? �?  (user selected)�?�?�?豆包(Doubao) �? └─────────────────�? �?�?JSON files      �?�?�?小米(Xiaomi) �?                      └──────────────────�?�?�?Custom(OAI)  �?└────────────────�?```

### 架构层次说明

| 层次 | 职责 | 关键技�?|
|-----|------|---------|
| **表现�?* | 页面路由、用户交互、实时预�?| React 18, TanStack Router, Framer Motion |
| **状态层** | 简历数据管理、AI配置、语法状�?| Zustand + persist middleware |
| **组件�?* | 编辑器面板、模板渲染、共享UI | Tiptap, Radix UI, HeroUI, Shadcn/ui |
| **服务�?* | API路由、AI调用封装、PDF导出 | TanStack Start Routes, Puppeteer |
| **外部�?* | AI模型、图片CDN、本地存�?| Gemini SDK, OpenAI API, File System API |

---

## 3. 技术栈选型说明

### 3.1 核心框架

| 技�?| 版本 | 选型理由 | Alternatives 对比 |
|------|------|---------|------------------|
| **TanStack Start** | ^1.160.2 | 全栈React框架，支持SSR/SSG、文件系统路由、API Routes一体化 | Next.js: 更成熟但约定更强；Remix: 类似但TanStack生态更统一 |
| **React** | ^18 | 声明式UI、Hooks、Concurrent Features | Vue 3: 更轻量但生态差异；Svelte: 编译时优化但社区�?|
| **TypeScript** | ^5 | 类型安全、IDE支持、重构友�?| JavaScript: 无类型保护；Flow: 已被TS超越 |
| **Vite** | ^7.3.1 | 极速HMR、原生ESM、构建优�?| Webpack: 配置复杂；esbuild: 功能有限 |

### 3.2 路由与状�?
| 技�?| 选型理由 | 关键特�?|
|------|---------|---------|
| **@tanstack/react-router** | 文件系统路由、类型安全导航、嵌套路由布局 | 路由级代码分割、搜索参数状态管�?|
| **Zustand** | 极简API、无Boilerplate、中间件生�?| `persist`中间件自动序列化、支持部分持久化 |

### 3.3 UI 组件体系

| 技术层�?| �?| 用�?|
|---------|---|------|
| **基础原子** | Radix UI | 无样式可访问性原语（Dialog、Dropdown等） |
| **高级复合** | HeroUI (@heroui) | 数据密集型组件（DateInput、Checkbox�?|
| **设计系统** | Shadcn/ui (自定�? | Button、Card、Input等统一风格 |
| **富文�?* | Tiptap v3 | 可扩展的ProseMirror编辑器（颜色、高亮、列表） |

### 3.4 AI 与导�?
| 技�?| 用量 | 选型考量 |
|------|------|---------|
| **@google/generative-ai** | Gemini原生SDK | 多模态支持、流式响�?|
| **OpenAI兼容API** | DeepSeek/豆包/小米/Custom | 统一接口抽象层适配 |
| **html2pdf.js** | 客户端PDF | 轻量、无需服务端依�?|
| **Puppeteer** | 服务端PDF (SSR) | 高保真渲染、支持复杂CSS |

### 3.5 工程化工�?
| 技�?| 用�?|
|------|------|
| **Tailwind CSS 3.4** | 原子化CSS、主题变量系�?|
| **Framer Motion** | 动画系统（淡入淡出、悬浮效果） |
| **next-intl** | 国际化框架（i18n/routing/middleware�?|
| **pnpm 10.3.0** | 高效磁盘利用、严格依赖管�?|

---

## 4. 模块划分与职�?
### 4.1 目录结构总览

```
src/
├── app/                        # [页面层] TanStack Start 路由页面
�?  ├── (public)/[locale]/      # 公开访问页（Landing、Auth�?�?  ├── api/                    # API端点（grammar、polish、image proxy�?�?  └── app/                    # 应用主区�?�?      ├── dashboard/          # 仪表盘：简历列�?AI设置/模板管理
�?      └── workbench/[id]/     # 编辑工作台：编辑�?预览双栏
�?├── components/                 # [组件层] 可复用UI组件
�?  ├── templates/              # �?8套简历模板（核心资产�?�?  �?  ├── {name}/             #   config.ts (配置) + index.tsx (渲染)
�?  �?  �?  └── sections/       #   各模块Section组件
�?  �?  ├── shared/             #   共享Section（Certificates等）
�?  �?  ├── registry.ts         #   �?模板注册表（统一入口�?�?  �?  └── TemplateContext.tsx  #   模板上下文Provider
�?  ├── editor/                 # 编辑器面板组�?�?  �?  ├── basic/              # 基本信息（姓名、照片、联系方式）
�?  �?  ├── education/          # 教育经历（学校、专业、GPA�?�?  �?  ├── experience/         # 工作经验（公司、职位、详情）
�?  �?  ├── project/            # 项目经历（名称、角色、描述）
�?  �?  ├── skills/             # 技能标签（自由文本/Tiptap�?�?  �?  ├── certificates/       # 证书管理（图片上传）
�?  �?  ├── grammar/            # 语法检查抽�?�?  �?  └── self-evaluation/    # 自我评价
�?  ├── preview/                # 预览容器（Iframe隔离、Dock工具栏）
�?  ├── shared/                 # 跨页面共享组�?�?  �?  ├── ai/                 # AI润色对话�?�?  �?  ├── rich-editor/        # Tiptap富文本封�?�?  �?  └── PdfExport.tsx       # PDF导出入口
�?  └── ui/                     # 基础UI原子组件�?�?├── store/                      # [状态层] Zustand Store
�?  ├── useResumeStore.ts       # �?主Store（简历CRUD+持久化）
�?  ├── useAIConfigStore.ts     # AI模型配置（API Key、Endpoint�?�?  └── useGrammarStore.ts      # 语法检查结果缓�?�?├── config/                     # [配置层] 静态配置与常量
�?  ├── ai.ts                   # �?6种AI模型配置（Adapter模式�?�?  ├── constants.ts            # 全局常量
�?  ├── initialResumeData.ts    # 初始数据模板（中英文�?�?  ├── modules.ts              # 模块元信息定�?�?  └── faq.tsx                 # FAQ内容配置
�?├── types/                      # [类型层] TypeScript类型定义
�?  ├── resume.ts               # ResumeData、BasicInfo、Experience�?�?  └── template.ts             # ResumeTemplate、TemplateConfig
�?├── hooks/                      # [逻辑层] 自定义Hooks
�?  ├── useAIConfiguration.tsx  # AI配置表单逻辑
�?  ├── useGrammarCheck.ts      # 语法检查调�?�?  ├── useAutoOnePage.ts       # 自动单页检�?�?  ├── useResumeDirectorySync.ts# 文件系统目录同步
�?  └── useTemplateSnapshots.ts # 模板快照懒加�?�?├── lib/                        # [工具库] 通用工具函数
�?  ├── server/gemini.ts        # Gemini API服务端封�?�?  ├── utils.ts                # 通用工具（cn、formatDate等）
�?  ├── richText.ts             # 富文本处�?�?  └── templatePreview.ts      # 模板预览图生�?�?├── utils/                      # [业务工具] 领域特定工具
�?  ├── export.ts               # PDF导出核心逻辑
�?  ├── fileSystem.ts           # File System API封装
�?  ├── resumeFileSync.ts       # 简历文件同步策�?�?  └── print.ts                # 打印样式处理
�?├── i18n/                       # [国际化] 多语言支持
�?  ├── locales/                # zh.json, en.json
�?  ├── config.ts               # 语言配置
�?  └── compat/                 # next-intl兼容�?�?└── routes/                     # [路由定义] TanStack Router文件
    ├── app/                    # 应用页面路由
    └── api/                    # API路由定义
```

### 4.2 模块间依赖关�?
```
                    ┌─────────────�?                    �?  app/*     �?(页面入口)
                    └──────┬──────�?                           �?imports
              ┌────────────┼────────────�?              �?           �?           �?     ┌────────────�?┌──────────�?┌──────────�?     �?components �?�? store   �?�? hooks   �?     └─────┬──────�?└────┬─────�?└────┬─────�?           �?            �?           �?           �?            �?           �?     ┌─────────────────────────────────────�?     �?        config / types / utils      �?(无环依赖底层)
     └─────────────────────────────────────�?```

**依赖规则**�?- `app/` �?`components/`, `store/`, `hooks/`
- `components/` �?`store/`, `types/`, `config/`, `utils/`
- `store/` �?`types/`, `config/`, `utils/fileSystem`
- `hooks/` �?`store/`, `config/ai`, `lib/server`
- `config/`, `types/`, `utils/` �?零业务依赖（纯配�?类型/函数�?
---

## 5. 核心设计模式

### 5.1 模板注册表模�?(Registry Pattern)

**问题**�?套模板需要统一管理和动态切换，避免硬编码条件分支�?
**解决方案**：采用注册表模式，将模板配置（元数据）与渲染组件绑定，通过数组索引查找�?
```typescript
// src/components/templates/registry.ts
export interface TemplateRegistryEntry {
  config: ResumeTemplate;           // 模板元数据（名称、颜色、间距、布局�?  Component: React.FC<{ data: any; template: ResumeTemplate }>; // 渲染组件
}

export const TEMPLATE_REGISTRY: TemplateRegistryEntry[] = [
  { config: classicConfig, Component: ClassicTemplate },
  { config: modernConfig, Component: ModernTemplate },
  { config: leftRightConfig, Component: LeftRightTemplate },
  // ... �?个模�?];

// 查找函数：根据layout ID获取组件
export function getTemplateComponent(
  layout: string
): React.FC<{ data: any; template: ResumeTemplate }> {
  return (
    TEMPLATE_REGISTRY.find((entry) => entry.config.layout === layout)
      ?.Component ?? ClassicTemplate  // 默认降级到经典模�?  );
}
```

**优势**�?- **开放封闭原�?*：添加新模板只需创建目录 + 注册一行，无需修改现有代码
- **类型安全**：`TemplateRegistryEntry` 接口约束配置与组件的一致�?- **统一遍历**：`DEFAULT_TEMPLATES` �?registry 自动派生，保证数据源唯一

### 5.2 状态管理模�?(Zustand + 双轨持久�?

**架构特点**�?
```typescript
// src/store/useResumeStore.ts
export const useResumeStore = create(
  persist<ResumeStore>(
    (set, get) => ({
      resumes: {},                    // 多简历Map
      activeResumeId: null,           // 当前激活ID
      activeResume: null,             // 当前简历引用（计算属性）

      // 核心操作示例
      updateBasicInfo: (data) => {
        const prevResume = get().activeResume;
        set((state) => {
          if (!state.activeResume) return state;
          const updatedResume = {
            ...state.activeResume,
            basic: { ...state.activeResume.basic, ...data },
            updatedAt: new Date().toISOString(),
          };
          return { /* 更新resumes和activeResume */ };
        });
        // 副作用：防抖同步到文件系�?        debouncedSyncToFile(get().activeResume!, prevResume);
      },
    }),
    {
      name: "resume-storage",          // localStorage key
      partialize: (state) => ({        // 只持久化必要字段
        resumes: state.resumes,
        activeResumeId: state.activeResumeId,
      }),
      merge: (persisted, current) => { // 合并策略：保留运行时计算字段
        return {
          ...current,
          ...persisted,
          activeResume: persisted.activeResumeId
            ? persisted.resumes[persisted.activeResumeId]
            : null,
        };
      },
    }
  )
);
```

**双轨持久化机�?*�?1. **localStorage**（即时）：通过 Zustand `persist` 中间件自动序列化
2. **File System API**（可选）：用户授权后同步到指定目录，支持跨设�?
**防抖同步策略**�?```typescript
let syncTimer: ReturnType<typeof setTimeout> | null = null;
const debouncedSyncToFile = (
  resumeData: ResumeData,
  prevResume?: ResumeData
) => {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncResumeToFile(resumeData, prevResume);  // 1.5秒后执行
    syncTimer = null;
  }, 1500);
};
```

### 5.3 AI 多模型适配器模�?(Adapter Pattern)

**问题**�?种AI模型（Gemini、DeepSeek、OpenAI、豆包、小米、Custom）接口各异，需统一抽象�?
**解决方案**：配置驱动适配器，每种模型实现统一�?`AIModelConfig` 接口�?
```typescript
// src/config/ai.ts
export interface AIModelConfig {
  url: (endpoint?: string) => string;           // 动态URL构建
  requiresModelId: boolean;                     // 是否必须提供model ID
  supportsImages: boolean;                      // 是否支持图片输入
  defaultModel?: string;                        // 默认模型�?  headers: (apiKey: string) => Record<string, string>; // 认证头构�?  validate: (context: AIValidationContext) => boolean;  // 配置校验
}

export const AI_MODEL_CONFIGS: Record<AIModelType, AIModelConfig> = {
  gemini: {
    url: (endpoint) => endpoint || "https://generativelanguage.googleapis.com/v1beta",
    headers: (apiKey) => ({ "Content-Type": "application/json", "x-goog-api-key": apiKey }),
    validate: (ctx) => !!(ctx.geminiApiKey && ctx.geminiModelId),
    supportsImages: true,
    requiresModelId: true,
  },
  deepseek: {
    url: (endpoint) => endpoint || "https://api.deepseek.com/v1/chat/completions",
    headers: (apiKey) => ({ "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }),
    validate: (ctx) => !!ctx.deepseekApiKey,
    supportsImages: false,
    defaultModel: "deepseek-chat",
    requiresModelId: true,
  },
  // ... 其他4种模型配�?};
```

**使用流程**�?1. 用户�?`/dashboard/ai` 选择模型并填�?API Key
2. `useAIConfiguration` hook 校验配置有效�?(`validate()`)
3. 调用时动态读�?`AI_MODEL_CONFIGS[modelType]` 构造请�?4. 支持流式响应（SSE）：`/api/polish` 返回 `ReadableStream`

### 5.4 路由组织方式 (File-based Routing)

TanStack Start 采用文件系统路由，结合国际化前缀�?
```
routes/
├── __root.tsx              # 根布局（Providers、全局样式�?├── $locale.tsx             # 语言参数捕获（zh/en�?├── index.tsx               # 首页重定�?├── app/
�?  ├── dashboard.tsx       # /:locale/dashboard
�?  ├── dashboard/
�?  �?  ├── ai.tsx          # /:locale/dashboard/ai
�?  �?  ├── resumes.tsx     # /:locale/dashboard/resumes
�?  �?  ├── settings.tsx    # /:locale/dashboard/settings
�?  �?  └── templates.tsx   # /:locale/dashboard/templates
�?  └── workbench/
�?      └── $id.tsx         # /:locale/workbench/:id
└── api/
    ├── grammar.ts          # POST /api/grammar
    ├── polish.ts           # POST /api/polish (SSE)
    └── proxy/
        └── image.ts        # GET /api/proxy/image?url=...
```

**关键特�?*�?- `$locale` 参数化路由支�?i18n
- 路由�?Layout 嵌套（dashboard layout 包含侧边栏）
- API Routes �?Pages 同构，共享类型定�?
---

## 6. 数据流详�?
### 6.1 用户编辑流程

```
用户输入 �?Editor Panel onChange
    �?dispatch Store action (e.g., updateExperience)
    �?Zustand set() 更新 state
    �?React 重新渲染 (Editor + Preview)
    �?debouncedSyncToFile() [1.5s delay]
    �?localStorage (auto by persist middleware)
File System API (if authorized)
```

**代码示例 - 经验编辑**�?```typescript
// components/editor/experience/ExperiencePanel.tsx (简�?
const handleSave = (data: Experience) => {
  const { updateExperience } = useResumeStore.getState();
  updateExperience(data);  // 触发 Store 更新
};

// store 内部实现
updateExperience: (experience) => {
  const { activeResumeId, resumes } = get();
  const currentResume = resumes[activeResumeId];
  const newExperience = currentResume.experience.find(e => e.id === experience.id)
    ? currentResume.experience.map(e => e.id === experience.id ? experience : e)
    : [...currentResume.experience, experience];
  get().updateResume(activeResumeId, { experience: newExperience });  // 委托给通用更新
},
```

### 6.2 数据持久化流�?
```
┌─────────────────────────────────────────────────────�?�?                 persist middleware                   �?�?                                                     �?�? set() �?partialize() �?JSON.stringify()            �?�?        �?localStorage.setItem('resume-storage')     �?└─────────────────────────────────────────────────────�?
┌─────────────────────────────────────────────────────�?�?             debouncedSyncToFile()                   �?�?                                                     �?�? 1. getFileHandle('syncDirectory')                   �?�? 2. verifyPermission(handle)                         �?�? 3. dirHandle.getFileHandle(`${title}.json`)         �?�? 4. writable.write(JSON.stringify(data, null, 2))    �?�? 5. writable.close()                                 �?└─────────────────────────────────────────────────────�?
冲突解决策略 (shouldImportResumeFromFile):
  - 比较 fileUpdatedAt vs localUpdatedAt
  - 较新者胜�?  - 若时间戳相同，比较文件系�?modifiedAt
```

### 6.3 AI 调用流程

```
用户点击"AI润色" �?AIPolishDialog
    �?读取 useAIConfigStore (selectedModel, apiKey, endpoint)
    �?AI_MODEL_CONFIGS[model].validate(context)  // 校验配置
    �?POST /api/polish (Server Action)
    �?┌─────────────────────────────────────────�?�?        Server Side (api/polish)         �?�?                                        �?�? 1. 根据 modelType 选择适配�?           �?�? 2. 构造请求头 (headers(apiKey))         �?�? 3. 构建 URL (url(endpoint))            �?�? 4. 发起 fetch (stream: true)           �?�? 5. 返回 ReadableStream (SSE)           �?└─────────────────────────────────────────�?    �?客户端消费流式响�?�?逐token显示
```

**服务端代码片�?*�?```typescript
// routes/api/polish.ts (简�?
export async function POST({ request }: ApiRequest) {
  const { text, modelType } = await request.json();
  const config = useAIConfigStore.getState();
  const modelConfig = AI_MODEL_CONFIGS[modelType];

  const response = await fetch(modelConfig.url(config[modelType + 'ApiEndpoint']), {
    method: 'POST',
    headers: modelConfig.headers(config[modelType + 'ApiKey']),
    body: JSON.stringify({
      model: config[modelType + 'ModelId'] || modelConfig.defaultModel,
      messages: [{ role: 'user', content: text }],
      stream: true,
    }),
  });

  return new Response(response.body, {  // 直接透传�?    headers: { 'Content-Type':text/event-stream' },
  });
}
```

### 6.4 PDF 导出流程

```
用户点击"导出PDF" �?PdfExport组件
    �?判断环境:
  ├─ 客户�? html2pdf.js (fromElement)
  �?  1. 选取预览区DOM节点
  �?  2. html2canvas 渲染为Canvas
  �?  3. jsPDF 生成PDF
  �?  4. 触发下载
  �?  └─ 服务�?(SSR): Puppeteer
      1. 启动Chromium实例
      2. 加载HTML模板（注入简历数据）
      3. page.pdf({ format: 'A4' })
      4. 返回Buffer
```

---

## 7. 性能优化策略

### 7.1 代码分割与懒加载

| 策略 | 实现位置 | 效果 |
|------|---------|------|
| **路由级分�?* | TanStack Router 自动按路由拆�?| 首屏仅加载Landing Page |
| **模板懒加�?* | `useTemplateSnapshots` Hook + 动态import | 模板组件按需加载，减少初始bundle |
| **AI组件按需** | AIPolishDialog 使用 `React.lazy` | 未使用AI时不加载相关依赖 |

**Vite 配置优化** ([vite.config.ts](vite.config.ts))�?```typescript
optimizeDeps: {
  include: ['framer-motion', '@tanstack/react-router', 'lucide-react'],  // 预构建常用依�?  exclude: ['pdfjs-dist'],  // 排除大体积库
}
```

### 7.2 防抖节流机制

| 场景 | 实现 | 延迟 |
|------|------|------|
| **文件同步** | `debouncedSyncToFile` | 1500ms |
| **输入保存** | Store action 内部隐式防抖 | 依赖上述同步 |
| **窗口resize** | 预览区自适应 | 16ms (requestAnimationFrame) |
| **AI请求** | 手动触发（按钮点击） | 无防�?|

### 7.3 SSR/CSR 策略

| 页面类型 | 渲染方式 | 原因 |
|---------|---------|------|
| **Landing Page** | SSR (SEO优化) | 公开页面需要搜索引擎收�?|
| **Dashboard** | CSR (客户端交�? | 高度交互，依赖用户登录�?|
| **Workbench** | CSR + Hydration | 编辑器需要即时响�?|
| **API Routes** | SSR (Server-only) | AI调用需要服务端环境变量 |

### 7.4 缓存机制

- **模板快照**：预生成的PNG存储�?`public/template-snapshots/`，通过 manifest 懒加�?- **Zustand persist**：自动缓存到 localStorage，刷新页面不丢失数据
- **Gemini API**：服务端调用，利用HTTP缓存头控�?
---

## 8. 扩展性设�?
### 8.1 添加新模板（3步完成）

```bash
# Step 1: 创建模板目录
mkdir src/components/templates/my-new-template

# Step 2: 定义配置文件 config.ts
# src/components/templates/my-new-template/config.ts
export const myNewTemplateConfig: ResumeTemplate = {
  id: 'my-new-template',
  name: '我的新模�?,
  layout: 'my-new-layout',
  colorScheme: { primary: '#FF6B6B', secondary: '#4ECDC4' },
  spacing: { sectionGap: 20, itemGap: 12, contentPadding: 40 },
  // ...
};

# Step 3: 创建渲染组件 index.tsx
# src/components/templates/my-new-template/index.tsx
export default function MyNewTemplate({ data, template }) {
  return (
    <div className="template-container">
      <BaseInfo data={data.basic} template={template} />
      <EducationSection items={data.education} template={template} />
      {/* 其他sections... */}
    </div>
  );
}
```

最后在 [registry.ts](src/components/templates/registry.ts) 添加一行：
```typescript
{ config: myNewTemplateConfig, Component: MyNewTemplate },
```

**无需修改其他文件**，模板自动出现在选择器和预览中�?
### 8.2 添加新AI模型�?步完成）

```typescript
// Step 1: �?src/config/ai.ts 扩展类型
export type AIModelType = "doubao" | "deepseek" | ... | "my-new-model";

// Step 2: �?AI_MODEL_CONFIGS 添加配置
AI_MODEL_CONFIGS["my-new-model"] = {
  url: (endpoint) => endpoint || "https://api.example.com/v1/chat/completions",
  headers: (apiKey) => ({ Authorization: `Bearer ${apiKey}` }),
  validate: (ctx) => !!ctx.myNewModelApiKey,
  supportsImages: true,
  requiresModelId: true,
};
```

同时�?[useAIConfigStore.ts](src/store/useAIConfigStore.ts) 添加对应的状态字段即可�?
### 8.3 添加新语言�?步完成）

```bash
# Step 1: 创建翻译文件
touch src/i18n/locales/ja.json  # 日语示例

# Step 2: �?src/i18n/config.ts 注册
export const locales = ['zh', 'en', 'ja'] as const;

# Step 3: �?src/config/initialResumeData.ts 添加语言默认�?export const initialResumeStateJa = { basic: { name: '', ... }, ... };
```

系统会自动检�?cookie 中的 `NEXT_LOCALE` 并应用对应翻译�?
---

## 附录：关键文件索�?
| 文件路径 | 职责 | 重要程度 |
|---------|------|---------|
| [src/store/useResumeStore.ts](src/store/useResumeStore.ts) | 核心状态管�?| ⭐⭐�?|
| [src/components/templates/registry.ts](src/components/templates/registry.ts) | 模板注册中心 | ⭐⭐�?|
| [src/config/ai.ts](src/config/ai.ts) | AI模型适配器配�?| ⭐⭐�?|
| [src/types/resume.ts](src/types/resume.ts) | 简历数据类型定�?| ⭐⭐�?|
| [src/utils/export.ts](src/utils/export.ts) | PDF导出逻辑 | ⭐⭐ |
| [src/lib/server/gemini.ts](src/lib/server/gemini.ts) | Gemini服务端封�?| ⭐⭐ |
| [src/hooks/useAIConfiguration.tsx](src/hooks/useAIConfiguration.tsx) | AI配置Hook | ⭐⭐ |
| [vite.config.ts](vite.config.ts) | 构建配置 | �?|
| [tailwind.config.ts](tailwind.config.ts) | 样式系统配置 | �?|

---

*文档版本*: v2.0.5  
*最后更�?: 2026-05-09  
*维护团队*: ��;Resume Core Team
