import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AI_MODEL_CONFIGS, AIModelType } from "@/config/ai";

interface AIConfigState {
  selectedModel: AIModelType;
  doubaoApiKey: string;
  doubaoModelId: string;
  doubaoApiEndpoint: string;
  deepseekApiKey: string;
  deepseekModelId: string;
  deepseekApiEndpoint: string;
  openaiApiKey: string;
  openaiModelId: string;
  openaiApiEndpoint: string;
  geminiApiKey: string;
  geminiModelId: string;
  geminiApiEndpoint: string;
  xiaomiApiKey: string;
  xiaomiModelId: string;
  xiaomiApiEndpoint: string;
  customApiKey: string;
  customModelId: string;
  customApiEndpoint: string;
  setSelectedModel: (model: AIModelType) => void;
  setDoubaoApiKey: (apiKey: string) => void;
  setDoubaoModelId: (modelId: string) => void;
  setDoubaoApiEndpoint: (endpoint: string) => void;
  setDeepseekApiKey: (apiKey: string) => void;
  setDeepseekModelId: (modelId: string) => void;
  setDeepseekApiEndpoint: (endpoint: string) => void;
  setOpenaiApiKey: (apiKey: string) => void;
  setOpenaiModelId: (modelId: string) => void;
  setOpenaiApiEndpoint: (endpoint: string) => void;
  setGeminiApiKey: (apiKey: string) => void;
  setGeminiModelId: (modelId: string) => void;
  setGeminiApiEndpoint: (endpoint: string) => void;
  setXiaomiApiKey: (apiKey: string) => void;
  setXiaomiModelId: (modelId: string) => void;
  setXiaomiApiEndpoint: (endpoint: string) => void;
  setCustomApiKey: (apiKey: string) => void;
  setCustomModelId: (modelId: string) => void;
  setCustomApiEndpoint: (endpoint: string) => void;
  isConfigured: () => boolean;
}

export const useAIConfigStore = create<AIConfigState>()(
  persist(
    (set, get) => ({
      selectedModel: "doubao",
      doubaoApiKey: "",
      doubaoModelId: "",
      doubaoApiEndpoint: "",
      deepseekApiKey: "",
      deepseekModelId: "",
      deepseekApiEndpoint: "",
      openaiApiKey: "",
      openaiModelId: "",
      openaiApiEndpoint: "",
      geminiApiKey: "",
      geminiModelId: "gemini-flash-latest",
      geminiApiEndpoint: "",
      xiaomiApiKey: "",
      xiaomiModelId: "mimo-v2-omni",
      xiaomiApiEndpoint: "",
      customApiKey: "",
      customModelId: "",
      customApiEndpoint: "",
      setSelectedModel: (model: AIModelType) => set({ selectedModel: model }),
      setDoubaoApiKey: (apiKey: string) => set({ doubaoApiKey: apiKey }),
      setDoubaoModelId: (modelId: string) => set({ doubaoModelId: modelId }),
      setDoubaoApiEndpoint: (endpoint: string) => set({ doubaoApiEndpoint: endpoint }),
      setDeepseekApiKey: (apiKey: string) => set({ deepseekApiKey: apiKey }),
      setDeepseekModelId: (modelId: string) => set({ deepseekModelId: modelId }),
      setDeepseekApiEndpoint: (endpoint: string) => set({ deepseekApiEndpoint: endpoint }),
      setOpenaiApiKey: (apiKey: string) => set({ openaiApiKey: apiKey }),
      setOpenaiModelId: (modelId: string) => set({ openaiModelId: modelId }),
      setOpenaiApiEndpoint: (endpoint: string) => set({ openaiApiEndpoint: endpoint }),
      setGeminiApiKey: (apiKey: string) => set({ geminiApiKey: apiKey }),
      setGeminiModelId: (modelId: string) => set({ geminiModelId: modelId }),
      setGeminiApiEndpoint: (endpoint: string) => set({ geminiApiEndpoint: endpoint }),
      setXiaomiApiKey: (apiKey: string) => set({ xiaomiApiKey: apiKey }),
      setXiaomiModelId: (modelId: string) => set({ xiaomiModelId: modelId }),
      setXiaomiApiEndpoint: (endpoint: string) => set({ xiaomiApiEndpoint: endpoint }),
      setCustomApiKey: (apiKey: string) => set({ customApiKey: apiKey }),
      setCustomModelId: (modelId: string) => set({ customModelId: modelId }),
      setCustomApiEndpoint: (endpoint: string) => set({ customApiEndpoint: endpoint }),
      isConfigured: () => {
        const state = get();
        const config = AI_MODEL_CONFIGS[state.selectedModel];
        return config.validate(state);
      }
    }),
    {
      name: "ai-config-storage"
    }
  )
);
