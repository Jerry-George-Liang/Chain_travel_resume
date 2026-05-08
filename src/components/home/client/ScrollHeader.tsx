import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll } from "framer-motion";

interface ScrollHeaderProps {
  children: React.ReactNode;
}

export default function ScrollHeader({ children }: ScrollHeaderProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const isVisibleRef = useRef(true);
  const scrollDirectionRef = useRef<"up" | "down" | null>(null);
  const lastScrollTime = useRef(0);
  const SCROLL_THRESHOLD = 20;
  const DIRECTION_LOCK_TIME = 350;
  const HIDE_THRESHOLD = 80;
  const accumulatedScroll = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateScrollDirection = useCallback((latest: number, timestamp: number) => {
    const scrollDiff = latest - lastScrollY.current;
    const isAtTop = latest < 10;

    if (isAtTop) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      if (!isVisibleRef.current) {
        setIsVisible(true);
        isVisibleRef.current = true;
      }
      setIsScrolled(false);
      scrollDirectionRef.current = null;
      accumulatedScroll.current = 0;
    } else {
      if (!isScrolled) {
        setIsScrolled(true);
      }

      if (Math.abs(scrollDiff) > SCROLL_THRESHOLD) {
        const timeSinceLastScroll = timestamp - lastScrollTime.current;
        const newDirection = scrollDiff > 0 ? "down" : "up";

        if (timeSinceLastScroll > DIRECTION_LOCK_TIME || scrollDirectionRef.current !== newDirection) {
          if (newDirection === "down") {
            accumulatedScroll.current += Math.abs(scrollDiff);

            if (accumulatedScroll.current >= HIDE_THRESHOLD && isVisibleRef.current) {
              if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
              }

              hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                isVisibleRef.current = false;
              }, 150);
            }
          } else if (newDirection === "up" && !isVisibleRef.current) {
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
              hideTimeoutRef.current = null;
            }
            accumulatedScroll.current = 0;
            setIsVisible(true);
            isVisibleRef.current = true;
          }

          scrollDirectionRef.current = newDirection;
        }
      }
    }

    lastScrollY.current = latest;
    lastScrollTime.current = timestamp;
    ticking.current = false;
  }, [isScrolled]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest: number) => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame((timestamp: number) =>
          updateScrollDirection(latest, timestamp)
        );
      }
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [scrollY, updateScrollDirection]);

  return (
    <motion.header
      initial={false}
      animate={{
        y: isVisible ? 0 : -100,
        backgroundColor: isScrolled ? "rgba(248, 249, 251, 0.85)" : "rgba(0, 0, 0, 0)",
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        boxShadow: isScrolled && isVisible
          ? "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)"
          : "0 0 0 rgba(0, 0, 0, 0)",
        borderBottomColor: isScrolled ? "rgba(230, 230, 227, 0.5)" : "transparent",
      }}
      transition={{
        y: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
        backgroundColor: { duration: 0.15 },
        backdropFilter: { duration: 0.15 },
        boxShadow: { duration: 0.15 },
        borderBottomColor: { duration: 0.15 },
      }}
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled ? "border-b" : ""
      }`}
      style={{
        borderBottomWidth: isScrolled ? "1px" : "0px",
        borderBottomStyle: "solid",
        willChange: "transform, background-color, backdrop-filter",
      }}
    >
      {children}
    </motion.header>
  );
}
