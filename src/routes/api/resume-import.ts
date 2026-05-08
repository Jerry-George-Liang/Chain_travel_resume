import { createFileRoute } from "@tanstack/react-router";
import { AIModelType, AI_MODEL_CONFIGS } from "@/config/ai";
import { formatGeminiErrorMessage, getGeminiModelInstance } from "@/lib/server/gemini";

const parseJsonPayload = (content: unknown) => {
  if (typeof content !== "string" || !content.trim()) {
    return null;
  }

  const text = content.trim();
  try {
    return JSON.parse(text);
  } catch (error) {}

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    try {
      return JSON.parse(fenced[1].trim());
    } catch (error) {}
  }

  const objectBlock = text.match(/\{[\s\S]*\}/);
  if (objectBlock?.[0]) {
    try {
      return JSON.parse(objectBlock[0]);
    } catch (error) {}
  }

  return null;
};

const extractBase64Payload = (value: unknown) => {
  if (typeof value !== "string" || !value.trim()) {
    return { mimeType: "image/jpeg", data: "" };
  }

  const matched = value.match(/^data:(.*?);base64,(.*)$/);
  if (matched) {
    return {
      mimeType: matched[1] || "image/jpeg",
      data: matched[2] || "",
    };
  }

  return {
    mimeType: "image/jpeg",
    data: value,
  };
};

const buildSystemPrompt = (language: string) => `你是一个专业的简历结构化助手。根据用户提供的简历内容，提取信息并只输出一个合法 JSON 对象。

输出约束：
1. 只允许输出 JSON，不要输出 Markdown，不要输出解释。
2. 如果某个字段不确定，使用空字符串或空数组。
3. 请使用 ${language} 输出内容文本。
4. description/details 字段输出字符串数组，每一项为一句可读内容。

JSON 结构：
{
  "title": "简历标题",
  "basic": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "employementStatus": "",
    "birthDate": ""
  },
  "education": [
    {
      "school": "",
      "major": "",
      "degree": "",
      "startDate": "",
      "endDate": "",
      "gpa": "",
      "description": ["", ""]
    }
  ],
  "experience": [
    {
      "company": "",
      "position": "",
      "date": "",
      "details": ["", ""]
    }
  ],
  "projects": [
    {
      "name": "",
      "role": "",
      "date": "",
      "description": ["", ""],
      "link": "",
      "linkLabel": ""
    }
  ],
  "skills": ["", ""]
}`;

const buildUserContent = (textContent: string | undefined, imageParts: any[]) => {
  if (imageParts.length > 0 && !textContent) {
    return "请识别以下简历页面图片中的信息，并严格按 JSON 结构输出。";
  }
  return textContent || "";
};

