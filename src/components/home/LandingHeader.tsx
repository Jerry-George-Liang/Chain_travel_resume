
import { useState } from "react";
import { usePathname } from "@/lib/navigation";
import { useTranslations } from "@/i18n/compat/client";
import { Menu, Moon, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import LanguageSwitch from "@/components/shared/LanguageSwitch";
import { GitHubStars } from "@/components/shared/GitHubStars";
import ScrollHeader from "./client/ScrollHeader";
import MobileMenu from "./client/MobileMenu";
import GoDashboard from "./GoDashboard";

export default function LandingHeader() {
  const t = useTranslations("home");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <ScrollHeader>
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex items-center justify-between h-20">
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => (window.location.href = `/${locale}/`)}
            >
              <div className="relative">
                <Logo size={60} />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="font-serif text-[24px] tracking-tight font-bold ml-2 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent group-hover:from-violet-400 group-hover:via-purple-400 group-hover:to-cyan-300 transition-all duration-300">
                {t("header.title")}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/50 border border-border/30">
                <LanguageSwitch />
                <div className="w-px h-4 bg-border/40" />
                <ThemeToggle>
                  <div className="w-8 h-8 relative cursor-pointer rounded-lg hover:bg-accent/80 flex items-center justify-center transition-all duration-300">
                    <Sun className="h-[1.05rem] w-[1.05rem] absolute inset-0 m-auto rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                    <Moon className="h-[1.05rem] w-[1.05rem] absolute inset-0 m-auto rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
                  </div>
                </ThemeToggle>
              </div>

              <GitHubStars />

              <GoDashboard>
                <Button
                  className="rounded-xl px-6 h-10 font-medium transition-all duration-300 hover:opacity-90 active:scale-[0.97] shadow-md hover:shadow-lg shadow-primary/10"
                >
                  {t("header.startButton")}
                </Button>
              </GoDashboard>
            </div>

            <button
              className="md:hidden p-2.5 hover:bg-accent rounded-xl transition-all duration-200 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </ScrollHeader>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        buttonText={t("header.startButton")}
      />
    </>
  );
}
