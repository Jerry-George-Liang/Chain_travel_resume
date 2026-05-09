# ��;Resume 功能模块详解

## 概述

��;Resume 是一个基�?TanStack Start (React 18 + TypeScript + Vite 7) �?AI 驱动简历编辑器，采用模块化架构设计，包�?**5 大核心模�?*：模板系统、状态管理、国际化、AI 功能集成和导出功能。这些模块相互协作，形成完整的数据流�?*用户编辑 �?状态更�?�?模板渲染 �?AI 优化 �?多格式导�?*。每个模块独立封装，通过清晰的接口进行交互，确保系统的可维护性和可扩展性�?
---

## 模块一：模板系�?(Template System)

### 模块概述

模板系统�?��;Resume 的核心展示层，负责将用户数据渲染为不同风格的简历。采�?*注册表模�?(Registry Pattern)** 实现，支�?8 种预设模板，每种模板具有独立的配置和组件实现。系统通过统一的接口规范，使得添加新模板只需 3 个步骤，无需修改现有代码�?
### 核心文件与职�?
| 文件路径 | 职责 |
|---------|------|
| [registry.ts](src/components/templates/registry.ts) | 模板注册表，统一管理所有模板的配置和组件映�?|
| [template.ts](src/types/template.ts) | 模板类型定义，定�?`ResumeTemplate` 接口 |
| `templates/*/config.ts` | 各模板的配置文件（颜色、间距、布局等） |
| `templates/*/index.tsx` | 各模板的 React 组件实现 |
| `templates/*/sections/` | 共享�?Section 组件（BaseInfo、EducationSection 等） |

### 数据结构

```typescript
// src/types/template.ts
export interface ResumeTemplate {
  id: string;                           // 唯一标识�?  name: string;                         // 显示名称
  description: string;                  // 模板描述
  thumbnail: string;                    // 缩略图名�?  layout: string;                       // 布局标识（用于查找组件）
  colorScheme: {
    primary: string;                    // 主色�?    secondary: string;                  // 辅助�?    background: string;                 // 背景�?    text: string;                       // 文字颜色
  };
  spacing: {
    sectionGap: number;                 // 模块间距 (px)
    itemGap: number;                    // 条目间距 (px)
    contentPadding: number;             // 内容边距 (px)
  };
  basic: {
    layout?: "left" | "center" | "right";  // 基本信息布局方式
  };
  availableSections?: string[];         // 可用模块列表
}
```

### 注册表模式实�?
```typescript
// src/components/templates/registry.ts
export interface TemplateRegistryEntry {
  config: ResumeTemplate;
  Component: React.FC<{ data: any; template: ResumeTemplate }>;
}

export const TEMPLATE_REGISTRY: TemplateRegistryEntry[] = [
  { config: classicConfig, Component: ClassicTemplate },
  { config: modernConfig, Component: ModernTemplate },
  { config: leftRightConfig, Component: LeftRightTemplate },
  { config: timelineConfig, Component: TimelineTemplate },
  { config: minimalistConfig, Component: MinimalistTemplate },
  { config: elegantConfig, Component: ElegantTemplate },
  { config: creativeConfig, Component: CreativeTemplate },
  { config: editorialConfig, Component: EditorialTemplate },
];

export function getTemplateComponent(layout: string) {
  return (
    TEMPLATE_REGISTRY.find((entry) => entry.config.layout === layout)?.Component 
    ?? ClassicTemplate  // 默认回退到经典模�?  );
}
```

### 模板列表�?个）

| ID | 名称 | 特点 | 适用场景 |
|----|------|------|----------|
| `classic` | 经典模板 | 传统简约、左对齐布局 | 大多数求职场�?|
| `modern` | 两栏布局 | 现代双栏设计 | 突出个人特色 |
| `left-right` | 左右分栏 | 模块标题背景色鲜�?| 视觉冲击力强 |
| `timeline` | 时间轴布局 | 时间线风格展示经�?| 强调时间顺序 |
| `minimalist` | 极简模板 | 大面积留白、干净纯粹 | 极简主义爱好�?|
| `elegant` | 优雅模板 | 居中标题、高级感分隔�?| 高端职位申请 |
| `creative` | 创意模板 | 视觉错落设计、灵动活�?| 设计/创意岗位 |
| `editorial` | 编辑风模�?| 大号衬线�?窄无衬线 | 奢侈�?时尚行业 |

### 工作原理

```
┌─────────────────────────────────────────────────────────────�?�?                    用户选择模板                              �?└─────────────────────┬───────────────────────────────────────�?                      �?                      �?┌─────────────────────────────────────────────────────────────�?�?             getTemplateComponent(layout)                    �?�?        �?TEMPLATE_REGISTRY 中查找匹配的 Component           �?└─────────────────────┬───────────────────────────────────────�?                      �?                      �?┌─────────────────────────────────────────────────────────────�?�?             <TemplateComponent>                             �?�? ┌──────────┬──────────┬──────────┬──────────�?             �?�? │BaseInfo  │Education │Experience�?Projects �?...          �?�? │Section   �?Section  �?Section  �?Section  �?             �?�? └──────────┴──────────┴──────────┴──────────�?             �?�?        使用 template.colorScheme �?template.spacing        �?└─────────────────────────────────────────────────────────────�?```

