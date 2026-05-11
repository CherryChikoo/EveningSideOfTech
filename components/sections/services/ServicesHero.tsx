"use client";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/motion/aurora-text";
import { servicePhases } from "@/lib/services-data";
import { ChevronUp } from "lucide-react";

interface Props {
  activePhase: string;
  onPhaseClick: (slug: string) => void;
}

export function ServicesHero({ activePhase, onPhaseClick }: Props) {
  return (
    <section className="relative pt-44 pb-12 md:pt-52 md:pb-16">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(0.4_0.12_160/0.25),transparent_70%)]" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text-fade mx-auto max-w-4xl text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight"
        >
          From Trying AI to{" "}
          <AuroraText className="font-serif italic">Trusting It.</AuroraText>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-2xl text-base text-foreground/55 md:text-lg"
        >
          We help you identify, build, and adopt AI that actually delivers —
          through real projects, real mentors, and real outcomes.
        </motion.p>

        {/* Phase Tab Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <div className="phase-tabs">
            {servicePhases.map((phase) => {
              const isActive = activePhase === phase.slug;
              return (
                <button
                  key={phase.slug}
                  onClick={() => onPhaseClick(phase.slug)}
                  className={`phase-tab ${isActive ? "active" : ""}`}
                >
                  <span className="phase-tab-number">{phase.number}.</span>
                  <span>{phase.title}</span>
                  {isActive && (
                    <motion.span
                      layoutId="phase-chevron"
                      className="phase-tab-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </section>
  );
}
