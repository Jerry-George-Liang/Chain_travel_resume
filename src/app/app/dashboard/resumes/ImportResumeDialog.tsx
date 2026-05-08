import React from "react";
import { useTranslations } from "@/i18n/compat/client";
import { Braces, Loader2, Sparkles } from "lucide-react";
import { PdfIcon } from "@/components/shared/icons/PdfIcon";
import { cn } from "@/lib/utils";
import { AIModelType } from "@/config/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MODEL_LABELS: Record<AIModelType, { zh: string; en: string }> = {
  doubao: { zh: "豆包 (Doubao)", en: "Doubao" },
  deepseek: { zh: "DeepSeek", en: "DeepSeek" },
  openai: { zh: "OpenAI", en: "OpenAI" },
  gemini: { zh: "Gemini", en: "Gemini" },
  xiaomi: { zh: "小米 (MiMo)", en: "Xiaomi MiMo" },
};

const IMAGE_UNSUPPORTED_MODELS: Set<AIModelType> = new Set(["doubao", "deepseek"]);

interface ImportResumeDialogProps {
  open: boolean;
  isImporting: boolean;
  onOpenChange: (open: boolean) => void;
  jsonFileInputRef: React.RefObject<HTMLInputElement>;
  pdfFileInputRef: React.RefObject<HTMLInputElement>;
  onJsonFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPdfFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentModelType?: AIModelType;
  locale?: string;
}

export const ImportResumeDialog = ({
  open,
  isImporting,
  onOpenChange,
  jsonFileInputRef,
  pdfFileInputRef,
  onJsonFileChange,
  onPdfFileChange,
  currentModelType = "gemini",
  locale = "zh",
}: ImportResumeDialogProps) => {
  const t = useTranslations();
  const modelLabel = MODEL_LABELS[currentModelType]?.[locale] || currentModelType;
  const isImageUnsupported = IMAGE_UNSUPPORTED_MODELS.has(currentModelType || "gemini");

  return (
    <>
      <input
        ref={jsonFileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={onJsonFileChange}
      />
      <input
        ref={pdfFileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={onPdfFileChange}
      />

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (isImporting) return;
          onOpenChange(nextOpen);
        }}
      >
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{t("dashboard.resumes.importDialog.title")}</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <button
              type="button"
              disabled={isImporting}
              className={cn(
                "group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md",
                "active:scale-[0.98]",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              )}
              onClick={() => jsonFileInputRef.current?.click()}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 transition-colors group-hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400">
                <Braces className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-foreground leading-none">
                  {t("dashboard.resumes.importDialog.jsonTitle")}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("dashboard.resumes.importDialog.jsonDescription")}
                </p>
              </div>
            </button>

            <button
              type="button"
              disabled={isImporting || isImageUnsupported}
              className={cn(
                "group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200",
                isImageUnsupported ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md active:scale-[0.98]",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              )}
              onClick={() => !isImageUnsupported && pdfFileInputRef.current?.click()}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600 transition-colors group-hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400">
                <PdfIcon className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground leading-none">
                    {t("dashboard.resumes.importDialog.pdfTitle")}
                  </p>
                  <div className={cn(
                    "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
                    isImageUnsupported ? "bg-orange-500/10 text-orange-600" : "bg-primary/10 text-primary"
                  )}>
                    <Sparkles className="h-3 w-3" />
                    <span>{modelLabel}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("dashboard.resumes.importDialog.pdfDescription")}
                </p>
                {isImageUnsupported && (
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    ⚠️ {t("dashboard.resumes.importDialog.modelNotSupportImages")}
                  </p>
                )}
              </div>
            </button>
          </div>

          {isImporting && (
            <DialogFooter className="sm:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                {t("dashboard.resumes.importDialog.importing")}
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
