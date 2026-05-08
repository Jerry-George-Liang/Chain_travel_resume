import { useTranslations, useLocale } from "@/i18n/compat/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Wand2, FileText, Globe } from "lucide-react";
import ScrollBackground from "./client/ScrollBackground";
import AnimatedFeature from "./client/AnimatedFeature";
import DynamicBadge from "./client/DynamicBadge";
import GoDashboard from "./GoDashboard";
import Image from "@/lib/image";

export default function HeroSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const heroImage = locale === "en" ? "/web-shot-en.png" : "/web-shot.png";

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-28 pb-24 bg-background">
      <ScrollBackground />

      {/* Enhanced floating decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-16 left-[10%] w-80 h-80 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute top-32 right-[8%] w-96 h-96 bg-gradient-to-bl from-blue-500/12 via-indigo-500/8 to-transparent rounded-full blur-[120px] animate-float-slower" />
        <div className="absolute bottom-32 left-[20%] w-72 h-72 bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-[90px] animate-float" />
        <div className="absolute bottom-48 right-[25%] w-64 h-64 bg-gradient-to-tl from-purple-500/8 to-transparent rounded-full blur-[80px] animate-float-slow" />
      </div>

      {/* Floating geometric accents */}
      <div className="absolute top-[18%] left-[6%] w-3 h-3 bg-amber-400/40 rounded-full animate-pulse-slow hidden lg:block" />
      <div className="absolute top-[35%] right-[8%] w-2 h-2 bg-blue-400/50 rounded-full animate-pulse-slow animation-delay-2000 hidden lg:block" />
      <div className="absolute bottom-[30%] left-[12%] w-2.5 h-2.5 bg-emerald-400/40 rounded-full animate-pulse-slow animation-delay-4000 hidden lg:block" />

      <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
        <AnimatedFeature>
          <DynamicBadge />

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] bg-clip-text text-transparent inline-block py-2.5">
              简历制作如此简单
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#d946ef] bg-clip-text text-transparent inline-block py-2.5">
              智能高效
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            {t("hero.subtitle")}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {[
              { icon: Wand2, label: "AI 驱动", color: "from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400" },
              { icon: FileText, label: "多模板", color: "from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400" },
              { icon: Globe, label: "本地存储", color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400" },
            ].map((item, idx) => (
              <div key={idx} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${item.color} backdrop-blur-sm text-xs font-medium`}>
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <GoDashboard>
              <Button
                size="lg"
                className="rounded-2xl h-14 px-11 text-lg font-semibold shadow-2xl shadow-primary/25 hover:shadow-primary/35 active:scale-[0.97] transition-all duration-300 group relative overflow-hidden bg-gradient-to-r from-foreground to-foreground/90 hover:from-foreground hover:to-foreground/95 text-background"
              >
                <span className="relative z-10">{t("hero.cta")}</span>
                <ArrowRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </GoDashboard>

            <GoDashboard type="templates">
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl h-14 px-11 text-lg font-medium border-border/60 hover:bg-secondary/80 hover:border-border active:scale-[0.97] transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="w-4 h-4 mr-2.5 fill-current" />
                {t("hero.secondary")}
              </Button>
            </GoDashboard>
          </div>
        </AnimatedFeature>

        <AnimatedFeature delay={0.3}>
          <div className="mt-24 relative px-2 sm:px-0">
            {/* Enhanced image container with depth */}
            <div className="absolute -inset-6 bg-gradient-to-b from-amber-500/8 via-orange-500/5 to-transparent rounded-[2.5rem] blur-2xl -z-10 opacity-80" />
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-[2.5rem] blur-xl -z-10" />

            <div className="relative rounded-[2rem] border border-border/40 bg-secondary/20 p-1.5 sm:p-3 backdrop-blur-xl shadow-[0_25px_80px_-12px_rgba(0,0,0,0.15)] overflow-hidden group">
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2rem] pointer-events-none" />

              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

              <Image
                src={heroImage}
                alt="Resume Editor Preview"
                width={1200}
                height={800}
                className="rounded-[1.5rem] shadow-lg group-hover:scale-[1.005] transition-transform duration-700 ease-out relative z-10"
                priority
              />

              {/* Bottom reflection effect */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/[0.02] to-transparent rounded-b-[2rem] pointer-events-none" />
            </div>

            {/* Floating corner decorations */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-amber-400/30 rounded-tl-lg hidden lg:block" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-blue-400/30 rounded-br-lg hidden lg:block" />
          </div>
        </AnimatedFeature>
      </div>
    </section>
  );
}