export const Route = createFileRoute("/api/resume-import")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const {
            apiKey,
            model,
            content,
            images,
            locale,
            modelType = "gemini",
            apiEndpoint,
          } = body as {
            apiKey: string;
            model?: string;
            content?: string;
            images?: string[];
            locale?: string;
            modelType?: AIModelType;
            apiEndpoint?: string;
          };

          if (!apiKey || (!content && (!images || images.length === 0))) {
            return Response.json(
              { error: "Missing API key or resume content/images" },
              { status: 400 }
            );
          }

          const language = locale === "en" ? "English" : "Chinese";
          const systemPrompt = buildSystemPrompt(language);
          const imageParts = Array.isArray(images)
            ? images.map((image) => {
                const payload = extractBase64Payload(image);
                return {
                  inlineData: {
                    mimeType: payload.mimeType,
                    data: payload.data,
                  },
                };
              })
            : [];
          const userText = buildUserContent(content, imageParts);

          let parsedResume: any = null;

          if (modelType === "gemini") {
            const geminiModel = model || "gemini-flash-latest";
            const modelInstance = getGeminiModelInstance({
              apiKey,
              model: geminiModel,
              systemInstruction: systemPrompt,
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
              },
            });

            const inputParts: any[] = [];
            if (userText) inputParts.push({ text: userText });
            inputParts.push(...imageParts);
            if (!userText && imageParts.length === 0) {
              inputParts.push({ text: "请识别以下简历页面图片中的信息，并严格按 JSON 结构输出。" });
            }

            const result = await modelInstance.generateContent(inputParts);
            const aiContent = result.response.text();

            if (!aiContent || typeof aiContent !== "string") {
              return Response.json(
                { error: "AI did not return structured content" },
                { status: 500 }
              );
            }

            parsedResume = parseJsonPayload(aiContent);
          } else {
            const modelConfig = AI_MODEL_CONFIGS[modelType as AIModelType];
            if (!modelConfig) {
              return Response.json(
                { error: `Unsupported model type: ${modelType}` },
                { status: 400 }
              );
            }

            if (!modelConfig.supportsImages && images && images.length > 0) {
              return Response.json(
                {
                  error: `The selected AI model (${modelType}) does not support image input. Please use Gemini, OpenAI, or Xiaomi MiMo for PDF import.`,
                  code: "MODEL_NOT_SUPPORT_IMAGES",
                  supportedModels: ["gemini", "openai", "xiaomi"],
                },
                { status: 400 }
              );
            }

            const userContentParts: any[] = [];
            if (userText) {
              userContentParts.push({ type: "text", text: userText });
            }

            if (Array.isArray(images) && images.length > 0) {
              for (const image of images) {
                if (typeof image === "string" && image.trim()) {
                  const payload = extractBase64Payload(image);
                  userContentParts.push({
                    type: "image_url",
                    image_url: {
                      url: `data:${payload.mimeType};base64,${payload.data}`,
                    },
                  });
                }
              }
            }

            if (userContentParts.length === 0) {
              userContentParts.push({
                type: "text",
                text: "请识别以下简历页面图片中的信息，并严格按 JSON 结构输出。",
              });
            }

            const response = await fetch(modelConfig.url(apiEndpoint), {
              method: "POST",
              headers: modelConfig.headers(apiKey),
              body: JSON.stringify({
                model: modelConfig.requiresModelId
                  ? model
                  : modelConfig.defaultModel,
                response_format: { type: "json_object" },
                messages: [
                  { role: "system", content: systemPrompt },
                  { role: "user", content: userContentParts },
                ],
                temperature: 0.2,
              }),
            });

            if (!response.ok) {
            const rawError = await response.text();
            let errorMsg = `Upstream API error: ${response.status} ${response.statusText}`;
            let errorCode: string | undefined;
            try {
              const errData = JSON.parse(rawError);
              errorMsg =
                errData.error?.message ||
                errData.message ||
                errorMsg;

              if (
                errorMsg.includes("image_url") ||
                errorMsg.includes("unknown variant") ||
                errorMsg.includes("expected `text`")
              ) {
                errorCode = "MODEL_NOT_SUPPORT_IMAGES";
                errorMsg = `The selected AI model or endpoint (${modelType}) does not support image input (image_url format). This usually means you're using a Doubao-compatible endpoint or a provider that doesn't support vision/image features. Please switch to Gemini, or use DeepSeek/OpenAI with their official endpoints.`;
              }
            } catch {}
            return Response.json({ error: errorMsg, code: errorCode }, { status: response.status });
          }

            const rawData = await response.text();
            let aiResponse: any;
            try {
              aiResponse = JSON.parse(rawData);
            } catch {
              return Response.json(
                { error: "Invalid upstream response: expected JSON" },
                { status: 502 }
              );
            }

            const aiContent =
              aiResponse.choices?.[0]?.message?.content ?? "";

            if (!aiContent || typeof aiContent !== "string") {
              return Response.json(
                { error: "AI did not return structured content" },
                { status: 500 }
              );
            }

            parsedResume = parseJsonPayload(aiContent);
          }

          if (!parsedResume) {
            return Response.json(
              { error: "Failed to parse AI JSON output" },
              { status: 500 }
            );
          }

          return Response.json({ resume: parsedResume });
        } catch (error) {
          console.error("Error in resume import:", error);
          const status =
            typeof (error as any)?.status === "number"
              ? (error as any).status
              : 500;
          return Response.json(
            { error: formatGeminiErrorMessage(error) },
            { status }
          );
        }
      },
    },
  },
});
