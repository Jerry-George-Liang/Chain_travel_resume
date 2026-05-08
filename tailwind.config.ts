import { subtle } from "crypto";
import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/streamdown/dist/*.js"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        serif: ["Newsreader", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        baseFont: "#212529",
        subtitleFont: "#212529",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0"
          },
          to: {
            height: "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)"
          },
          to: {
            height: "0"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        },
        "fade-out": {
          "0%": {
            opacity: "1",
            transform: "scale(1)"
          },
          "100%": {
            opacity: "0",
            transform: "scale(0.98)"
          }
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px)",
            opacity: "0.3"
          },
          "50%": {
            transform: "translateY(-30px) translateX(10px)",
            opacity: "0.6"
          }
        },
        "spin-slow": {
          "from": {
            transform: "rotate(0deg)"
          },
          "to": {
            transform: "rotate(360deg)"
          }
        },
        "spin-slow-reverse": {
          "from": {
            transform: "rotate(360deg)"
          },
          "to": {
            transform: "rotate(0deg)"
          }
        },
        "float-rotate": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)"
          },
          "33%": {
            transform: "translateY(-20px) rotate(120deg)"
          },
          "66%": {
            transform: "translateY(-10px) rotate(240deg)"
          }
        },
        "float-rotate-reverse": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)"
          },
          "33%": {
            transform: "translateY(-15px) rotate(-120deg)"
          },
          "66%": {
            transform: "translateY(-8px) rotate(-240deg)"
          }
        },
        "ping-opacity": {
          "0%": {
            transform: "scale(1)",
            opacity: "0.5"
          },
          "75%, 100%": {
            transform: "scale(2)",
            opacity: "0"
          }
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "1"
          },
          "50%": {
            opacity: "0.5"
          }
        },
        "shimmer": {
          "0%": {
            backgroundPosition: "0% center"
          },
          "100%": {
            backgroundPosition: "200% center"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-out": "fade-out 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "shimmer": "shimmer 3s linear infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate"), heroui()]
} satisfies Config;

export default config;
