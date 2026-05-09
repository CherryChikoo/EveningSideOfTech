import { motion } from "framer-motion";
import { AuroraText } from "@/components/motion/aurora-text";
import { DotPattern } from "@/components/motion/dot-pattern";
import { InteractiveHoverButton } from "@/components/motion/interactive-hover-button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden pt-32">
      <DotPattern glow className="mask-[radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <div className="absolute inset-0 radial-glow" />

      {/* Animated orbs */}
      <div className="orb orb-mint absolute left-[15%] top-[20%] h-[300px] w-[300px] anim-float-slow" />
      <div className="orb orb-teal absolute right-[10%] top-[35%] h-[200px] w-[200px] anim-float-alt" />
      <div className="orb orb-emerald absolute left-[50%] top-[60%] h-[250px] w-[250px] -translate-x-1/2 anim-float" />

      {/* Main glow */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-mint/10 blur-[100px] anim-pulse-glow" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-20 bg-linear-to-b from-transparent to-background" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-mint backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          Now accepting applications
        </motion.div>

        <motion.h1
          className="text-balance text-[clamp(2.5rem,8vw,7rem)] font-light leading-[0.95] tracking-tight"
          initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-foreground">Build real AI systems.</span>
          <span className="block">
            <AuroraText className="font-serif italic">Not demo projects.</AuroraText>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-2xl text-balance text-lg text-foreground/70 md:text-xl"
        >
          Premium internship tracks designed for operators, builders, and high-agency talent. Learn by doing — alongside teams shipping production AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/internships">
            <InteractiveHoverButton>Explore internships</InteractiveHoverButton>
          </Link>
          <Link
            href="/contact"
            className="btn-pill"
          >
            Get in touch
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-28 w-full"
        >
          <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
            Trusted by teams at
          </p>
          <Marquee />
        </motion.div>
      </div>
    </section>
  );
}

const logos = [
  { name: "SYDNEY", icon: "◆" },
  { name: "ASHCROFT", icon: "▲" },
  { name: "NEXARA", icon: "●" },
  { name: "VOLTIQ", icon: "⬡" },
  { name: "MERIDIAN", icon: "✦" },
  { name: "HELIX", icon: "◎" },
  { name: "ORBITAL", icon: "◇" },
  { name: "FIELDSTONE", icon: "□" },
  { name: "PARAGON", icon: "△" },
  { name: "AURORA", icon: "○" },
];

function Marquee() {
  const row = [...logos, ...logos];
  return (
    <div className="relative z-10 overflow-hidden rounded-2xl border border-border/30 bg-background/25 py-5 backdrop-blur-sm">
      {/* Fade edges — clean gradient masking, no dark overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-background/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-background/90 to-transparent" />

      <div className="marquee flex w-max items-center gap-16 whitespace-nowrap">
        {row.map((l, i) => (
          <div
            key={i}
            className="flex items-center gap-3 transition-opacity hover:opacity-100"
          >
            <span className="text-lg text-mint/60">{l.icon}</span>
            <span className="font-mono text-sm font-medium uppercase tracking-[0.25em] text-foreground/55">
              {l.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
