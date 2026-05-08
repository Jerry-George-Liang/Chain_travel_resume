
import { useTranslations } from "@/i18n/compat/client";
import Image from "@/lib/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, Sparkles, Shield, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedFeature from "./client/AnimatedFeature";

const features = [
  {
    icon: Sparkles,
    badge: "features.ai.badge",
    badgeColor: "bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",
    title: "features.ai.title",
    description: "features.ai.description",
    gradientFrom: "from-violet-500/8",
    gradientTo: "to-purple-500/5",
    items: [
      {
        title: "features.ai.item1",
        description: "features.ai.item1_description",
        image: "/features/svg/polish.svg",
      },
      {
        title: "features.ai.item2",
        description: "features.ai.item2_description",
        image: "/features/svg/grammar.svg",
      },
    ],
  },
  {
    icon: Shield,
    badge: "features.storage.badge",
    badgeColor: "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    title: "features.storage.title",
    description: "features.storage.description",
    gradientFrom: "from-emerald-500/8",
    gradientTo: "to-teal-500/5",
    items: [
      {
        title: "features.storage.item1",
        description: "features.storage.item1_description",
        image: "/features/svg/local-storage.svg",
      },
      {
        title: "features.storage.item2",
        description: "features.storage.item2_description",
        image: "/features/svg/export-formats.svg",
      },
      {
        title: "features.storage.item3",
        description: "features.storage.item3_description",
        image: "/features/svg/local-ai.svg",
      },
    ],
  },
] as const;

const SLIDE_DURATION = 6000;

export default function FeaturesSection() {
  const t = useTranslations("home");
  const [activeFeatures, setActiveFeatures] = useState<number[]>(
    features.map(() => 0)
  );
  const [progresses, setProgresses] = useState<number[]>(features.map(() => 0));
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>(
    features.map(() => null)
  );

  const startProgressTimer = useCallback(
    (categoryIndex: number) => {
      if (intervalRefs.current[categoryIndex]) {
        clearInterval(intervalRefs.current[categoryIndex] as NodeJS.Timeout);
      }

      const updateInterval = 50;
      const progressIncrement = (updateInterval / SLIDE_DURATION) * 100;

      intervalRefs.current[categoryIndex] = setInterval(() => {
        setProgresses((prev) => {
          const newProgresses = [...prev];
          if (newProgresses[categoryIndex] < 100) {
            newProgresses[categoryIndex] += progressIncrement;
          }
          return newProgresses;
        });
      }, updateInterval);
    },
    []
  );

  useEffect(() => {
    progresses.forEach((progress, index) => {
      if (progress >= 100) {
        setProgresses((prev) => {
          const next = [...prev];
          next[index] = 0;
          return next;
        });

        setActiveFeatures((prevActive) => {
          const next = [...prevActive];
          const max = features[index].items.length - 1;
          next[index] = next[index] < max ? next[index] + 1 : 0;
          return next;
        });
      }
    });
  }, [progresses]);

  useEffect(() => {
    features.forEach((_, index) => startProgressTimer(index));
    return () => {
      intervalRefs.current.forEach((ref) => {
        if (ref) clearInterval(ref);
      });
    };
  }, [startProgressTimer]);

  const handleSlideChange = (categoryIndex: number, featureIndex: number) => {
    setActiveFeatures((prev) => {
      const next = [...prev];
      next[categoryIndex] = featureIndex;
      return next;
    });
    setProgresses((prev) => {
      const next = [...prev];
      next[categoryIndex] = 0;
      return next;
    });
    startProgressTimer(categoryIndex);
  };

  return (
    <section className="py-28 md:py-44 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-amber-500/[0.03] to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-gradient-to-tl from-blue-500/[0.03] to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <AnimatedFeature>
          <div className="text-center mb-24 md:mb-36">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-foreground/90 mb-6">
              {t("features.title")}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/30" />
              <div className="w-2 h-2 rounded-full bg-primary/30" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-primary/30" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/30" />
            </div>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
              {t("features.subtitle")}
            </p>
          </div>
        </AnimatedFeature>

        <div className="space-y-48 md:space-y-56">
          {features.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`flex flex-col gap-16 lg:gap-28 items-center ${
                catIndex % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Text Side */}
              <div className="w-full lg:w-5/12 space-y-10">
                <AnimatedFeature delay={0.1}>
                  <div className="space-y-7">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold ${category.badgeColor} backdrop-blur-sm`}>
                      <category.icon className="w-4 h-4" />
                      {t(category.badge)}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-foreground/90 leading-tight">
                      {t(category.title)}
                    </h3>
                    <p className="text-lg text-muted-foreground/90 leading-relaxed font-light">
                      {t(category.description)}
                    </p>
                  </div>
                </AnimatedFeature>

                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => handleSlideChange(catIndex, itemIndex)}
                      className={`w-full text-left group p-5 rounded-2xl transition-all duration-300 relative border ${
                        activeFeatures[catIndex] === itemIndex
                          ? "bg-secondary/80 border-border/60 shadow-lg shadow-primary/[0.04]"
                          : "bg-transparent border-border/20 hover:bg-secondary/40 hover:border-border/40"
                      }`}
                    >
                      {/* Progress Bar - more refined */}
                      {activeFeatures[catIndex] === itemIndex && (
                        <div
                          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/50 via-primary/70 to-primary/50 transition-all duration-75 ease-linear rounded-full"
                          style={{ width: `${progresses[catIndex]}%` }}
                        />
                      )}

                      <div className="flex items-start justify-between">
                        <div className="space-y-1.5 flex-1">
                          <h4 className={`font-semibold transition-all duration-300 ${
                            activeFeatures[catIndex] === itemIndex ? "text-foreground" : "text-foreground/60"
                          }`}>
                            {t(item.title)}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1 leading-relaxed">
                            {t(item.description)}
                          </p>
                        </div>
                        <ChevronRight className={`w-5 h-5 transition-all duration-300 flex-shrink-0 ml-3 mt-0.5 ${
                          activeFeatures[catIndex] === itemIndex ? "text-primary translate-x-0.5 opacity-100" : "text-muted-foreground/25 opacity-50"
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Side */}
              <div className="w-full lg:w-7/12">
                <AnimatedFeature key={`${catIndex}-${activeFeatures[catIndex]}`} delay={0.2}>
                  <motion.div
                    className={`relative aspect-[16/10] rounded-3xl border border-border/40 p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] backdrop-blur-sm group overflow-hidden bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo}`}
                    style={{ willChange: "transform" }}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      y: -12,
                      scale: 1.02,
                      boxShadow: "0_30px_80px_-15px_rgba(0,0,0,0.15), 0_0_40px rgba(139,92,246,0.1)",
                    }}
                  >
                    {/* Animated glow ring */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${category.hoverGlow || 'rgba(139,92,246,0.15)'} 0%, transparent 50%, ${category.hoverGlow2 || 'rgba(59,130,246,0.1)'} 100%)`,
                      }}
                      animate={{
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none" />

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/[0.02] to-transparent rounded-bl-full" />

                    {/* Floating image container */}
                    <motion.div
                      className="relative w-full h-full"
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    >
                      <Image
                        src={category.items[activeFeatures[catIndex]].image}
                        alt={t(category.items[activeFeatures[catIndex]].title)}
                        fill
                        className="object-contain drop-shadow-sm"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </motion.div>

                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                    </motion.div>

                    {/* Bottom reflection */}
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-foreground/[0.015] to-transparent rounded-b-3xl pointer-events-none" />

                    {/* Ambient light spots */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-violet-400/10 to-transparent rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </AnimatedFeature>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
