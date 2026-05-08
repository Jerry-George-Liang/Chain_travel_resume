import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import AnimatedFeature from "./client/AnimatedFeature";
import GoDashboard from "./GoDashboard";

export default function CTASection() {
  const t = useTranslations("home");

  return (
    <section className="py-28 md:py-52 relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-secondary/50" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-500/[0.06] via-orange-500/[0.04] to-amber-600/[0.06] rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/[0.04] to-indigo-500/[0.03] rounded-full blur-[100px] animate-float animation-delay-2000" />
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-gradient-to-bl from-emerald-500/[0.03] to-teal-500/[0.02] rounded-full blur-[90px] animate-float-slower" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(27, 27, 24, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(27, 27, 24, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-6 max-w-4xl relative text-center z-10">
        <AnimatedFeature>
          <div className="flex flex-col items-center">
            {/* Icon with glow effect */}
            <div className="relative mb-10">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 relative">
                <Rocket className="w-8 h-8 text-foreground/80" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/10 rounded-3xl blur-xl -z-10 scale-110" />
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold tracking-tight mb-8 leading-[1.12]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/85 bg-clip-text text-transparent inline-block py-[7px]">
                {t("cta.title")}
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground/80 mb-16 max-w-2xl font-light leading-relaxed">
              {t("cta.description")}
            </p>

            <GoDashboard>
              <Button
                size="lg"
                className="rounded-2xl h-16 px-14 text-xl font-semibold shadow-[0_20px_60px_-12px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_70px_-12px_rgba(0,0,0,0.25)] active:scale-[0.97] transition-all duration-300 group relative overflow-hidden bg-gradient-to-r from-foreground to-foreground/90 hover:from-foreground hover:to-foreground/95 text-background"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t("cta.button")}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </GoDashboard>

            {/* Subtle trust indicators */}
            <div className="mt-14 flex items-center justify-center gap-6 text-sm text-muted-foreground/50">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>免费使用</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>无需注册</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>本地存储</span>
              </div>
            </div>
          </div>
        </AnimatedFeature>
      </div>
    </section>
  );
}
