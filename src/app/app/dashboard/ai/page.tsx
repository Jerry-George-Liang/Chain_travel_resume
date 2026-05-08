import { useEffect, useState } from "react";
import { Check, ExternalLink, Sparkles, Globe, Zap } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DeepSeekLogo from "@/components/ai/icon/IconDeepseek";
import IconDoubao from "@/components/ai/icon/IconDoubao";
import { useAIConfigStore } from "@/store/useAIConfigStore";
import { AIModelType } from "@/config/ai";
import { cn } from "@/lib/utils";
import IconOpenAi from "@/components/ai/icon/IconOpenAi";

const AISettingsPage = () => {
  const {
    doubaoApiKey,
    doubaoModelId,
    doubaoApiEndpoint,
    deepseekApiKey,
    deepseekModelId,
    deepseekApiEndpoint,
    openaiApiKey,
    openaiModelId,
    openaiApiEndpoint,
    geminiApiKey,
    geminiModelId,
    geminiApiEndpoint,
    xiaomiApiKey,
    xiaomiModelId,
    xiaomiApiEndpoint,
    setDoubaoApiKey,
    setDoubaoModelId,
    setDoubaoApiEndpoint,
    setDeepseekApiKey,
    setDeepseekModelId,
    setDeepseekApiEndpoint,
    setOpenaiApiKey,
    setOpenaiModelId,
    setOpenaiApiEndpoint,
    setGeminiApiKey,
    setGeminiModelId,
    setGeminiApiEndpoint,
    xiaomiApiKey: xiaomiKey,
    xiaomiModelId: xiaomiMid,
    xiaomiApiEndpoint: xiaomiEp,
    setXiaomiApiKey,
    setXiaomiModelId,
    setXiaomiApiEndpoint,
    customApiKey,
    customModelId,
    customApiEndpoint,
    setCustomApiKey,
    setCustomModelId,
    setCustomApiEndpoint,
    selectedModel,
    setSelectedModel,
  } = useAIConfigStore();
  const [currentModel, setCurrentModel] = useState(selectedModel);

  const t = useTranslations();

  useEffect(() => {
    setCurrentModel(selectedModel);
  }, [selectedModel]);

  const handleApiKeyChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "doubao" | "deepseek" | "openai" | "gemini" | "xiaomi" | "custom"
  ) => {
    const newApiKey = e.target.value;
    if (type === "doubao") {
      setDoubaoApiKey(newApiKey);
    } else if (type === "deepseek") {
      setDeepseekApiKey(newApiKey);
    } else if (type === "gemini") {
      setGeminiApiKey(newApiKey);
    } else if (type === "openai") {
      setOpenaiApiKey(newApiKey);
    } else if (type === "xiaomi") {
      setXiaomiApiKey(newApiKey);
    } else if (type === "custom") {
      setCustomApiKey(newApiKey);
    }
  };

  const handleModelIdChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "doubao" | "deepseek" | "openai" | "gemini" | "xiaomi" | "custom"
  ) => {
    const newModelId = e.target.value;
    if (type === "doubao") {
      setDoubaoModelId(newModelId);
    } else if (type === "deepseek") {
      setDeepseekModelId(newModelId);
    } else if (type === "openai") {
      setOpenaiModelId(newModelId);
    } else if (type === "gemini") {
      setGeminiModelId(newModelId);
    } else if (type === "xiaomi") {
      setXiaomiModelId(newModelId);
    } else if (type === "custom") {
      setCustomModelId(newModelId);
    }
  };

  const handleApiEndpointChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "doubao" | "deepseek" | "openai" | "gemini" | "xiaomi" | "custom"
  ) => {
    const newApiEndpoint = e.target.value;
    if (type === "doubao") {
      setDoubaoApiEndpoint(newApiEndpoint);
    } else if (type === "deepseek") {
      setDeepseekApiEndpoint(newApiEndpoint);
    } else if (type === "openai") {
      setOpenaiApiEndpoint(newApiEndpoint);
    } else if (type === "gemini") {
      setGeminiApiEndpoint(newApiEndpoint);
    } else if (type === "xiaomi") {
      setXiaomiApiEndpoint(newApiEndpoint);
    } else if (type === "custom") {
      setCustomApiEndpoint(newApiEndpoint);
    }
  };

  const getEndpointValue = (type: string) => {
    switch (type) {
      case "doubao": return doubaoApiEndpoint;
      case "deepseek": return deepseekApiEndpoint;
      case "openai": return openaiApiEndpoint;
      case "gemini": return geminiApiEndpoint;
      case "xiaomi": return xiaomiEp;
      case "custom": return customApiEndpoint;
      default: return "";
    }
  };

  const models = [
    {
      id: "deepseek",
      name: t("dashboard.settings.ai.deepseek.title"),
      description: t("dashboard.settings.ai.deepseek.description"),
      icon: DeepSeekLogo,
      link: "https://platform.deepseek.com",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
      isConfigured: !!deepseekApiKey,
    },
    {
      id: "doubao",
      name: t("dashboard.settings.ai.doubao.title"),
      description: t("dashboard.settings.ai.doubao.description"),
      icon: IconDoubao,
      link: "https://console.volcengine.com/ark",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      isConfigured: !!(doubaoApiKey && doubaoModelId),
    },
    {
      id: "openai",
      name: t("dashboard.settings.ai.openai.title"),
      description: t("dashboard.settings.ai.openai.description"),
      icon: IconOpenAi,
      link: "https://platform.openai.com/api-keys",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/50",
      isConfigured: !!(openaiApiKey && openaiModelId && openaiApiEndpoint),
    },
    {
      id: "gemini",
      name: t("dashboard.settings.ai.gemini.title"),
      description: t("dashboard.settings.ai.gemini.description"),
      icon: Sparkles,
      link: "https://aistudio.google.com/app/apikey",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/50",
      isConfigured: !!(geminiApiKey && geminiModelId),
    },
    {
      id: "xiaomi",
      name: t("dashboard.settings.ai.xiaomi.title"),
      description: t("dashboard.settings.ai.xiaomi.description"),
      icon: Zap,
      link: "https://platform.xiaomi.com",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
      isConfigured: !!xiaomiKey,
    },
    {
      id: "custom",
      name: t("dashboard.settings.ai.custom.title"),
      description: t("dashboard.settings.ai.custom.description"),
      icon: Globe,
      link: "",
      color: "text-gray-500",
      bgColor: "bg-gray-50 dark:bg-gray-950/50",
      isConfigured: !!(customApiKey && customModelId && customApiEndpoint),
    },
  ];

  const inputClassName = cn(
    "h-11",
    "bg-white dark:bg-gray-900",
    "border-gray-200 dark:border-gray-800",
    "focus:ring-2 focus:ring-primary/20"
  );

  return (
    <div className="mx-auto py-4 px-4">
      <div className="flex gap-8">
        <div className="w-64 space-y-6">
          <div className="flex flex-col space-y-1">
            {models.map((model) => {
              const Icon = model.icon;
              const isChecked = selectedModel === model.id;
              const isViewing = currentModel === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => {
                    setCurrentModel(model.id as typeof currentModel);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left border",
                    "transition-all duration-200 cursor-pointer",
                    "hover:bg-primary/10 hover:border-primary/30",
                    isViewing
                      ? "bg-primary/10 border-primary/40"
                      : "border-transparent"
                  )}
                >
                  <div
                    className={cn(
                      "shrink-0",
                      isViewing ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col items-start">
                    <span
                      className={cn(
                        "font-medium text-sm",
                        isViewing && "text-primary"
                      )}
                    >
                      {model.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-full">
                      {model.isConfigured
                        ? t("common.configured")
                        : t("common.notConfigured")}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Select ${model.name}`}
                    onClick={() => {
                      setSelectedModel(
                        model.id as AIModelType
                      );
                      setCurrentModel(
                        model.id as AIModelType
                      );
                    }}
                    className={cn(
                      "h-6 w-6 rounded-md flex items-center justify-center border transition-all",
                      "shrink-0",
                      isChecked
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-transparent border-muted-foreground/40 text-transparent hover:border-primary/40"
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 max-w-2xl">
          {models.map(
            (model) =>
              model.id === currentModel && (
                <div key={model.id} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                      <div className={cn("shrink-0", model.color)}>
                        <model.icon className="h-6 w-6" />
                      </div>
                      {model.name}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {model.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">
                          {t(`dashboard.settings.ai.${model.id}.apiKey`)}
                        </Label>
                        {model.link && (
                        <a
                          href={model.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          {t("dashboard.settings.ai.getApiKey")}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        )}
                      </div>
                      <Input
                        value={
                          model.id === "doubao"
                            ? doubaoApiKey
                            : model.id === "openai"
                            ? openaiApiKey
                            : model.id === "gemini"
                            ? geminiApiKey
                            : model.id === "xiaomi"
                            ? xiaomiKey
                            : model.id === "custom"
                            ? customApiKey
                            : deepseekApiKey
                        }
                        onChange={(e) =>
                          handleApiKeyChange(
                            e,
                            model.id as AIModelType
                          )
                        }
                        type="password"
                        placeholder={t(
                          `dashboard.settings.ai.${model.id}.apiKey`
                        )}
                        className={inputClassName}
                      />
                    </div>

                    {(model.id === "doubao" || model.id === "deepseek" || model.id === "openai" || model.id === "gemini" || model.id === "xiaomi" || model.id === "custom") && (
                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          {t(`dashboard.settings.ai.${model.id}.modelId`)}
                        </Label>
                        <Input
                          value={
                            model.id === "doubao"
                              ? doubaoModelId
                              : model.id === "deepseek"
                              ? deepseekModelId
                              : model.id === "openai"
                              ? openaiModelId
                              : model.id === "gemini"
                              ? geminiModelId
                              : model.id === "xiaomi"
                              ? xiaomiMid
                              : customModelId
                          }
                          onChange={(e) => handleModelIdChange(e, model.id as AIModelType)}
                          placeholder={
                            model.id === "deepseek"
                              ? "deepseek-chat, deepseek-v4-pro, deepseek-v4-flash..."
                              : model.id === "custom"
                              ? "glm-4, moonshot-v1, qwen-turbo, ollama模型名..."
                              : t(`dashboard.settings.ai.${model.id}.modelId`)
                          }
                          className={inputClassName}
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          {t(`dashboard.settings.ai.${model.id}.apiEndpoint`)}
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          ({t("dashboard.settings.ai.optional")})
                        </span>
                      </div>
                      <Input
                        value={getEndpointValue(model.id)}
                        onChange={(e) => handleApiEndpointChange(e, model.id as AIModelType)}
                        placeholder={
                          model.id === "custom"
                            ? "https://api.openlm.ai/v1, http://localhost:11434/v1 (Ollama)..."
                            : t(`dashboard.settings.ai.${model.id}.apiEndpointPlaceholder`)
                        }
                        className={inputClassName}
                      />
                      <p className="text-xs text-muted-foreground">
                        {model.id === "custom"
                          ? t("dashboard.settings.ai.custom.apiEndpointHint")
                          : t(`dashboard.settings.ai.${model.id}.apiEndpointHint`)
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
export const runtime = "edge";

export default AISettingsPage;
