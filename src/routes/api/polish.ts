import { createFileRoute } from "@tanstack/react-router";
import { AIModelType, AI_MODEL_CONFIGS } from "@/config/ai";
import { formatGeminiErrorMessage, getGeminiModelInstance } from "@/lib/server/gemini";

const parseUpstreamError = (raw: string, fallback: string) => {
  if (!raw) return { message: fallback };
  try {
    const data = JSON.parse(raw) as {
      error?: { message?: string; code?: string };
      message?: string;
    };
    return {
      message: data.error?.message || data.message || fallback,
      code: data.error?.code
    };
  } catch {
    return { message: raw };
  }
};

const SKILLS_KEYWORDS = ["专业技能", "技能", "技术栈", "专业能力", "Skills", "Technical Skills", "Core Competencies"];

const isSkillsContent = (content: string): boolean => {
  const lowerContent = content.toLowerCase();
  return SKILLS_KEYWORDS.some(keyword => lowerContent.includes(keyword.toLowerCase()));
};

const getSkillsSystemPrompt = (): string => `你是一个专业的简历优化助手。请将以下"专业技能"部分重写为"精简・分类清晰"风格。

**输出格式要求（必须严格遵守）：**

1. **分类维度**（按以下类别组织，每个类别用加粗标题）：
   - **前端框架**
   - **TypeScript**
   - **状态管理**
   - **UI 组件库**
   - **工程化工具**
   - **网络通信**
   - **样式布局**
   - **版本控制**
   - **其他扩展**

2. **每条技能的描述规范**：
   - 用一句话概括，体现熟练程度（精通/熟悉/了解）+ 具体应用场景
   - 突出工程化能力和实践深度（如"能独立完成架构设计""有大量实践""具备二次封装能力"）
   - 避免罗列基础知识点（如"熟悉 HTML/CSS/JS"）
   - 措辞简洁有力，每句话要有信息量

3. **字数约束**：总字数控制在 250 字以内

4. **可选标注**：对与目标岗位不完全相关的技能，可加一句"如岗位不相关可删除"

**输出强约束（必须遵守）：**
1. 只能输出润色后的正文内容本身
2. 禁止输出任何前言、说明、总结、附加建议
3. 禁止出现引导语（如"以下是...""根据您提供..."等）
4. 禁止新增与原文无关的章节标题或收尾段落
5. 不要使用 Markdown 代码块（\`\`\`)包裹结果
6. 若产生解释性内容，必须在输出前自检并删除，只保留最终正文
7. 保持原有的 Markdown 列表格式`;

const PROJECT_KEYWORDS = ["项目经历", "项目经验", "项目", "工作经历", "实习经历", "Project Experience", "Projects", "Work Experience", "Internship"];

const isProjectContent = (content: string): boolean => {
  const lowerContent = content.toLowerCase();
  return PROJECT_KEYWORDS.some(keyword => lowerContent.includes(keyword.toLowerCase()));
};

const getProjectSystemPrompt = (): string => `你是一位资深技术简历优化专家。请根据提供的"技术栈 + 项目背景 + 核心职责与成果（原始草稿）"，生成一段适合写进简历的"项目经验"描述。

**输出格式要求（必须严格遵守）：**

**第一行：** 技术栈：+ 一行列出所有关键技术（用加号连接）
示例：技术栈：React + TypeScript + Node.js + Redis + PostgreSQL

**第二行：** 项目背景：+ 一句话说明项目类型与核心价值
示例：项目背景：面向企业级客户的 SaaS 平台重构，支撑百万级用户并发访问

**第三行开始：核心职责与成果：** 下方分点列出（5-6 条）

每条要求：
1. **动词开头**（如主导/设计/优化/实现/使用/部署/搭建/重构/开发/负责）
2. **包含关键技术或方法**（具体的技术名称、框架、算法、架构模式等）
3. **必须附带量化成果**（如提升 40%、降低 57%、毫秒级响应、节省 60% 时间、支持 10万+ QPS 等）
4. **字数控制**：每条控制在 30-50 字
5. **语言风格**：简洁专业，不写主观评价词（如"效果很好""表现优秀""获得好评"等）

**量化成果参考维度：**
- 性能指标：响应时间、吞吐量、加载速度、内存占用
- 业务指标：用户增长、转化率、覆盖率、活跃度
- 效率指标：开发效率、构建时间、部署频率、Bug 率
- 质量指标：代码覆盖率、系统可用性、错误率

**输出强约束（必须遵守）：**
1. 只能输出润色后的正文内容本身
2. 禁止输出任何前言、说明、总结、附加建议
3. 禁止出现引导语（如"以下是...""根据您提供..."等）
4. 禁止新增与原文无关的章节标题或收尾段落
5. 不要使用 Markdown 代码块（\`\`\`)包裹结果
6. 若产生解释性内容，必须在输出前自检并删除，只保留最终正文
7. 保持原有的 Markdown 列表格式`;