### 如何添加新模�?
**Step 1**: 创建目录结构
```
src/components/templates/my-template/
├── config.ts          # 模板配置
├── index.tsx          # 模板组件
└── sections/          # （可选）自定�?Section 组件
```

**Step 2**: 编写配置文件 [config.ts](src/components/templates/classic/config.ts)
```typescript
import { ResumeTemplate } from "@/types/template";

export const myTemplateConfig: ResumeTemplate = {
  id: "my-template",
  name: "我的模板",
  description: "自定义模板描�?,
  thumbnail: "my-template",
  layout: "my-template",
  colorScheme: {
    primary: "#2563eb",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#1e293b",
  },
  spacing: {
    sectionGap: 20,
    itemGap: 14,
    contentPadding: 28,
  },
  basic: {
    layout: "center",
  },
};
```

**Step 3**: 实现模板组件 [index.tsx](src/components/templates/classic/index.tsx)
```typescript
import React from "react";
import { ResumeData } from "@/types/resume";
import { ResumeTemplate } from "@/types/template";
import BaseInfo from "./sections/BaseInfo";
// ... 导入其他 Section 组件

const MyTemplate: React.FC<{ data: ResumeData; template: ResumeTemplate }> = ({
  data,
  template,
}) => {
  return (
    <div style={{ color: template.colorScheme.text }}>
      <BaseInfo data={data} template={template} />
      {/* 渲染其他模块 */}
    </div>
  );
};

export default MyTemplate;
```

**Step 4**: �?[registry.ts](src/components/templates/registry.ts) 中注�?```typescript
import { myTemplateConfig } from "./my-template/config";
import MyTemplate from "./my-template";

// �?TEMPLATE_REGISTRY 数组中添加：
{ config: myTemplateConfig, Component: MyTemplate },
```

**Step 5**: 添加预览图并生成快照清单
```bash
# 将预览图放入 public/template-snapshots/zh/ �?public/template-snapshots/en/
pnpm generate:template-snapshots
```

### 性能优化建议

- **懒加�?*: 对于不常用的模板，可使用 `React.lazy()` + `Suspense` 实现按需加载
- **样式隔离**: 每个 template 使用 CSS Modules �?styled-components 避免样式冲突
- **缓存策略**: 对模板配置使�?`useMemo` 缓存，避免重复计�?
---

## 模块二：状态管�?(State Management)

### 模块概述

状态管理模块是整个应用的数据中心，负责管理所有简历数据的 CRUD 操作、持久化存储以及跨组件状态同步。基�?**Zustand + persist 中间�?* 构建，支�?localStorage 持久化和 File System Access API 双轨同步�?
### 核心文件

| 文件路径 | 职责 |
|---------|------|
| [useResumeStore.ts](src/store/useResumeStore.ts) | �?Store，包含所有状态和方法 |
| [resume.ts](src/types/resume.ts) | 数据类型定义 |

### Store 结构

```typescript
interface ResumeStore {
  // ===== 状�?=====
  resumes: Record<string, ResumeData>;     // 所有简历数据（键值对�?  activeResumeId: string | null;            // 当前激活的简历ID
  activeResume: ResumeData | null;          // 当前简历数据（计算属性）

  // ===== 核心方法 =====
  createResume: (templateId, isBlank?) => string;      // 创建简�?  deleteResume: (resume) => void;                      // 删除简�?  duplicateResume: (resumeId) => string;               // 复制简�?  updateResume: (resumeId, data) => void;              // 更新简�?  setActiveResume: (resumeId) => void;                 // 切换当前简�?  
  // ===== 数据更新方法 =====
  updateBasicInfo: (data) => void;                     // 更新基本信息
  updateEducation: (data) => void;                     // 更新教育经历
  deleteEducation: (id) => void;                       // 删除教育经历
  updateExperience: (data) => void;                    // 更新工作经历
  deleteExperience: (id) => void;                      // 删除工作经历
  updateProjects: (project) => void;                   // 更新项目经历
  updateSkillContent: (content) => void;               // 更新技能内�?  updateSelfEvaluationContent: (content) => void;      // 更新自我评价
  
  // ===== 高级功能 =====
  reorderSections: (newOrder) => void;                 // 重排模块顺序
  toggleSectionVisibility: (sectionId) => void;        // 切换模块显示/隐藏
  addCustomData: (sectionId) => void;                  // 添加自定义模�?  setTemplate: (templateId) => void;                   // 切换模板
  addCertificate: (certificate) => void;               // 添加证书
}
```

### 持久化机�?
#### 1. localStorage 持久化（主要�?
```typescript
export const useResumeStore = create(
  persist<ResumeStore>(
    (set, get) => ({...}),
    {
      name: "resume-storage",                          // localStorage 键名
      partialize: (state) => ({                        // 只持久化必要字段
        resumes: state.resumes,
        activeResumeId: state.activeResumeId,
      }),
      merge: (persistedState, currentState) => {        // 合并策略
        // �?localStorage 恢复时重�?activeResume
        return {
          ...currentState,
          ...persisted,
          activeResume: activeResumeId ? resumes[activeResumeId] : null,
        };
      },
    }
  )
);
```

