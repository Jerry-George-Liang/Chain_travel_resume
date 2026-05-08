export type AIModelType = "doubao" | "deepseek" | "openai" | "gemini" | "xiaomi" | "custom";

export interface AIValidationContext {
  doubaoApiKey?: string;
  doubaoModelId?: string;
  doubaoApiEndpoint?: string;
  deepseekApiKey?: string;
  deepseekModelId?: string;
  deepseekApiEndpoint?: string;
  openaiApiKey?: string;
  openaiModelId?: string;
  openaiApiEndpoint?: string;
  geminiApiKey?: string;
  geminiModelId?: string;
  geminiApiEndpoint?: string;
  xiaomiApiKey?: string;
  xiaomiModelId?: string;
  xiaomiApiEndpoint?: string;
  customApiKey?: string;
  customModelId?: string;
  customApiEndpoint?: string;
}

export interface AIModelConfig {
  url: (endpoint?: string) => string;
  requiresModelId: boolean;
  supportsImages: boolean;
  defaultModel?: string;
  headers: (apiKey: string) => Record<string, string>;
  validate: (context: AIValidationContext) => boolean;
}

export const AI_MODEL_CONFIGS: Record<AIModelType, AIModelConfig> = {
  doubao: {
    url: (endpoint?: string) => {
      if (endpoint && endpoint.trim()) {
        return `${endpoint.trim().replace(/\/+$/, "")}/chat/completions`;
      }
      return "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
    },
    requiresModelId: true,
    supportsImages: false,
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }),
    validate: (context: AIValidationContext) => !!(context.doubaoApiKey && context.doubaoModelId),
  },
  deepseek: {
    url: (endpoint?: string) => {
      if (endpoint && endpoint.trim()) {
        return `${endpoint.trim().replace(/\/+$/, "")}/chat/completions`;
      }
      return "https://api.deepseek.com/v1/chat/completions";
    },
    requiresModelId: true,
    supportsImages: false,
    defaultModel: "deepseek-chat",
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }),
    validate: (context: AIValidationContext) => !!context.deepseekApiKey,
  },
  openai: {
    url: (endpoint?: string) => `${(endpoint || "").trim().replace(/\/+$/, "")}/chat/completions`,
    requiresModelId: true,
    supportsImages: true,
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }),
    validate: (context: AIValidationContext) => !!(context.openaiApiKey && context.openaiModelId && context.openaiApiEndpoint),
  },
  gemini: {
    url: (endpoint?: string) => {
      if (endpoint && endpoint.trim()) {
        return endpoint.trim().replace(/\/+$/, "");
      }
      return "https://generativelanguage.googleapis.com/v1beta";
    },
    requiresModelId: true,
    supportsImages: true,
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    }),
    validate: (context: AIValidationContext) => !!(context.geminiApiKey && context.geminiModelId),
  },
  xiaomi: {
    url: (endpoint?: string) => {
      if (endpoint && endpoint.trim()) {
        return `${endpoint.trim().replace(/\/+$/, "")}/chat/completions`;
      }
      return "https://api.xiaomimimo.com/v1/chat/completions";
    },
    requiresModelId: true,
    supportsImages: true,
    defaultModel: "mimo-v2-omni",
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }),
    validate: (context: AIValidationContext) => !!context.xiaomiApiKey,
  },
  custom: {
    url: (endpoint?: string) => {
      if (endpoint && endpoint.trim()) {
        return `${endpoint.trim().replace(/\/+$/, "")}/chat/completions`;
      }
      return "";
    },
    requiresModelId: true,
    supportsImages: false,
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }),
    validate: (context: AIValidationContext) => !!(context.customApiKey && context.customModelId && context.customApiEndpoint),
  },
};
