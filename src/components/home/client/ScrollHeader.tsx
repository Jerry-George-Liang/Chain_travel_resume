import { useState, useEffect } from "react";
import { useScroll, motion } from "framer-motion";

interface ScrollHeaderProps {
  children: React.ReactNode;
}

export default function ScrollHeader({ children }: ScrollHeaderProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled ? "rgba(248, 249, 251, 0.75)" : "rgba(0, 0, 0, 0)",
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        boxShadow: isScrolled
          ? "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)"
          : "0 0 0 rgba(0, 0, 0, 0)",
        borderBottomColor: isScrolled ? "rgba(230, 230, 227, 0.5)" : "transparent",
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isScrolled ? "border-b" : ""
      }`}
      style={{
        borderBottomWidth: isScrolled ? "1px" : "0px",
        borderBottomStyle: "solid",
      }}
    >
      {children}
    </motion.header>
  );
}