#### 2. File System API 同步（可选）

```typescript
// 防抖同步�?.5秒内多次编辑只触发一次文件写�?let syncTimer: ReturnType<typeof setTimeout> | null = null;

const debouncedSyncToFile = (resumeData: ResumeData, prevResume?: ResumeData) => {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncResumeToFile(resumeData, prevResume);
    syncTimer = null;
  }, 1500);  // 1.5秒防抖延�?};
```

**特�?*:
- 自动检测文件变更并合并（基�?`updatedAt` 时间戳）
- 支持多设备数据同�?- 权限验证机制确保安全访问

### 数据流示�?
```
用户输入姓名 "张三"
       �?       �?updateBasicInfo({ name: "张三" })
       �?       ├─�?set() 更新 State
       �?      └─�?触发 React 重渲�?       �?              └─�?预览区域实时更新
       �?       └─�?debouncedSyncToFile()
               └─�?1.5秒后写入 localStorage
               └─�?如已授权，同步到 File System
```

### 关键数据结构

```typescript
// src/types/resume.ts
export interface ResumeData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  templateId: string | null;
  
  basic: BasicInfo;                          // 基本信息
  education: Education[];                    // 教育经历（数组）
  experience: Experience[];                  // 工作经历（数组）
  projects: Project[];                       // 项目经历（数组）
  certificates: Certificate[];               // 证书作品（数组）
  customData: Record<string, CustomItem[]>;  // 自定义模�?  
  skillContent: string;                      // 技能内容（Markdown�?  selfEvaluationContent: string;             // 自我评价（Markdown�?  
  menuSections: MenuSection[];               // 模块菜单配置
  globalSettings: GlobalSettings;            // 全局设置（字体、间距等�?}
```

### 最佳实�?
1. **批量更新**: 使用 `updateEducationBatch()` / `updateExperienceBatch()` 替代多次单条更新，减少重渲染次数
2. **防抖处理**: Store 已内置防抖机制，无需在组件层额外处理
3. **错误恢复**: File System 同步失败时自动降级到 localStorage，不影响用户体验
4. **内存优化**: `activeResume` 作为计算属性从 `resumes` 中派生，避免数据冗余

---

## 模块三：国际�?(i18n)

### 模块概述

国际化模块提供完整的多语言支持，基�?**next-intl** 库实现。当前支持中文（简体）和英文两种语言，采�?JSON 翻译文件管理，支持服务端和客户端无缝切换。翻译覆盖所�?UI 文本、提示信息和错误消息�?
### 核心目录结构

```
src/i18n/
├── config.ts              # 语言配置（支持的语言列表、默认语言�?├── locales/
�?  ├── zh.json            # 中文翻译�?76行）
�?  └── en.json            # 英文翻译
├── compat/                # 兼容性适配�?�?  ├── client.tsx         # 客户�?Hook
�?  ├── server.ts          # 服务端工具函�?�?  └── middleware.ts      # 路由中间�?├── request.ts             # 请求配置
├── routing.public.ts      # 路由配置
└── runtime.ts             # 运行时配�?```

### 配置文件

```typescript
// src/i18n/config.ts
export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";

export const localeNames: Record<Locale, string> = {
  zh: "中文",
  en: "English",
};
```

### 翻译文件结构

[zh.json](src/i18n/locales/zh.json) 采用分层命名空间组织�?
```json
{
  "common": {
    "title": "链途resume",
    "dashboard": "仪表�?,
    "edit": "编辑",
    "delete": "删除"
  },
  "home": {
    "hero": {
      "title": "让简历制作变得简单而智�?,
      "cta": "立即体验"
    }
  },
  "dashboard": {
    "sidebar": {
      "resumes": "我的简�?,
      "settings": "通用设置"
    },
    "resumes": {
      "create": "新建简�?,
      "import": "导入简�?
    }
  },
  "workbench": {
    "sidePanel": {
      "layout": { "title": "布局" },
      "theme": { "title": "主题�? }
    },
    "basicPanel": {
      "basicFields": {
        "name": "姓名",
        "email": "邮箱"
      }
    }
  }
}
```

### 使用方式

#### 客户端组�?```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations();
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <button>{t('common.edit')}</button>
    </div>
  );
}
```

#### 命名空间翻译
```tsx
function WorkbenchPanel() {
  const t = useTranslations('workbench.sidePanel');
  return <h2>{t('layout.title')}</h2>;  // 输出: "布局"
}
```

#### 动态插�?```tsx
// 翻译文件: "greeting": "你好，{name}�?
<t value="greeting" values={{ name: "张三" }} />
// 输出: "你好，张三！"
```

### 如何添加新语言（以日文为例�?
**Step 1**: 创建翻译文件
```bash
cp src/i18n/locales/zh.json src/i18n/locales/ja.json
```

**Step 2**: 翻译内容（保持结构一致）

**Step 3**: 更新配置
```typescript
// src/i18n/config.ts
export const locales = ["zh", "en", "ja"] as const;
export const localeNames = {
  zh: "中文",
  en: "English",
  ja: "日本�?,
};
```

**Step 4**: 更新初始数据（如有默认文本）
```typescript
// src/config/initialResumeData.ts
// 根据 locale 加载对应的默认简历数�?```