export const Route = createFileRoute("/api/polish")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { apiKey, model, content, modelType, apiEndpoint, customInstructions } = body as {
            apiKey: string;
            model: string;
            content: string;
            modelType: AIModelType;
            apiEndpoint?: string;
            customInstructions?: string;
          };

          const modelConfig = AI_MODEL_CONFIGS[modelType as AIModelType];
          if (!modelConfig) {
            throw new Error("Invalid model type");
          }

          let systemPrompt = isProjectContent(content)
            ? getProjectSystemPrompt()
            : isSkillsContent(content)
              ? getSkillsSystemPrompt()
              : `你是一个专业的简历优化助手。请帮助优化以下 Markdown 格式的文本，使其更加专业和有吸引力。

                优化原则：
                1. 使用更专业的词汇和表达方式
                2. 突出关键成就和技能
                3. 保持简洁清晰
                4. 使用主动语气
                5. 保持原有信息的完整性
                6. 严格保留原有的 Markdown 格式结构（列表项保持为列表项，加粗保持加粗等）

                输出强约束（必须遵守）：
                1. 只能输出"润色后的正文内容"本身。
                2. 禁止输出任何前言、说明、总结、附加建议。
                3. 禁止出现这类引导语：如"以下是...""根据您提供...""这是...""特点：""说明：""总结："等。
                4. 禁止新增与原文无关的章节标题或收尾段落。
                5. 不要使用 Markdown 代码块（\`\`\`)包裹结果。
                6. 若你产生了解释性内容，必须在输出前自检并删除，只保留最终正文。`;

          if (customInstructions?.trim()) {
            systemPrompt += `\n\n用户额外要求：\n${customInstructions.trim()}`;
          }

          if (modelType === "gemini") {
            const geminiModel = model || "gemini-flash-latest";
            const modelInstance = getGeminiModelInstance({
              apiKey,
              model: geminiModel,
              systemInstruction: systemPrompt,
              generationConfig: {
                temperature: 0.4,
              },
            });

            const encoder = new TextEncoder();

            const stream = new ReadableStream({
              async start(controller) {
                try {
                  const result = await modelInstance.generateContentStream(content);
                  for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    if (chunkText) {
                      controller.enqueue(encoder.encode(chunkText));
                    }
                  }
                } catch (error) {
                  controller.error(error);
                  return;
                }
                controller.close();
              },
            });

            return new Response(stream, {
              headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive"
              }
            });
          }

          const response = await fetch(modelConfig.url(apiEndpoint), {
            method: "POST",
            headers: modelConfig.headers(apiKey),
            body: JSON.stringify({
              model: modelConfig.requiresModelId ? model : modelConfig.defaultModel,
              messages: [
                {
                  role: "system",
                  content: systemPrompt
                },
                {
                  role: "user",
                  content
                }
              ],
              stream: true
            })
          });

          if (!response.ok) {
            const fallbackMessage = `Upstream API error: ${response.status} ${response.statusText}`;
            const rawError = await response.text();
            const parsedError = parseUpstreamError(rawError, fallbackMessage);
            return Response.json(
              { error: parsedError },
              { status: response.status }
            );
          }

          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            async start(controller) {
              if (!response.body) {
                controller.close();
                return;
              }

              const reader = response.body.getReader();
              const decoder = new TextDecoder();
              let pending = "";

              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) {
                    break;
                  }

                  pending += decoder.decode(value, { stream: true });
                  const lines = pending.split(/\r?\n/);
                  pending = lines.pop() ?? "";

                  for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith("data:")) continue;

                    try {
                      const payload = trimmed.slice(5).trim();
                      if (!payload || payload === "[DONE]") continue;

                      const data = JSON.parse(payload) as {
                        error?: { message?: string };
                        choices?: Array<{ delta?: { content?: string } }>;
                      };
                      if (data.error?.message) {
                        controller.error(new Error(data.error.message));
                        return;
                      }

                      const deltaContent = data.choices?.[0]?.delta?.content;
                      if (deltaContent) {
                        controller.enqueue(encoder.encode(deltaContent));
                      }
                    } catch (e) {
                      console.error("Error parsing JSON:", e);
                    }
                  }
                }

                const tail = (pending + decoder.decode()).trim();
                if (tail.startsWith("data:")) {
                  const payload = tail.slice(5).trim();
                  if (payload && payload !== "[DONE]") {
                    const data = JSON.parse(payload) as {
                      choices?: Array<{ delta?: { content?: string } }>;
                    };
                    const deltaContent = data.choices?.[0]?.delta?.content;
                    if (deltaContent) {
                      controller.enqueue(encoder.encode(deltaContent));
                    }
                  }
                }

                controller.close();
              } catch (error) {
                console.error("Stream reading error:", error);
                controller.error(error);
              }
            }
          });

          return new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive"
            }
          });
        } catch (error) {
          console.error("Polish error:", error);
          return Response.json(
            { error: formatGeminiErrorMessage(error) },
            { status: 500 }
          );
        }
      }
    }
  }
});
