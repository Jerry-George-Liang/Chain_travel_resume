"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "@/i18n/compat/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedFeature from "./client/AnimatedFeature";

interface FAQItemProps {
  item: { question: string; answer: string };
  index: number;
}

function FAQItem({ item, index }: FAQItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXVal = ((y - centerY) / centerY) * -8;
    const rotateYVal = ((x - centerX) / centerX) * 8;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);

    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease-out',
        }}
      >
        <AccordionItem
          value={`item-${index}`}
          className="relative bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden border border-white/50 shadow-lg shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/[0.08] transition-all duration-300 group-data-[state=open]:border-primary/20 group-data-[state=open]:shadow-xl group-data-[state=open]:shadow-primary/10"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(251, 191, 36, 0.08), transparent 60%)`
              : 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/0 via-transparent to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 group-data-[state=open]:from-amber-500/5 group-data-[state=open]:to-orange-500/5" />
          </div>

          <AccordionTrigger className="text-left py-6 px-7 hover:no-underline transition-all duration-300 group relative z-10">
            <div className="flex items-center gap-5 flex-1">
              {/* Animated number badge with rotation */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/5 to-primary/[0.02] border border-primary/10 flex items-center justify-center group-hover:from-amber-500/10 group-hover:to-orange-500/5 group-hover:border-amber-500/30 group-data-[state=open]:from-amber-500/15 group-data-[state=open]:to-orange-500/10 group-data-[state=open]:border-amber-500/40 transition-all duration-500 overflow-hidden">
                  {/* Rotating background circle */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100"
                    style={{ animation: 'spin-slow 3s linear infinite' }}
                  />

                  <span className="text-primary/60 font-mono font-bold text-base group-hover:text-amber-600 group-data-[state=open]:text-amber-700 relative z-10 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Pulsing ring on hover */}
                <div
                  className="absolute -inset-1 rounded-xl border-2 border-amber-400/0 group-hover:border-amber-400/30 group-data-[state=open]:border-amber-400/40 transition-all duration-500"
                  style={{ animation: 'ping-opacity 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                />
              </div>

              {/* Question text with gradient effect */}
              <span className="pr-4 text-foreground/85 group-hover:text-foreground group-data-[state=open]:text-foreground text-base md:text-lg font-medium transition-colors duration-300 flex-1 leading-relaxed">
                {item.question}
              </span>

              {/* Custom rotating chevron icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down h-4 w-4 shrink-0 text-muted-foreground/50 transition-all duration-500 group-data-[state=open]:rotate-180 group-data-[state=open]:text-amber-600 group-hover:text-amber-600/80 group-hover:rotate-12"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </AccordionTrigger>

          <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-6 px-7 pt-0 font-light">
            <div className="pl-[4.5rem] relative">
              {/* Decorative line with animation */}
              <div className="absolute left-[3.35rem] top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent">
                <div
                  className="w-full h-1/2 bg-amber-500/40"
                  style={{ animation: 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                />
              </div>

              <div className="pt-2 space-y-2">
                {item.answer}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const t = useTranslations("home.faq");
  const faqItems = t.raw("items");

  return (
    <section className="py-28 md:py-44 bg-background relative overflow-hidden">
      {/* Animated geometric background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large rotating gradient orbs */}
        <div
          className="absolute top-[10%] right-[5%] w-[450px] h-[450px] bg-gradient-to-br from-amber-500/[0.06] via-orange-500/[0.03] to-transparent rounded-full blur-[100px]"
          style={{ animation: 'spin-slow 20s linear infinite' }}
        />
        <div
          className="absolute bottom-[15%] left-[8%] w-[380px] h-[380px] bg-gradient-to-tr from-blue-500/[0.04] via-indigo-500/[0.02] to-transparent rounded-full blur-[90px]"
          style={{ animation: 'spin-slow-reverse 25s linear infinite' }}
        />

        {/* Floating geometric shapes */}
        <div
          className="absolute top-[20%] left-[15%] w-16 h-16 border-2 border-amber-500/10 rounded-full"
          style={{ animation: 'float-rotate 15s ease-in-out infinite' }}
        >
          <div
            className="absolute inset-2 border border-amber-500/10 rounded-full"
            style={{ animation: 'ping-opacity 3s cubic-bezier(0, 0, 0.2, 1) infinite' }}
          />
        </div>

        <div
          className="absolute bottom-[25%] right-[18%] w-20 h-20 border-2 border-blue-500/10 rounded-2xl"
          style={{ animation: 'float-rotate-reverse 18s ease-in-out infinite', transform: 'rotate(45deg)' }}
        />

        <div
          className="absolute top-[55%] left-[8%] w-12 h-12 border-2 border-emerald-500/10 rounded-lg"
          style={{ animation: 'float-rotate 22s ease-in-out infinite', transform: 'rotate(15deg)' }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(27, 27, 24, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Animated dots pattern - 使用确定性伪随机值避免 Hydration 不匹配 */}
        {[...Array(15)].map((_, i) => {
          const seed = (i * 9301 + 49297) % 233280;
          const normalizedSeed = seed / 233280;
          const leftSeed = ((i * 7919 + 1) % 100) / 100;
          const topSeed = ((i * 104729 + 7) % 100) / 100;
          const durationSeed = ((i * 3571 + 3) % 10);
          const delaySeed = ((i * 63689 + 11) % 50) / 10;

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/[0.08] rounded-full"
              style={{
                left: `${leftSeed * 100}%`,
                top: `${topSeed * 100}%`,
                animation: `float ${10 + durationSeed}s ease-in-out infinite`,
                animationDelay: `${delaySeed}s`
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Header section with enhanced typography */}
        <AnimatedFeature>
          <div className="text-center mb-20 md:mb-28">
            {/* Section label with icon */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/[0.03] border border-primary/10 backdrop-blur-sm mb-8 group hover:bg-primary/[0.05] hover:border-primary/20 transition-all duration-500">
              <div className="relative">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <div
                  className="absolute inset-0 bg-amber-400/40 rounded-full blur-sm"
                  style={{ animation: 'ping-opacity 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                />
              </div>
              <span className="text-sm font-semibold tracking-widest uppercase text-foreground/70">FAQ</span>
              <div className="w-8 h-px bg-gradient-to-r from-primary/20 to-transparent" />
            </div>

            {/* Main title with gradient effect */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent inline-block py-[7px]">
                {t("title")}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
              关于链途Resume的常见问题解答
            </p>

            {/* Enhanced decorative divider */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-border" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/30 border border-amber-500/40" />
                <div className="w-8 h-px bg-gradient-to-r from-amber-500/20 to-amber-500/40" />
                <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/30 border border-amber-500/40" />
              </div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent via-border to-border" />
            </div>
          </div>
        </AnimatedFeature>

        {/* FAQ Items with 3D effects */}
        <AnimatedFeature delay={0.15}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map(
              (item: { question: string; answer: string }, index: number) => (
                <AnimatedFeature key={index} delay={index * 0.08}>
                  <FAQItem item={item} index={index} />
                </AnimatedFeature>
              )
            )}
          </Accordion>
        </AnimatedFeature>
      </div>
    </section>
  );
}