**Step 5**: 测试验证
- 切换语言后检查所有页面文本是否正确显�?- 验证日期格式、数字格式符合当地习�?- 检�?RTL（从右到左）语言布局（如阿拉伯语�?
### 性能优化

- **按需加载**: next-intl 自动分割翻译文件，只加载当前语言�?- **服务端渲�?*: 翻译在服务端完成，避免客户端闪烁
- **缓存策略**: 翻译文件被浏览器缓存，切换语言时优先使用缓�?
---

## 模块四：AI 功能集成 (AI Integration)

### 模块概述

AI 功能集成模块�?��;Resume 提供智能化的简历优化能力，包括 **AI 润色**�?*语法检�?* �?**PDF 导入识别** 三大功能。采�?*多模型适配架构**，支�?6 种主�?AI 服务商（Gemini、DeepSeek、OpenAI、豆包、小米、自定义），通过统一的配置接口屏蔽底层差异。所�?AI 调用均采�?**SSE 流式响应**，提升用户体验�?
### 核心文件

| 文件路径 | 职责 |
|---------|------|
| [ai.ts](src/config/ai.ts) | AI 模型配置定义和工厂方�?|
| [polish.ts](src/routes/api/polish.ts) | AI 润色 API 路由（服务端�?|
| [grammar.ts](src/routes/api/grammar.ts) | 语法检�?API 路由 |
| [gemini.ts](src/lib/server/gemini.ts) | Gemini SDK 封装 |
| [useAIConfiguration.tsx](src/hooks/useAIConfiguration.tsx) | AI 配置管理 Hook |
| [useAIConfigStore.ts](src/store/useAIConfigStore.ts) | AI 配置状态管�?|

### 支持�?AI 模型

