import { memo, useMemo } from "react";
import { useTranslations, useLocale } from "@/i18n/compat/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Wand2, FileText, Globe, Zap, Gift, Shield } from "lucide-react";
import ScrollBackground from "./client/ScrollBackground";
import AnimatedFeature from "./client/AnimatedFeature";
import DynamicBadge from "./client/DynamicBadge";
import GoDashboard from "./GoDashboard";
import Image from "@/lib/image";
import { motion } from "framer-motion";

const FeatureCard = memo(function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  borderColor,
  textColor,
  iconColor,
  index
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
  index: number;
}) {
  return (
    <motion.div
      className={`relative group rounded-2xl border ${borderColor} bg-gradient-to-br ${gradient} p-4 backdrop-blur-sm cursor-default overflow-hidden`}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      custom={index}
      style={{ willChange: "transform" }}
    >
      <div className="absolute inset-0 bg-white/[0.03] rounded-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-2">
        <div className={`w-11 h-11 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>

        <div>
          <h3 className={`font-semibold text-sm ${textColor} mb-0.5`}>
            {title}
          </h3>
          <p className="text-xs text-muted-foreground/80 font-medium">
            {description}
          </p>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </motion.div>
  );
});

export default function HeroSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const heroImage = locale === "en" ? "/web-shot-en.png" : "/web-shot.png";

  const cards = useMemo(() => [
    {
      icon: Zap,
      title: t("hero.cards.ai.title"),
      description: t("hero.cards.ai.description"),
      gradient: "from-violet-500/15 via-purple-500/10 to-fuchsia-500/5",
      borderColor: "border-violet-500/30",
      textColor: "text-violet-700 dark:text-violet-300",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
    {
      icon: Zap,
      title: t("hero.cards.fast.title"),
      description: t("hero.cards.fast.description"),
      gradient: "from-blue-500/15 via-cyan-500/10 to-sky-500/5",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-700 dark:text-blue-300",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Gift,
      title: t("hero.cards.free.title"),
      description: t("hero.cards.free.description"),
      gradient: "from-emerald-500/15 via-teal-500/10 to-green-500/5",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-700 dark:text-emerald-300",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Shield,
      title: t("hero.cards.secure.title"),
      description: t("hero.cards.secure.description"),
      gradient: "from-amber-500/15 via-orange-500/10 to-yellow-500/5",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-700 dark:text-amber-300",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  ], [t]);

  const pills = useMemo(() => [
    { icon: Wand2, label: "AI 驱动", color: "from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400" },
    { icon: FileText, label: "多模板", color: "from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400" },
    { icon: Globe, label: "本地存储", color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400" },
  ], []);

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-28 pb-24 bg-background">
      <ScrollBackground />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none contain-layout">
        <div className="absolute top-16 left-[10%] w-80 h-80 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute top-32 right-[8%] w-96 h-96 bg-gradient-to-bl from-blue-500/12 via-indigo-500/8 to-transparent rounded-full blur-[120px] animate-float-slower" />
        <div className="absolute bottom-32 left-[20%] w-72 h-72 bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-[90px] animate-float" />
        <div className="absolute bottom-48 right-[25%] w-64 h-64 bg-gradient-to-tl from-purple-500/8 to-transparent rounded-full blur-[80px] animate-float-slow" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
        <AnimatedFeature>
          <DynamicBadge />

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] bg-clip-text text-transparent inline-block py-2.5">
              {t("hero.titleLine1")}
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#d946ef] bg-clip-text text-transparent inline-block py-2.5">
              {t("hero.titleLine2")}
            </span>
          </h1>

          <motion.div
            className="mb-14 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cards.map((item, idx) => (
                <FeatureCard key={idx} {...item} index={idx} />
              ))}
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {pills.map((item, idx) => (
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
            <div className="absolute -inset-6 bg-gradient-to-b from-amber-500/8 via-orange-500/5 to-transparent rounded-[2.5rem] blur-2xl -z-10 opacity-80" />
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-[2.5rem] blur-xl -z-10" />

            <div className="relative rounded-[2rem] border border-border/40 bg-secondary/20 p-1.5 sm:p-3 backdrop-blur-xl shadow-[0_25px_80px_-12px_rgba(0,0,0,0.15)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2rem] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

              <Image
                src={heroImage}
                alt="Resume Editor Preview"
                width={1200}
                height={800}
                className="rounded-[1.5rem] shadow-lg group-hover:scale-[1.005] transition-transform duration-700 ease-out relative z-10"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/[0.02] to-transparent rounded-b-[2rem] pointer-events-none" />
            </div>

            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-amber-400/30 rounded-tl-lg hidden lg:block" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-blue-400/30 rounded-br-lg hidden lg:block" />
          </div>
        </AnimatedFeature>
      </div>
    </section>
  );
}
