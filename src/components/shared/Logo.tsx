import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "light" | "dark";
}

const Logo: React.FC<LogoProps> = ({
  size = 100,
  className = "",
  onClick,
  variant = "default",
}) => {
  const viewBoxSize = 100;

  const colorSchemes = {
    default: {
      primary: "#1e293b",
      secondary: "#f59e0b",
      accent: "#3b82f6",
      glow: "rgba(245, 158, 11, 0.15)",
    },
    light: {
      primary: "#0f172a",
      secondary: "#d97706",
      accent: "#2563eb",
      glow: "rgba(217, 119, 6, 0.12)",
    },
    dark: {
      primary: "#f8fafc",
      secondary: "#fbbf24",
      accent: "#60a5fa",
      glow: "rgba(251, 191, 36, 0.2)",
    },
  };

  const colors = colorSchemes[variant];

  return (
    <motion.div
      className={`relative inline-block group cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`logoGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.accent} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>

          <filter id={`glow-${variant}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <clipPath id={`documentClip-${variant}`}>
            <rect x="20" y="15" width="60" height="70" rx="5" ry="5" />
          </clipPath>
        </defs>

        {/* Background circle with subtle gradient */}
        <motion.circle
          cx="50"
          cy="50"
          r="48"
          fill={`url(#logoGradient-${variant})`}
          opacity={0.08}
          animate={{
            opacity: [0.08, 0.12, 0.08],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main document shape */}
        <g>
          {/* Document body */}
          <rect
            x="22"
            y="17"
            width="56"
            height="66"
            rx="6"
            ry="6"
            fill="white"
            stroke={colors.primary}
            strokeWidth="2.5"
          />

          {/* Folded corner */}
          <path
            d="M 68 17 L 78 27 L 68 27 Z"
            fill="#e2e8f0"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Content lines representing resume sections */}
          <g clipPath={`url(#documentClip-${variant})`}>
            {/* Header line (name) */}
            <motion.rect
              x="30"
              y="28"
              width="32"
              height="4"
              rx="2"
              fill={colors.primary}
              opacity={0.9}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />

            {/* Subtitle line (title) */}
            <motion.rect
              x="30"
              y="38"
              width="24"
              height="3"
              rx="1.5"
              fill={colors.primary}
              opacity={0.5}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            {/* Section dividers and content */}
            <motion.rect
              x="30"
              y="50"
              width="40"
              height="2.5"
              rx="1.25"
              fill={colors.accent}
              opacity={0.7}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            <motion.rect
              x="30"
              y="58"
              width="36"
              height="2"
              rx="1"
              fill={colors.primary}
              opacity={0.35}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.35, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.rect
              x="30"
              y="64"
              width="40"
              height="2"
              rx="1"
              fill={colors.primary}
              opacity={0.35}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.35, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
            <motion.rect
              x="30"
              y="70"
              width="28"
              height="2"
              rx="1"
              fill={colors.primary}
              opacity={0.35}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.35, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />

            {/* AI sparkle element (top right) */}
            <g filter={`url(#glow-${variant})`}>
              <motion.path
                d="M 66 33 L 67 36 L 70 37 L 67 38 L 66 41 L 65 38 L 62 37 L 65 36 Z"
                fill={colors.secondary}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "66px 37px" }}
              />
              <circle cx="66" cy="37" r="1.5" fill="white" opacity="0.8" />
            </g>

            {/* Connecting dots (representing "link/journey") */}
            <g opacity="0.6">
              <circle cx="34" cy="51" r="1.5" fill={colors.secondary} />
              <circle cx="50" cy="51" r="1.5" fill={colors.secondary} />
              <circle cx="66" cy="51" r="1.5" fill={colors.secondary} />
            </g>
          </g>
        </g>

        {/* Outer ring decoration */}
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={colors.primary}
          strokeWidth="1"
          opacity={0.15}
          strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "50px 50px" }}
        />
      </svg>

      {/* Hover glow effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colors.glow}, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default Logo;
