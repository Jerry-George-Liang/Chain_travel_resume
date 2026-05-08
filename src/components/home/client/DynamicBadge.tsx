"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Brain, Shield, Download, Server } from "lucide-react";

interface BadgeItem {
  icon: React.ElementType;
  text: string;
  color: string;
  glowColor: string;
}

const BADGE_ITEMS: BadgeItem[] = [
  { icon: Sparkles, text: "免费简历制作", color: "text-amber-500", glowColor: "bg-amber-400/30" },
  { icon: Brain, text: "AI 智能润色", color: "text-violet-500", glowColor: "bg-violet-400/30" },
  { icon: Shield, text: "本地隐私安全", color: "text-emerald-500", glowColor: "bg-emerald-400/30" },
  { icon: Download, text: "一键导出 PDF", color: "text-blue-500", glowColor: "bg-blue-400/30" },
  { icon: Server, text: "支持本地 AI", color: "text-orange-500", glowColor: "bg-orange-400/30" },
];

export default function DynamicBadge() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const charIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);
  const fullTextRef = useRef(BADGE_ITEMS[0].text);

  const currentItem = BADGE_ITEMS[currentIndex];
  fullTextRef.current = currentItem.text;

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setDisplayText("");
      charIndexRef.current = 0;
      setIsDeleting(false);
    }

    const startTyping = () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const currentFullText = fullTextRef.current;

        if (!isDeleting) {
          if (charIndexRef.current < currentFullText.length) {
            charIndexRef.current++;
            setDisplayText(currentFullText.slice(0, charIndexRef.current));
            startTyping();
          } else {
            timerRef.current = setTimeout(() => {
              setIsDeleting(true);
              startTyping();
            }, 2000);
          }
        } else {
          if (charIndexRef.current > 0) {
            charIndexRef.current--;
            setDisplayText(currentFullText.slice(0, charIndexRef.current));
            startTyping();
          } else {
            setIsDeleting(false);
            const nextIndex = (currentIndex + 1) % BADGE_ITEMS.length;
            setCurrentIndex(nextIndex);
            fullTextRef.current = BADGE_ITEMS[nextIndex].text;
            charIndexRef.current = 0;
            setDisplayText("");

            timerRef.current = setTimeout(() => {
              startTyping();
            }, 100);
          }
        }
      }, isDeleting ? 50 : 100);
    };

    if (!isPaused) {
      startTyping();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, isDeleting, isPaused]);

  const IconComponent = currentItem.icon;

  return (
    <div
      className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-primary/5 via-primary/[0.03] to-primary/5 border border-primary/10 backdrop-blur-md mb-10 group hover:border-primary/20 transition-all duration-500 cursor-default"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex items-center justify-center w-4 h-4">
        <IconComponent
          className={`w-4 h-4 ${currentItem.color} transition-all duration-300 ${
            !isDeleting ? "scale-110" : "scale-95"
          }`}
        />
        <div
          className={`absolute inset-0 ${currentItem.glowColor} rounded-full blur-sm animate-pulse transition-colors duration-300 ${
            !isDeleting ? "opacity-100" : "opacity-40"
          }`}
        />
      </div>

      <span
        className={`text-sm font-medium tracking-wide text-foreground/80 min-w-[120px] inline-block transition-all duration-200 ${
          isDeleting ? "opacity-70" : "opacity-100"
        }`}
      >
        {displayText}
        {charIndexRef.current > 0 && (
          <span
            className={`inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle ${
              !isDeleting && charIndexRef.current === fullTextRef.current.length ? "animate-blink" : ""
            }`}
            style={{ verticalAlign: "text-bottom" }}
          />
        )}
      </span>

      <div className="flex items-center gap-1">
        {BADGE_ITEMS.map((_, idx) => (
          <div
            key={idx}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-primary scale-125" : "bg-primary/20"
            }`}
            style={{ transitionDelay: `${idx * 30}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
