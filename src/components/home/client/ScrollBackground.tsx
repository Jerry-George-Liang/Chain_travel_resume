import { motion, useScroll } from "framer-motion";

export default function ScrollBackground() {
  const { scrollY } = useScroll();

  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-background to-background" />

      {/* Enhanced gradient orbs with more color variety */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/10 via-orange-500/6 to-transparent rounded-full blur-[100px] opacity-60 md:opacity-100" />
      <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-gradient-to-bl from-blue-500/8 via-indigo-500/5 to-transparent rounded-full blur-[90px] opacity-60 md:opacity-100" />
      <div className="absolute top-1/3 left-[5%] w-[350px] h-[350px] bg-gradient-to-tr from-emerald-500/6 to-transparent rounded-full blur-[80px] opacity-40 md:opacity-70 hidden md:block" />
      <div className="absolute top-1/2 right-[8%] w-[400px] h-[400px] bg-gradient-to-tl from-violet-500/5 via-purple-500/3 to-transparent rounded-full blur-[85px] opacity-30 md:opacity-60 hidden md:block" />

      {/* Center ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-primary/[0.03] via-blue-500/[0.02] to-purple-500/[0.02] rounded-full blur-[100px]"
        style={{
          opacity: 0.4,
        }}
      />

      {/* Subtle noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.012] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
}
