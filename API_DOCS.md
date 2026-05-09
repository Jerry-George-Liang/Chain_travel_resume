# ��;Resume API 接口规范文档

> **版本**: v1.0.0
> **更新日期**: 2026-05-09
> **基础路径**: `/api`
> **协议**: HTTP/HTTPS

---

## 目录

- [1. 概述](#1-概述)
- [2. 接口列表](#2-接口列表)
- [3. 接口详细说明](#3-接口详细说明)
  - [3.1 POST /api/polish - AI 简历润色](#31-post-apipolish---ai-简历润�?
  - [3.2 POST /api/grammar - 语法检查](#32-post-apigrammar---语法检�?
  - [3.3 POST /api/resume-import - 简历导入](#33-post-apiresume-import---简历导�?
  - [3.4 GET/POST /api/proxy/image - 图片代理](#34-getpost-apiproxyimage---图片代理)
- [4. 通用说明](#4-通用说明)
- [5. AI 模型配置参考](#5-ai-模型配置参�?
- [6. Prompt 工程要点](#6-prompt-工程要点)
- [7. 流式响应处理示例](#7-流式响应处理示例)
- [8. 常见问题排查](#8-常见问题排查)
- [9. 更新日志](#9-更新日志)

---

## 1. 概述

### 1.1 设计原则

��;Resume API 遵循以下设计原则�?
- **RESTful 风格**: 使用标准 HTTP 方法（GET、POST）表达语�?- **文件系统路由**: 基于 TanStack Start 的文件系统路由实现，路由与文件结构一一对应
- **JSON 优先**: 请求和响应默认使�?JSON 格式，特殊情况使用流式传�?- **错误统一**: 所有错误响应遵循统一�?JSON 格式
- **流式支持**: AI 相关接口支持 SSE (Server-Sent Events) 流式响应

### 1.2 认证方式

当前版本采用 **API Key 认证**方式�?
- 用户在前端配置各 AI 服务商的 API Key
- API Key 通过请求体（Request Body）传递，**不在 URL 中暴�?*
- 服务端将 API Key 转发至对应的 AI 服务商，**不存储或记录**

### 1.3 基础信息

| 项目 | 说明 |
|------|------|
| 基础URL | `/api` |
| 数据格式 | JSON (application/json) |
| 字符编码 | UTF-8 |
| 时间格式 | ISO 8601 (YYYY-MM-DDTHH:mm:ssZ) |
| 流式格式 | SSE (text/event-stream) |

---

## 2. 接口列表

| 接口 | 方法 | 功能描述 | 认证 | 响应类型 |
|------|------|----------|------|----------|
| `/api/polish` | POST | AI 简历润色优�?| API Key | SSE 流式 |
| `/api/grammar` | POST | AI 语法检�?| API Key | JSON |
| `/api/resume-import` | POST | 简历导入解�?| API Key | JSON |
| `/api/proxy/image` | GET/POST | 图片代理服务 | �?| 二进制流 |

---

## 3. 接口详细说明

### 3.1 POST /api/polish - AI 简历润�?
**功能描述**: 使用 AI 模型优化简历内容（工作经历、技能、项目经验等），支持流式响应�?
**文件位置**: [polish.ts](src/routes/api/polish.ts)

#### 请求参数

| 参数�?| 类型 | 必填 | 说明 |
|--------|------|------|------|
| `apiKey` | string | �?| AI 服务商的 API 密钥 |
| `model` | string | �?| 模型名称（如 `gemini-flash-latest`、`deepseek-chat`�?|
| `content` | string | �?| 待优化的 Markdown 格式文本内容 |
| `modelType` | enum | �?| 模型类型：`"doubao"` \| `"deepseek"` \| `"openai"` \| `"gemini"` \| `"xiaomi"` \| `"custom"` |
| `apiEndpoint` | string | �?| 自定�?API 端点（仅 custom 类型必须提供�?|
| `customInstructions` | string | �?| 用户自定义指令，会追加到系统 Prompt �?|

#### 请求示例

**cURL 示例:**

```bash
curl -X POST http://localhost:3000/api/polish \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your-api-key",
    "model": "gemini-flash-latest",
    "modelType": "gemini",
    "content": "## 工作经历\n\n### 高级前端工程�?@ ABC公司 (2020-2023)\n负责React项目开�?,
    "customInstructions": "请突出TypeScript相关经验"
  }'
```

**JavaScript/TypeScript 示例:**

```typescript
async function polishResume(content: string, options: {
  apiKey: string;
  model: string;
  modelType: AIModelType;
  apiEndpoint?: string;
  customInstructions?: string;
}) {
  const response = await fetch('/api/polish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: options.apiKey,
      model: options.model,
      content,
      modelType: options.modelType,
      apiEndpoint: options.apiEndpoint,
      customInstructions: options.customInstructions,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Polish request failed');
  }

  return response.body; // ReadableStream
}
```

#### 响应格式

**成功响应 (SSE �?:**

```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

data: {"choices":[{"delta":{"content":"技术栈"}}]}

data: {"choices":[{"delta":{"content":"�?}}]}

data: {"choices":[{"delta":{"content":" React + TypeScript + Node.js"}}]}

...

data: [DONE]
```

**错误响应:**

```json
{
  "error": {
    "message": "Invalid model type",
    "code": "INVALID_MODEL_TYPE"
  }
}
```

#### HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功，返�?SSE �?|
| 400 | 参数错误（无效的 modelType 或缺少必要参数） |
| 500 | 服务器内部错�?|
| 502 | 上游 AI 服务错误（返回上游原始状态码�?|

#### 特殊逻辑

1. **智能 Prompt 选择**: 根据内容关键词自动选择系统 Prompt�?   - 包含「专业技能」「Skills」等 �?技能分类优�?Prompt（精简・分类清晰风格）
   - 包含「工作经历」「项目经验」等 �?STAR 法则优化 Prompt（量化成果导向）
   - 其他内容 �?通用优化 Prompt

2. **自定义指�?*: 如果提供�?`customInstructions`，会追加到系�?Prompt 末尾

3. **模型差异化处�?*:
   - Gemini 模型：使用专�?Google Generative AI SDK，直接返回文本流
   - 其他模型：使�?OpenAI 兼容 API 格式，解�?SSE 数据后透传

#### 注意事项

- ⚠️ API Key 在请求体中传递，请确保使�?HTTPS
- ⚠️ 流式响应需要客户端正确处理 ReadableStream
- 💡 建议对长内容分段请求，避免超�?- 💡 `customInstructions` 可用于个性化优化需�?
---

### 3.2 POST /api/grammar - 语法检�?
**功能描述**: 使用 AI 检测简历中的错别字和标点符号错误，返回结构化的错误列表�?
**文件位置**: [grammar.ts](src/routes/api/grammar.ts)

#### 请求参数

| 参数�?| 类型 | 必填 | 说明 |
|--------|------|------|------|
| `apiKey` | string | �?| AI 服务商的 API 密钥 |
| `model` | string | �?| 模型名称 |
| `content` | string | �?| 待检查的文本内容 |
| `modelType` | enum | �?| 模型类型（同 polish 接口�?|
| `apiEndpoint` | string | �?| 自定�?API 端点 |

#### 请求示例

**cURL 示例:**

```bash
curl -X POST http://localhost:3000/api/grammar \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your-api-key",
    "model": "gemini-flash-latest",
    "modelType": "gemini",
    "content": "我是一名高级前经工程师,负责React项目开�?
  }'
```

**JavaScript/TypeScript 示例:**

```typescript
interface GrammarError {
  context: string;    // 包含错误的完整句�?  text: string;       // 具体的错误部�?  suggestion: string; // 修正后的词汇
  reason: string;     // 错误原因
  type: string;       // 错误类型: "spelling"
}

async function checkGrammar(content: string, config: AIConfig) {
  const response = await fetch('/api/grammar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: config.apiKey,
      model: config.model,
      content,
      modelType: config.modelType,
      apiEndpoint: config.apiEndpoint,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Grammar check failed');
  }

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);
  return result.errors as GrammarError[];
}
```

#### 响应格式

**成功响应:**

```json
{
  "choices": [
    {
      "message": {
        "content": "{\"errors\":[{\"context\":\"我是一名高级前经工程师,负责React项目开发\",\"text\":\"前经\",\"suggestion\":\"前端\",\"reason\":\"错别字\",\"type\":\"spelling\"}]}"
      }
    }
  ]
}
```

**错误详情结构 (content 字段内的 JSON):**

```json
{
  "errors": [
    {
      "context": "包含错误的完整句子（原文�?,
      "text": "具体的错误部分（原文中实际存在的字符串）",
      "suggestion": "仅包含修正后的词汇或片段",
      "reason": "错别�?/ 标点错误",
      "type": "spelling"
    }
  ]
}
```

**错误响应:**

```json
{
  "error": {
    "message": "Upstream API error: 401 Unauthorized",
    "code": "INVALID_API_KEY"
  }
}
```

#### HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功，返回检查结�?|
| 400 | 参数错误 |
| 500 | 服务器内部错�?|
| 502 | 上游 AI 服务错误 |

#### 特殊逻辑

1. **Gemini 特殊配置**:
   - 强制设置 `responseMimeType: "application/json"` 确保输出为有�?JSON
   - 设置 `temperature: 0` 保证结果一致�?
2. **严格的系�?Prompt**:
   - 仅检测错别字和严重标点错误（如重复标点）
   - 明确禁止润色、改写建�?   - 忽略中英文标点混用（技术文档常见用法）
   - 忽略空格问题

3. **OpenAI 兼容模式**: 使用 `response_format: { type: "json_object" }` 强制 JSON 输出

#### 注意事项

- ⚠️ 此接口不进行流式响应，等待完整结果返�?- ⚠️ 返回�?`content` 字段�?JSON 字符串，需要二次解�?- 💡 建议在用户保存或导出时调用，而非实时检�?- 💡 错误数量可能较多时，建议分批展示

---

### 3.3 POST /api/resume-import - 简历导�?
**功能描述**: 解析上传的内容（文本或图片）并转换为标准化的简历数据结构�?
**文件位置**: [resume-import.ts](src/routes/api/resume-import.ts)

#### 请求参数

| 参数�?| 类型 | 必填 | 说明 |
|--------|------|------|------|
| `apiKey` | string | �?| AI 服务商的 API 密钥 |
| `model` | string | �?| 模型名称（默�?`gemini-flash-latest`�?|
| `content` | string | 条件必填* | 简历文本内容（Markdown 或纯文本�?|
| `images` | string[] | 条件必填* | Base64 编码的简历图片数�?|
| `locale` | string | �?| 语言环境（`"en"` �?`"zh"`，默�?`"zh"`�?|
| `modelType` | enum | �?| 模型类型（默�?`"gemini"`�?|
| `apiEndpoint` | string | �?| 自定�?API 端点 |

> *注：`content` �?`images` 至少提供一�?
#### 请求示例

**cURL 示例 (文本导入):**

```bash
curl -X POST http://localhost:3000/api/resume-import \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your-gemini-key",
    "modelType": "gemini",
    "locale": "zh",
    "content": "# 张三\n## 基本信息\n姓名：张三\n邮箱：zhangsan@example.com\n\n## 教育背景\n清华大学 - 计算机科�?本科 2016-2020\n\n## 工作经历\n字节跳动 - 前端工程�?2020-至今\n- 负责抖音Web端开�?
  }'
```

**cURL 示例 (图片导入):**

```bash
curl -X POST http://localhost:3000/api/resume-import \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your-gemini-key",
    "modelType": "gemini",
    "images": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."]
  }'
```

**JavaScript/TypeScript 示例:**

```typescript
interface ImportedResume {
  title: string;
  basic: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    employementStatus: string;
    birthDate: string;
  };
  education: Array<{
    school: string;
    major: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa: string;
    description: string[];
  }>;
  experience: Array<{
    company: string;
    position: string;
    date: string;
    details: string[];
  }>;
  projects: Array<{
    name: string;
    role: string;
    date: string;
    description: string[];
    link: string;
    linkLabel: string;
  }>;
  skills: string[];
}

async function importResume(params: {
  apiKey: string;
  content?: string;
  images?: string[];
  locale?: string;
  modelType?: AIModelType;
}) {
  const response = await fetch('/api/resume-import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: params.apiKey,
      content: params.content,
      images: params.images,
      locale: params.locale || 'zh',
      modelType: params.modelType || 'gemini',
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Import failed');
  }

  return data.resume as ImportedResume;
}
```

#### 响应格式

**成功响应:**

```json
{
  "resume": {
    "title": "张三的简�?,
    "basic": {
      "name": "张三",
      "title": "高级前端工程�?,
      "email": "zhangsan@example.com",
      "phone": "13800138000",
      "location": "北京",
      "employementStatus": "",
      "birthDate": ""
    },
    "education": [
      {
        "school": "清华大学",
        "major": "计算机科�?,
        "degree": "本科",
        "startDate": "2016-09",
        "endDate": "2020-06",
        "gpa": "3.8/4.0",
        "description": ["GPA 3.8/4.0", "专业排名�?0%"]
      }
    ],
    "experience": [
      {
        "company": "字节跳动",
        "position": "前端工程�?,
        "date": "2020-07 - 至今",
        "details": ["负责抖音Web端核心功能开�?, "性能优化提升40%"]
      }
    ],
    "projects": [],
    "skills": ["React", "TypeScript", "Node.js"]
  }
}
```

**错误响应:**

```json
{
  "error": "Missing API key or resume content/images",
  "code": "MISSING_PARAMS"
}
```

**模型不支持图片的错误:**

```json
{
  "error": "The selected AI model (doubao) does not support image input.",
  "code": "MODEL_NOT_SUPPORT_IMAGES",
  "supportedModels": ["gemini", "openai", "xiaomi"]
}
```

#### HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功，返回解析后的简历数�?|
| 400 | 参数错误（缺�?API Key 或内容） |
| 500 | 服务器内部错误或 AI 解析失败 |
| 502 | 上游 AI 服务错误 |

#### 解析流程

```
┌─────────────�?    ┌──────────────�?    ┌─────────────────�?�? 文件上传    �?──�?�? 内容类型检�? �?──�?�? AI 结构化解�?  �?�?(文本/图片)  �?    �?             �?    �?                �?└─────────────�?    └──────────────�?    └────────┬────────�?                                                 �?                                                 �?                                        ┌─────────────────�?                                        �? JSON 结果验证   �?                                        �? & 容错解析      �?                                        └────────┬────────�?                                                 �?                                                 �?                                        ┌─────────────────�?                                        �? 返回 ResumeData �?                                        └─────────────────�?```

#### 支持的输入格�?
| 格式 | 说明 | 示例 |
|------|------|------|
| 纯文�?| 直接传入简历文本内�?| `"姓名：张�?.."` |
| Markdown | 支持 YAML frontmatter | `"# 张三\n## 基本信息..."` |
| Base64 图片 | PNG/JPEG/WebP 格式 | `"data:image/png;base64,..."` |
| 混合模式 | 同时提供文本和图�?| `content` + `images` |

#### 注意事项

- ⚠️ 图片导入仅支持支持视觉能力的模型（Gemini、OpenAI、小米）
- ⚠️ 返回的数据结构可能与前端 ResumeData 有差异，需做字段映�?- 💡 建议导入后让用户确认和编辑解析结�?- 💡 对于复杂排版建议使用图片模式导入

---

### 3.4 GET/POST /api/proxy/image - 图片代理

**功能描述**: 代理外部图片请求，解决浏览器跨域（CORS）限制问题�?
**文件位置**: [proxy/image.ts](src/routes/api/proxy/image.ts)

#### 请求参数

**GET 方式:**

| 参数�?| 类型 | 位置 | 必填 | 说明 |
|--------|------|------|------|------|
| `url` | string | Query | �?| 目标图片�?URL（需 URL 编码�?|

**POST 方式:**

| 参数�?| 类型 | 必填 | 说明 |
|--------|------|------|------|
| `url` | string | �?| 目标图片�?URL |

#### 请求示例

**GET 请求:**

```bash
# 浏览器直接访�?https://your-domain.com/api/proxy/image?url=https%3A%2F%2Fexample.com%2Favatar.jpg

# cURL
curl "http://localhost:3000/api/proxy/image?url=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("https://example.com/avatar.jpg"))')"
```

**POST 请求:**

```bash
curl -X POST http://localhost:3000/api/proxy/image \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/avatar.jpg"}'
```

**JavaScript/TypeScript 示例:**

```typescript
function getProxiedImageUrl(originalUrl: string): string {
  return `/api/proxy/image?url=${encodeURIComponent(originalUrl)}`;
}

// �?img 标签中使�?<img src={getProxiedImageUrl(userAvatarUrl)} alt="头像" />

// 或通过 fetch 获取
async function fetchProxedImage(url: string): Promise<Blob> {
  const response = await fetch('/api/proxy/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.blob();
}
```

#### 响应格式

**成功响应:**

```
HTTP/1.1 200 OK
Content-Type: image/jpeg
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type

<二进制图片数�?
```

**错误响应:**

```json
{
  "error": "缺少图片URL参数"
}
```

```json
{
  "error": "只支持HTTP和HTTPS协议"
}
```

#### HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功，返回图片二进制�?|
| 400 | 参数错误（缺�?URL、格式无效、协议不支持�?|
| 4xx/5xx | 代理目标服务器返回的错误状态码 |
| 500 | 服务器内部错�?|

#### 安全措施

- �?仅支�?`http:` �?`https:` 协议
- �?URL 格式严格校验
- �?设置完整�?CORS �?- �?禁用缓存（`Cache-Control: no-store`�?- �?携带标准的浏览器 User-Agent �?Referer

#### 使用场景

| 场景 | 说明 |
|------|------|
| 用户头像 | �?GitHub、Gravatar 等外部服务加�?|
| 证书图片 | 展示第三方颁发的证书截图 |
| 模板预览 | 加载远程模板资源 |
| 解决跨域 | 绕过目标服务器的 CORS 限制 |

#### 注意事项

- ⚠️ 此接口无认证，公开可访�?- ⚠️ 不建议用于敏感图片（虽然不会存储�?- ⚠️ 大图片可能导致响应缓�?- 💡 生产环境建议添加速率限制
- 💡 可考虑添加 URL 白名单机�?
---

## 4. 通用说明

### 4.1 错误响应格式

所有接口统一使用以下错误格式�?
```typescript
interface ErrorResponse {
  error: {
    message: string;      // 错误描述（人类可读）
    code?: string;        // 错误码（机器可读，可选）
  };
}
```

### 4.2 通用错误�?
| 错误�?| 说明 | 触发场景 |
|--------|------|----------|
| `INVALID_MODEL_TYPE` | 无效的模型类�?| modelType 不在允许范围�?|
| `MISSING_PARAMS` | 缺少必要参数 | 未提�?apiKey、content �?|
| `MODEL_NOT_SUPPORT_IMAGES` | 模型不支持图�?| 使用 doubao/deepseek 导入图片 |
| `UPSTREAM_ERROR` | 上游服务错误 | AI 服务商返回错�?|
| `PARSE_ERROR` | 解析失败 | AI 返回�?JSON 无法解析 |

### 4.3 限流策略

当前版本未实现服务端限流，但建议�?
- 客户端控制请求频率（建议间隔 �?1 秒）
- 长文本分片处理（单次 �?10000 字符�?- 并发请求控制（建�?�?3 个同时请求）

### 4.4 版本控制

当前�?**v1** 版本，无 URL 版本前缀。未来可能的变更�?
- 新增接口：向后兼容，不影响现有接�?- 参数变更：通过新增可选参数实�?- 重大变更：发�?v2 版本

---

## 5. AI 模型配置参�?
### 5.1 支持的模型类�?
| 模型类型 | 默认 API 端点 | 默认模型 | 是否需�?Model ID | 支持图片 | 认证方式 |
|---------|--------------|---------|------------------|---------|---------|
| `gemini` | `https://generativelanguage.googleapis.com/v1beta` | `gemini-flash-latest` | �?| �?| `x-goog-api-key` |
| `deepseek` | `https://api.deepseek.com/v1/chat/completions` | `deepseek-chat` | �?| �?| `Bearer Token` |
| `openai` | *(需自定�?* | *(需指定)* | �?| �?| `Bearer Token` |
| `doubao` | `https://ark.cn-beijing.volces.com/api/v3/chat/completions` | *(需指定)* | �?| �?| `Bearer Token` |
| `xiaomi` | `https://api.xiaomimimo.com/v1/chat/completions` | `mimo-v2-omni` | �?| �?| `Bearer Token` |
| `custom` | *(必须自定�?* | *(需指定)* | �?| �?| `Bearer Token` |

### 5.2 模型选择建议

| 使用场景 | 推荐模型 | 原因 |
|---------|---------|------|
| 快速润�?| `gemini-flash-latest` | 速度快、免费额度高 |
| 高质量优�?| `deepseek-chat` | 中文理解能力�?|
| 图片识别导入 | `gemini` / `openai` | 视觉能力优秀 |
| 企业私有部署 | `doubao` / `custom` | 数据安全可控 |
| 多模态任�?| `xiaomi-mimo-v2-omni` | 多模态能力全�?|

### 5.3 配置要求

每个模型类型的必需配置项：

```typescript
// Gemini
{ geminiApiKey: string, geminiModelId: string }

// DeepSeek
{ deepseekApiKey: string }

// OpenAI
{ openaiApiKey: string, openaiModelId: string, openaiApiEndpoint: string }

// Doubao
{ doubaoApiKey: string, doubaoModelId: string }

// Xiaomi
{ xiaomiApiKey: string }

// Custom
{ customApiKey: string, customModelId: string, customApiEndpoint: string }
```

---

## 6. Prompt 工程要点

### 6.1 设计原则

��;Resume �?AI Prompt 遵循以下设计原则�?
1. **角色定位明确**: 每个Prompt都定义清晰的专家角色
2. **输出格式约束**: 严格要求输出格式，减少自由发挥空�?3. **负面约束强化**: 明确禁止的行为比正面指导更重�?4. **示例驱动**: 提供具体的输出示例作为参�?5. **自检机制**: 要求AI在输出前自我审查

### 6.2 三套核心 Prompt

#### 技能优�?Prompt (`getSkillsSystemPrompt`)

**目标**: 将技能列表转换为「分类清晰・精简专业」风�?
**关键特征**:
- 预定�?9 个分类维度（前端框架、TypeScript、状态管�?..�?- 每条技能体现熟练程�?+ 应用场景
- 总字数控制在 250 字以�?- 强制禁止任何解释性内�?
**触发条件**: 内容包含「专业技能」「Skills」「Technical Skills」等关键�?
#### 项目经历 Prompt (`getProjectSystemPrompt`)

**目标**: 将草稿转化为 STAR 法则驱动的量化成果描�?
**关键特征**:
- 固定三段式结构：技术栈 �?项目背景 �?核心职责与成�?- 动词开头（主导/设计/优化/实现...�?- **必须附带量化成果**（提�?X%、降�?Y%、节�?Z 时间�?- 每条 30-50 字，简洁有�?
**触发条件**: 内容包含「工作经历」「项目经验」「Project Experience」等关键�?
#### 通用优化 Prompt

**目标**: 对非标准化内容进行专业化改写

**关键特征**:
- 保持原有 Markdown 格式
- 使用更专业的词汇
- 保持信息完整�?- 禁止新增无关章节

**触发条件**: 以上两种情况都不匹配�?
### 6.3 语法检�?Prompt 设计

**特殊之处**:
- `temperature: 0` 确保一致�?- `responseMimeType: "application/json"` 强制结构化输�?- **负面约束优先**: 明确列出禁止行为（禁止润色、禁止改写）
- **例外规则**: 明确忽略中英文标点混用、空格问�?
### 6.4 最佳实�?
```typescript
// �?推荐：明确的输出约束
const goodPrompt = `
输出强约束：
1. 只能输出正文内容本身
2. 禁止输出前言、说明、总结
3. 不要使用 Markdown 代码块包�?`;

// �?避免：模糊的指导
const badPrompt = `
请帮我优化一下这段内容，让它看起来更专业一点�?`;
```

---

## 7. 流式响应处理示例

### 7.1 基础读取示例

```typescript
async function readPolishStream(response: Response): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No readable stream');

  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    result += chunk;

    // 实时更新 UI
    updatePreview(result);
  }

  return result;
}
```

### 7.2 完整�?React Hook 示例

```typescript
import { useState, useCallback } from 'react';

function useAIPolish() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const polish = useCallback(async (
    text: string,
    config: AIConfig
  ) => {
    setLoading(true);
    setError(null);
    setContent('');

    try {
      const response = await fetch('/api/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: config.apiKey,
          model: config.model,
          content: text,
          modelType: config.modelType,
          apiEndpoint: config.apiEndpoint,
          customInstructions: config.customInstructions,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || 'Request failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setContent(fullText); // 逐步更新
      }

      return fullText;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { content, loading, error, polish };
}
```

### 7.3 AbortController 取消示例

```typescript
async function polishWithCancel(text: string, config: AIConfig) {
  const controller = new AbortController();

  try {
    const response = await fetch('/api/polish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ /* ... */ }),
      signal: controller.signal, // 传入 signal
    });

    // 用户点击取消按钮�?    // controller.abort();

    // ... 读取�?  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      console.log('Request cancelled by user');
    }
  }
}
```

### 7.4 错误处理最佳实�?
```typescript
try {
  const response = await fetch('/api/polish', { /* ... */ });

  // 处理 HTTP 错误
  if (!response.status.toString().startsWith('2')) {
    const errorData = await response.json().catch(() => null);

    switch (response.status) {
      case 400:
        throw new Error(`参数错误: ${errorData?.error?.message}`);
      case 401:
      case 403:
        throw new Error('API Key 无效或已过期');
      case 429:
        throw new Error('请求过于频繁，请稍后再试');
      case 500:
        throw new Error('服务器内部错误，请稍后重�?);
      case 502:
      case 503:
        throw new Error('AI 服务暂时不可用，请检查网络连�?);
      default:
        throw new Error(`未知错误 (${response.status})`);
    }
  }

  // 处理流读取错�?  const reader = response.body?.getReader();
  // ...

} catch (err) {
  // 统一错误处理
  console.error('[Polish Error]', err);
  showErrorToast(err.message);
  reportErrorToAnalytics(err);
}
```

---

## 8. 常见问题排查

### 8.1 问题诊断清单

遇到问题时，按以下顺序排查：

#### Step 1: 检查基础配置

```bash
# 1. 确认 API Key 是否正确
echo $GEMINI_API_KEY | head -c 10 # 应显示前10�?
# 2. 确认网络连通�?curl -I https://generativelanguage.googleapis.com

# 3. 确认服务是否运行
curl http://localhost:3000/api/health
```

#### Step 2: 检查请求参�?
```typescript
// 常见参数错误
�?modelType: "Gemini"           // 大写错误
�?modelType: "gemini"

�?缺少 apiKey                   // 必填参数缺失
�?apiKey: "AIza..."

�?model: undefined              // 某些模型需要显式指�?�?model: "deepseek-chat"
```

#### Step 3: 查看完整堆栈

根据用户规则，遇到错误时应：

1. **打印完整堆栈**（不要只显示 500�?2. **找到最底部�?Caused by**
3. **判断异常层级**�?   - 框架层：TanStack Start / Vite 配置问题
   - 业务层：参数校验、逻辑错误
   - 基础设施层：网络、数据库、文件系�?   - 序列化层：JSON 解析、Base64 编解�?4. **针对性修�?*
5. **仍无法解决则贴出完整堆栈寻求帮助**

### 8.2 常见错误及解决方�?
#### 错误 1: Invalid model type

**症状**: 返回 400 错误，提�?"Invalid model type"

**原因**: `modelType` 参数值不在允许范围内

**解决方案**:
```typescript
// 允许的类�?type AIModelType = "doubao" | "deepseek" | "openai" | "gemini" | "xiaomi" | "custom";

// 检查拼�?if (!["doubao", "deepseek", "openai", "gemini", "xiaomi", "custom"].includes(modelType)) {
  throw new Error(`Invalid modelType: ${modelType}`);
}
```

#### 错误 2: Upstream API error: 401 Unauthorized

**症状**: 返回 401 �?403 错误

**原因**: API Key 无效、过期或权限不足

**解决方案**:
1. 检�?API Key 是否复制完整（注意前后空格）
2. 确认 API Key 是否已激�?3. 检查账户余�?配额是否充足
4. 确认 API Key 有权访问指定的模�?
#### 错误 3: MODEL_NOT_SUPPORT_IMAGES

**症状**: 导入图片时报�?"does not support image input"

**原因**: 使用的模型不支持视觉能力

**解决方案**:
```typescript
// 当前支持的图片模�?const IMAGE_SUPPORTED_MODELS = ["gemini", "openai", "xiaomi"];

// 切换到支持的模型
if (images.length > 0 && !IMAGE_SUPPORTED_MODELS.includes(modelType)) {
  alert('请切换到 Gemini/OpenAI/小米模型以支持图片导�?);
}
```

#### 错误 4: Failed to parse AI JSON output

**症状**: 返回 500 错误，提示解析失�?
**原因**: AI 返回的内容不是有效的 JSON

**解决方案**:
1. 检�?AI 返回的原始内容（查看日志�?2. 尝试降低 `temperature` �?3. 切换到更强的模型（如 `gemini-pro` 替代 `gemini-flash`�?4. 简化输入内容长�?
#### 错误 5: Stream reading error / 连接中断

**症状**: 流式响应中途断开

**原因**:
- 网络不稳�?- 服务端超�?- 上游 AI 服务断开连接

**解决方案**:
```typescript
// 添加重试机制
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

#### 错误 6: CORS 错误（图片代理）

**症状**: 浏览器控制台报跨域错�?
**原因**: 直接请求外部图片被浏览器阻止

**解决方案**:
```typescript
// �?错误：直接请求外�?URL
<img src="https://github.com/user.png" />

// �?正确：通过代理
<img src="/api/proxy/image?url=https%3A%2F%2Fgithub.com%2Fuser.png" />
```

### 8.3 性能优化建议

| 问题 | 优化方案 | 预期效果 |
|------|---------|---------|
| 响应�?| 使用 `gemini-flash-latest` | 延迟降低 50%+ |
| 成本�?| 缓存相似内容的优化结�?| 减少 API 调用 |
| 并发�?| 客户端限制并发数（≤3�?| 避免限流错误 |
| 内容�?| 分段处理（每�?�?5000 字） | 降低超时风险 |
| 重复请求 | 添加 debounce�?00ms�?| 减少无效调用 |

---

## 9. 更新日志

### v1.0.0 (2026-05-09)

**初始版本发布**

#### 新增功能

- �?POST `/api/polish` - AI 简历润色接口（支持流式响应�?- �?POST `/api/grammar` - AI 语法检查接�?- �?POST `/api/resume-import` - 简历导入接口（支持文本和图片）
- �?GET/POST `/api/proxy/image` - 图片代理接口

#### 支持�?AI 服务�?
- Google Gemini (原生 SDK + OpenAI 兼容)
- DeepSeek (OpenAI 兼容)
- OpenAI (官方 API)
- 字节跳动豆包 (OpenAI 兼容)
- 小米 MiMo (OpenAI 兼容)
- 自定义端�?(OpenAI 兼容)

#### 核心特�?
- 🎯 智能 Prompt 选择（技�?项目/通用三种模式�?- 🔄 SSE 流式响应（打字机效果�?- 🖼�?多模态支持（图片识别导入�?- 🔒 安全�?API Key 透传（不存储�?- 🌐 CORS 代理解决跨域问题
- 📝 结构化错误响�?
---

## 附录

### A. TypeScript 类型定义

```typescript
// AI 模型类型
export type AIModelType =
  | "doubao"
  | "deepseek"
  | "openai"
  | "gemini"
  | "xiaomi"
  | "custom";

// Polish 请求
interface PolishRequest {
  apiKey: string;
  model: string;
  content: string;
  modelType: AIModelType;
  apiEndpoint?: string;
  customInstructions?: string;
}

// Grammar 请求
interface GrammarRequest {
  apiKey: string;
  model: string;
  content: string;
  modelType: AIModelType;
  apiEndpoint?: string;
}

// Grammar 错误�?interface GrammarError {
  context: string;
  text: string;
  suggestion: string;
  reason: string;
  type: "spelling";
}

// Resume Import 请求
interface ResumeImportRequest {
  apiKey: string;
  model?: string;
  content?: string;
  images?: string[];
  locale?: "en" | "zh";
  modelType?: AIModelType;
  apiEndpoint?: string;
}

// Image Proxy 请求
interface ImageProxyRequest {
  url: string;
}

// 通用错误响应
interface ApiErrorResponse {
  error: {
    message: string;
    code?: string;
  };
}
```

### B. 相关文件索引

| 文件 | 说明 |
|------|------|
| [src/routes/api/polish.ts](src/routes/api/polish.ts) | AI 润色接口实现 |
| [src/routes/api/grammar.ts](src/routes/api/grammar.ts) | 语法检查接口实�?|
| [src/routes/api/resume-import.ts](src/routes/api/resume-import.ts) | 简历导入接口实�?|
| [src/routes/api/proxy/image.ts](src/routes/api/proxy/image.ts) | 图片代理接口实现 |
| [src/config/ai.ts](src/config/ai.ts) | AI 模型配置定义 |
| [src/types/resume.ts](src/types/resume.ts) | 简历数据类型定�?|
| [src/lib/server/gemini.ts](src/lib/server/gemini.ts) | Gemini SDK 封装 |

### C. 参考资�?
- [TanStack Start 文档](https://tanstack.com/start/latest)
- [Google Generative AI SDK](https://ai.google.dev/)
- [DeepSeek API 文档](https://platform.deepseek.com/docs)
- [OpenAI API 文档](https://platform.openai.com/docs)
- [Server-Sent Events 规范](https://html.spec.whatwg.org/multipage/server-sent-events.html)

---

> **文档维护**: 本文档由项目团队维护，如有疑问请提交 Issue�?> **最后更�?*: 2026-05-09