| 模型 | 类型标识 | 默认端点 | 默认模型 | 图片支持 | 特色功能 |
|------|---------|---------|---------|---------|---------|
| Google Gemini | `gemini` | generativelanguage.googleapis.com | gemini-flash-latest | �?| 推荐用于润色、语法检查、PDF导入 |
| DeepSeek | `deepseek` | api.deepseek.com | deepseek-chat | �?| 性价比高 |
| OpenAI | `openai` | (自定�? | (自定�? | �?| 生态丰�?|
| 豆包 (Volcengine) | `doubao` | ark.cn-beijing.volces.com | (自定�? | �?| 国内访问稳定 |
| 小米 (Xiaomi) | `xiaomi` | api.xiaomimimo.com | mimo-v2-omni | �?| 多模态能力强 |
| 自定�?| `custom` | (自定�? | (自定�? | �?| 支持 GLM/Kimi/Ollama �?|

### 模型配置接口

```typescript
// src/config/ai.ts
export interface AIModelConfig {
  url: (endpoint?: string) => string;                    // 构建API URL
  requiresModelId: boolean;                               // 是否需要指定模型ID
  supportsImages: boolean;                                // 是否支持图片输入
  defaultModel?: string;                                  // 默认模型名称
  headers: (apiKey: string) => Record<string, string>;    // 请求头构造器
  validate: (context: AIValidationContext) => boolean;     // 配置完整性校�?}

export interface AIValidationContext {
  doubaoApiKey?: string;
  doubaoModelId?: string;
  deepseekApiKey?: string;
  openaiApiKey?: string;
  geminiApiKey?: string;
  xiaomiApiKey?: string;
  customApiKey?: string;
  // ... 其他字段
}
```

### 用户配置流程

```
Dashboard �?Settings �?AI Configuration
    �?    ├─�?选择 AI 提供商（下拉框）
    ├─�?输入 API Key（密码框�?    ├─�?选择/输入模型 ID（根�?requiresModelId 动态显示）
    ├─�?(可�? 自定�?API Endpoint
    ├─�?点击「测试连接」按�?    �?      └─�?调用 validate() 校验配置完整�?    �?      └─�?发送测试请求验证连通�?    └─�?点击「保存�?            └─�?存储�?useAIConfigStore (localStorage)
```

### Prompt 工程要点

#### 1. 通用润色 Prompt（适用于大多数内容�?
```
你是一个专业的简历优化助手。请帮助优化以下 Markdown 格式的文�?..

优化原则�?1. 使用更专业的词汇和表达方�?2. 突出关键成就和技�?3. 保持简洁清�?4. 保持原有 Markdown 格式结构

输出强约束：
1. 只能输出润色后的正文内容本身
2. 禁止输出任何前言、说明、总结
3. 禁止出现引导语（�?以下�?.."�?4. 不要使用 Markdown 代码块包裹结�?```

#### 2. 技能优�?Prompt（检测到 Skills 内容时自动启用）

```
分类维度�?- 前端框架 / TypeScript / 状态管�?/ UI组件�?- 工程化工�?/ 网络通信 / 样式布局 / 版本控制

每条技能要求：
- 体现熟练程度（精�?熟悉/了解�? 具体应用场景
- 突出工程化能力和实践深度
- 字数约束�?50字以�?```

#### 3. 项目经历 Prompt（检测到 Project/Experience 内容时启用）

```
STAR法则结构�?第一行：技术栈：React + TypeScript + Node.js
第二行：项目背景：面向企业级客户�?SaaS 平台重构
后续：核心职责与成果�?-6条）

每条要求�?1. 动词开头（主导/设计/优化/实现�?2. 包含关键技术或方法
3. 必须附带量化成果（提�?0%、降�?7%�?4. 字数控制�?0-50�?�?```

#### 4. 语法检�?Prompt

```
任务：仅检测错别字和标点错�?规则�?- 忽略中英文标点混用（技术文档常见）
- 输出JSON格式的错误列�?- 包含原文位置、错误类型、修改建�?```

### 流式响应处理

```typescript
// 服务端：SSE (Server-Sent Events)
export const Route = createFileRoute("/api/polish")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // ... 参数解析和模型选择
        
        if (modelType === "gemini") {
          // Gemini 原生流式支持
          const stream = new ReadableStream({
            async start(controller) {
              const result = await modelInstance.generateContentStream(content);
              for await (const chunk of result.stream) {
                controller.enqueue(encoder.encode(chunk.text()));
              }
              controller.close();
            },
          });
          return new Response(stream, {
            headers: { "Content-Type": "text/event-stream" }
          });
        }

        // OpenAI 兼容格式：解�?SSE data �?        const response = await fetch(modelConfig.url(apiEndpoint), {
          method: "POST",
          headers: modelConfig.headers(apiKey),
          body: JSON.stringify({ model, messages, stream: true }),
        });

        const stream = new ReadableStream({
          async start(controller) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              // 解析 "data: {...}" 格式
              const lines = decoder.decode(value).split("\n");
              for (const line of lines) {
                if (line.startsWith("data:")) {
                  const payload = JSON.parse(line.slice(5));
                  const delta = payload.choices?.[0]?.delta?.content;
                  if (delta) controller.enqueue(encoder.encode(delta));
                }
              }
            }
            controller.close();
          },
        });

        return new Response(stream, {
          headers: { "Content-Type": "text/event-stream" }
        });
      }
    }
  }
});
```

**客户端消费示�?*:
```typescript
const response = await fetch("/api/polish", {
  method: "POST",
  body: JSON.stringify({ apiKey, model, content, modelType }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const text = decoder.decode(value);
  setPolishedContent(prev => prev + text);  // 实时追加显示
}
```

### 扩展指南：添加新�?AI 提供�?
**Step 1**: �?[ai.ts](src/config/ai.ts) 中添加配�?```typescript
export type AIModelType = "doubao" | "deepseek" | /* ..., */ "my-provider";

export const AI_MODEL_CONFIGS: Record<AIModelType, AIModelConfig> = {
  // ... 现有配置
  "my-provider": {
    url: (endpoint) => endpoint || "https://api.my-provider.com/v1/chat",
    requiresModelId: true,
    supportsImages: false,
    headers: (apiKey) => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }),
    validate: (ctx) => !!ctx.myProviderApiKey && !!ctx.myProviderModelId,
  },
};
```

**Step 2**: 扩展 AIValidationContext 接口
```typescript
export interface AIValidationContext {
  // ... 现有字段
  myProviderApiKey?: string;
  myProviderModelId?: string;
  myProviderApiEndpoint?: string;
}
```

**Step 3**: �?UI 中添加选项（Settings 页面会自动读取配置列表）

---

## 模块五：导出功能 (Export)

### 模块概述

导出功能模块负责将编辑好的简历转换为多种格式供用户下载或打印。支�?**PDF 导出**（高精度渲染）�?*浏览器打�?*（备用方案）�?*JSON 导出**（数据备份）�?**Markdown 导出**（文本复用）四种方式。PDF 导出采用**前后端协作模�?*：前端负�?DOM 克隆和样式优化，后端使用 Puppeteer 进行高质量渲染�?
### 核心文件

| 文件路径 | 职责 |
|---------|------|
| [export.ts](src/utils/export.ts) | 导出逻辑主入口（PDF/JSON/Markdown�?|
| [print.ts](src/utils/print.ts) | 浏览器原生打印功�?|
| [imageUtils.ts](src/utils/imageUtils.ts) | 图片处理工具（转 Base64�?|
| [PdfExport.tsx](src/components/shared/PdfExport.tsx) | PDF 导出 UI 组件 |
| [useAutoOnePage.ts](src/hooks/useAutoOnePage.ts) | 自动一页纸算法 |
| [markdown.ts](src/utils/markdown.ts) | Markdown 生成�?|

### 导出方式对比

| 方式 | 技术栈 | 质量 | 用�?| 推荐场景 |
|------|--------|------|------|----------|
| **PDF 导出** | Puppeteer (后端) | ⭐⭐⭐⭐�?| 正式投�?| 发送给 HR、存�?|
| **浏览器打�?* | iframe + window.print() | ⭐⭐⭐⭐ | 备用方案 | 后端繁忙时、需手动调边�?|
| **JSON 导出** | JSON.stringify | N/A | 数据备份 | 换设备恢复、版本控�?|
| **Markdown 导出** | 自定义转换器 | N/A | 文本复用 | 粘贴到大模型、其他编辑器 |

### PDF 导出流程

```
┌─────────────────────────────────────────────────────────────�?�? 1. 用户点击「导�?PDF�?                                     �?└─────────────────────┬───────────────────────────────────────�?                      �?                      �?┌─────────────────────────────────────────────────────────────�?�? 2. exportToPDF()                                            �?�?    ├─�?查找目标 DOM 元素 (#resume-preview)                  �?�?    ├─�?cloneNode(true) 深度克隆                             �?�?    └─�?处理缩放转换 (transform �?zoom)                      �?└─────────────────────┬───────────────────────────────────────�?                      �?                      �?┌─────────────────────────────────────────────────────────────�?�? 3. 样式优化                                                  �?�?    ├─�?getOptimizedStyles()                                �?�?    �?   ├─�?过滤 @font-face、@import、animation �?         �?�?    �?   ├─�?去重 CSS 规则                                   �?�?    �?   └─�?注入白背景强制样�?                             �?�?    └─�?optimizeImages()                                    �?�?         └─�?将外部图片转�?Base64 内嵌                       �?└─────────────────────┬───────────────────────────────────────�?                      �?                      �?┌─────────────────────────────────────────────────────────────�?�? 4. 发送到后端渲染服务                                        �?�?    POST /api/pdf-export                                    �?�?    Body: { content: HTML, styles: CSS, margin: number }    �?└─────────────────────┬───────────────────────────────────────�?                      �?                      �?┌─────────────────────────────────────────────────────────────�?�? 5. 后端 Puppeteer 渲染                                      �?�?    ├─�?创建浏览器实�?                                      �?�?    ├─�?设置 HTML 内容和样�?                                �?�?    ├─�?等待字体和图片加载完�?                              �?�?    ├─�?生成 PDF (A4, 高质�?                               �?�?    └─�?返回 Blob �?                                       �?└─────────────────────┬───────────────────────────────────────�?                      �?                      �?┌─────────────────────────────────────────────────────────────�?�? 6. 客户端下�?                                              �?�?    downloadBlob(blob, `${title}.pdf`)                       �?└─────────────────────────────────────────────────────────────�?```

### 核心代码实现

#### PDF 导出 ([export.ts](src/utils/export.ts))

```typescript
export const exportToPdf = async ({
  elementId,
  title,
  pagePadding,
  fontFamily,
}: ExportToPdfOptions) => {
  // 1. 获取并克�?DOM
  const pdfElement = document.querySelector<HTMLElement>(`#${elementId}`);
  const clonedElement = pdfElement.cloneNode(true) as HTMLElement;
  
  // 2. 处理缩放：将 transform 转为 zoom（避免分页偏差）
  const scaleMatch = clonedElement.style.transform.match(/scale\(([\d.]+)\)/);
  if (scaleMatch) {
    clonedElement.style.setProperty("zoom", String(scaleMatch[1]));
  }
  
  // 3. 强制样式
  clonedElement.style.setProperty("width", "100%", "important");
  clonedElement.style.setProperty("padding", "0", "important");
  clonedElement.style.setProperty("font-family", normalizeFontFamily(fontFamily), "important");
  
  // 4. 隐藏分页�?  clonedElement.querySelectorAll(".page-break-line").forEach(
    line => (line.style.display = "none")
  );
  
  // 5. 并行处理样式和图�?  const [capturedStyles] = await Promise.all([
    getOptimizedStyles(),
    optimizeImages(clonedElement)
  ]);
  
  // 6. 发送到后端
  const response = await fetch(PDF_EXPORT_CONFIG.SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: clonedElement.outerHTML,
      styles: capturedStyles,
      margin: pagePadding,
    }),
  });
  
  // 7. 下载文件
  const blob = await response.blob();
  downloadBlob(blob, `${getSafeFileName(title)}.pdf`);
};
```

#### 浏览器打�?([print.ts](src/utils/print.ts))

```typescript
export const exportResumeToBrowserPrint = async (
  resumeContent: HTMLElement,
  pagePadding: number,
  fontFamily?: string
) => {
  // 1. 创建隐藏 iframe
  const printFrame = document.createElement("iframe");
  printFrame.style.cssText = `
    position: absolute; width: 1px; height: 1px;
    left: -9999px; visibility: hidden;
  `;
  document.body.appendChild(printFrame);
  
  // 2. 构建打印专用 HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page { size: A4; margin: 0; }
          body { font-family: ${fontFamily}; background: white !important; }
          #print-content { width: 210mm; margin: 0 auto; }
        </style>
      </head>
      <body>
        <div id="print-content">${clonedContent.outerHTML}</div>
      </body>
    </html>
  `;
  
  // 3. 写入 iframe 并等待资源加�?  printFrame.contentWindow.document.write(htmlContent);
  await printFrame.contentWindow.document.fonts.ready;
  await waitForImages(printFrame.contentWindow.document.images);
  
  // 4. 触发打印对话�?  printFrame.contentWindow.print();
  
  // 5. 清理 iframe（延�?秒）
  setTimeout(() => document.body.removeChild(printFrame), 1000);
};
```

### 自动一页纸功能 (Auto One Page)

当用户开启此功能时，系统会自动调整内容以适应单页 A4 纸：

```typescript
// src/hooks/useAutoOnePage.ts
const MM_TO_PX = 3.78;           // 1mm = 3.78px (96dpi)
const A4_HEIGHT_PX = 297 * MM_TO_PX;  // A4高度 = 1122.66px
const MIN_SCALE = 0.9;           // 最小缩放比例（保证可读性）

export function useAutoOnePage({ contentHeight, pagePadding, enabled }) {
  return useMemo(() => {
    if (!enabled || contentHeight <= 0) {
      return { scaleFactor: 1, isScaled: false, cannotFit: false };
    }
    
    const availableHeight = A4_HEIGHT_PX - 2 * pagePadding;
    const actualContentHeight = contentHeight - 2 * pagePadding;
    
    if (actualContentHeight <= availableHeight) {
      return { scaleFactor: 1, isScaled: false };  // 无需缩放
    }
    
    const idealScale = availableHeight / actualContentHeight;
    
    if (idealScale >= MIN_SCALE) {
      return { scaleFactor: idealScale, isScaled: true };  // 正常缩放
    }
    
    return { scaleFactor: MIN_SCALE, isScaled: true, cannotFit: true };  // 达到下限
  }, [contentHeight, pagePadding, enabled]);
}
```

**使用方式**:
```tsx
const { scaleFactor, cannotFit } = useAutoOnePage({
  contentHeight: ref.current.offsetHeight,
  pagePadding: globalSettings.pagePadding,
  enabled: globalSettings.autoOnePage,
});

<div style={{ transform: `scale(${scaleFactor})` }}>
  <ResumePreview />
</div>

{cannotFit && (
  <WarningBanner>内容较多，已尽量压缩但无法完美一�?/WarningBanner>
)}
```

### 导出质量优化策略

| 优化�?| 实现方式 | 效果 |
|--------|----------|------|
| **高分辨率** | 后端渲染使用 2x DPI | 文字清晰锐利 |
| **字体嵌入** | 注入 @font-face CSS | 跨平台一致�?|
| **图片优化** | �?Base64 内嵌 | 避免外部依赖 |
| **样式过滤** | 移除 animation/hover/font | 减少无效样式 |
| **白背景强�?* | `background: white !important` | 避免透明问题 |
| **分页控制** | 隐藏 `.page-break-line` | 避免截断痕迹 |
| **缩放转换** | transform �?zoom | 分页计算更准�?|

### 扩展指南：添加新的导出格�?
**示例：导出为 Word (.docx)**

```typescript
// src/utils/exportDocx.ts
import { Document, Packer, Paragraph, TextRun } from "docx";

export async function exportToDocx(resume: ResumeData) {
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          children: [new TextRun({ text: resume.basic.name, bold: true, size: 32 })],
        }),
        // ... 其他内容
      ],
    }],
  });
  
  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `${resume.title}.docx`);
}
```

然后�?[PdfExport.tsx](src/components/shared/PdfExport.tsx) 中添加按钮即可�?
---

## 模块间交�?
### 协作关系�?
```
┌──────────────�?    ┌──────────────�?    ┌──────────────�?�?  模板系统    │◄────�? 状态管�?   │────►│   导出功能    �?�? (渲染�?    �?    �? (数据中心)  �?    �? (输出�?    �?└──────┬───────�?    └──────┬───────�?    └──────┬───────�?       �?                   �?                   �?       �? 读取 ResumeData    �? 持久化数�?        �? 读取 DOM
       �? + Template Config �? (localStorage)    �? 生成文件
       �?                   �?                   �?       �?                   �?                   �?┌──────────────�?    ┌──────────────�?    ┌──────────────�?�?  国际�?    �?    �? AI 功能    �?    �? 文件系统    �?�? (i18n)      �?    �? (智能�?   �?    �? (同步�?   �?└──────────────�?    └──────────────�?    └──────────────�?```

### 典型交互场景

**场景 1: 用户编辑 �?AI 润色 �?更新预览**
```
1. 用户�?Editor 输入工作经历
2. Editor 调用 store.updateExperience(data)
3. Store 更新状�?�?触发 Template 重渲�?4. 用户点击「AI 润色」按�?5. 前端发送请求到 /api/polish（携�?content + apiKey + model�?6. 后端调用 AI 模型 API，返�?SSE �?7. 前端实时显示润色结果
8. 用户点击「应用」→ store.updateExperience(polishedContent)
9. Template 再次重渲染，显示优化后的内容
```

**场景 2: 切换模板 �?全局设置联动**
```
1. 用户�?TemplateSelector 选择「现代模板�?2. 调用 store.setTemplate("modern")
3. Store 自动更新:
   - templateId = "modern"
   - globalSettings.themeColor = modernConfig.colorScheme.primary
   - globalSettings.sectionSpacing = modernConfig.spacing.sectionGap
   - basic.layout = modernConfig.basic.layout
4. TemplateContext.Provider 提供新的 template 对象
5. 所�?Section 组件读取新配置并重新渲染
6. 预览区域即时反映变化
```

**场景 3: 导出 PDF 完整链路**
```
1. 用户点击「导�?PDF�?2. PdfExport 组件调用 exportToPDF()
3. 导出模块:
   a. �?store.activeResume 获取最新数据（已通过 Template 渲染�?DOM�?   b. 克隆 DOM 元素
   c. 优化样式（过滤、去重、注入字体）
   d. 转换图片�?Base64
4. 发�?HTML + CSS 到后端渲染服�?5. 后端 Puppeteer 生成高清 PDF
6. 客户端下载文�?7. toast.success("PDF导出成功")
```

---

## 快速参考表

### 核心 API 索引

#### 状态管�?(useResumeStore)

| 方法�?| 参数 | 返回�?| 说明 |
|--------|------|--------|------|
| `createResume(templateId?, isBlank?)` | 模板ID, 是否空白 | string (新简历ID) | 创建新简�?|
| `deleteResume(resume)` | ResumeData | void | 删除简历及文件 |
| `duplicateResume(resumeId)` | 简历ID | string (新ID) | 复制简�?|
| `updateBasicInfo(data)` | Partial\<BasicInfo\> | void | 更新基本信息 |
| `updateEducation(data)` | Education | void | 新增/更新教育经历 |
| `deleteEducation(id)` | string | void | 删除教育经历 |
| `updateExperience(data)` | Experience | void | 新增/更新工作经历 |
| `setTemplate(templateId)` | string | void | 切换模板（联动全局设置�?|
| `reorderSections(newOrder)` | MenuSection[] | void | 重排模块顺序 |
| `toggleSectionVisibility(sectionId)` | string | void | 切换模块显隐 |

#### 模板系统 (Template Registry)

| 方法/属�?| 类型 | 说明 |
|-----------|------|------|
| `TEMPLATE_REGISTRY` | TemplateRegistryEntry[] | 所有模板注册表 |
| `DEFAULT_TEMPLATES` | ResumeTemplate[] | 模板配置列表 |
| `getTemplateComponent(layout)` | Function | 根据layout获取组件 |

#### 导出功能 (Export Utils)

| 方法�?| 参数 | 返回�?| 说明 |
|--------|------|--------|------|
| `exportToPdf(options)` | ExportToPdfOptions | Promise\<void\> | 导出PDF（后端渲染） |
| `exportResumeToBrowserPrint(el, padding, font)` | HTMLElement, number, string? | Promise\<void\> | 浏览器打�?|
| `exportResumeAsJson(options)` | ExportResumeFileOptions | void | 导出JSON |
| `exportResumeAsMarkdown(options)` | ExportResumeMarkdownOptions | void | 导出Markdown |

#### AI 功能 (AI Integration)

| 端点 | 方法 | 参数 | 说明 |
|------|------|------|------|
| `/api/polish` | POST | { apiKey, model, content, modelType, apiEndpoint? } | AI润色（SSE流） |
| `/api/grammar` | POST | { apiKey, model, content, modelType } | 语法检�?|

#### 国际�?(i18n)

| Hook/方法 | 返回�?| 说明 |
|-----------|--------|------|
| `useTranslations()` | TranslationFunction | 获取翻译函数 |
| `useTranslations('namespace')` | NamespacedTranslationFunction | 命名空间翻译 |
| `locales` | ["zh", "en"] | 支持的语言列表 |
| `defaultLocale` | "zh" | 默认语言 |

### 配置文件索引

| 文件路径 | 内容 | 使用场景 |
|---------|------|----------|
| [config/constants.ts](src/config/constants.ts) | 全局常量（主题色、默认值等�?| 全局引用 |
| [config/initialResumeData.ts](src/config/initialResumeData.ts) | 初始简历数据（�?英） | 创建简历时 |
| [config/ai.ts](src/config/ai.ts) | AI模型配置工厂 | AI功能调用 |
| [config/modules.ts](src/config/modules.ts) | 模块元信�?| Dashboard展示 |

### 常见问题与解决方�?
| 问题 | 原因 | 解决方案 |
|------|------|----------|
| PDF导出样式错乱 | 外部CSS未注�?| 检�?`getOptimizedStyles()` 是否过滤了必要样�?|
| AI润色无响�?| API Key未配置或无效 | 前往 Settings �?AI Configuration 检查配�?|
| 切换语言后部分文本未翻译 | 翻译key缺失 | �?`zh.json` / `en.json` 中补充对应key |
| 模板切换后布局异常 | globalSettings未正确联�?| 检�?`setTemplate()` 方法是否完整执行 |
| localStorage数据丢失 | 浏览器清除缓�?| 启用 File System 同步作为备份 |
| 打印预览空白 | 字体未加�?| 确保 `document.fonts.ready` 完成后再调用 `print()` |
| 自动一页纸效果不明�?| 内容未超出一�?| 检�?`autoOnePage` 开关是否开�?|

---

## 总结

��;Resume �?5 大核心模块构成了一个完整的简历编辑生态系统：

- **模板系统** 通过注册表模式实现了高度可扩展的渲染层，新增模板只需 3 �?- **状态管�?* 基于 Zustand + 双轨持久化，兼顾性能和数据安�?- **国际�?* 采用 next-intl 实现 seamless 多语言切换，支持动态插�?- **AI 功能** 通过多模型适配架构支持 6 种主�?AI 服务，Prompt 工程针对不同内容类型优化
- **导出功能** 采用前后端协作的高精度渲染方案，支持 4 种导出格式满足不同场�?
模块间通过清晰的数据流和事件机制协作，确保了系统的**可维护�?*�?*可扩展�?*�?*用户体验的一致�?*�?