"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { ServicePhaseData } from "@/lib/services-data";
import { ServiceAccordionItem } from "./ServiceAccordionItem";
import { ServiceCaseStudies } from "./ServiceCaseStudies";
import {
  IdentifyIllustration,
  DevelopIllustration,
  AdoptIllustration,
} from "./ServiceIllustrations";

const illustrations: Record<string, React.FC> = {
  identify: IdentifyIllustration,
  develop: DevelopIllustration,
  adopt: AdoptIllustration,
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const contentVariants: Variants = {
  enter: {
    opacity: 0,
    x: 30,
    filter: "blur(6px)",
  },
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: EASE,
    },
  },
};

const illustrationVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 0.85,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: EASE,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.25,
    },
  },
};

interface Props {
  phase: ServicePhaseData;
}

export function ServicePhaseContent({ phase }: Props) {
  const Illustration = illustrations[phase.slug] ?? IdentifyIllustration;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase.slug}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {/* Content Card */}
        <div className="phase-content-card">
          <div className="grid items-start gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
            {/* Left — Illustration */}
            <motion.div
              variants={illustrationVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative mx-auto w-full max-w-[240px] lg:mx-0"
            >
              {/* Subtle glow behind */}
              <div className="absolute inset-0 -z-10 scale-[1.6] rounded-full bg-[radial-gradient(circle,oklch(0.35_0.1_160/0.1),transparent_60%)] blur-xl" />
              <Illustration />
            </motion.div>

            {/* Right — Content */}
            <motion.div variants={contentVariants}>
              {/* Phase title */}
              <div className="phase-content-title">
                <span className="phase-content-number">
                  {phase.number}.
                </span>
                <span className="phase-content-name">{phase.title}</span>
              </div>

              {/* Heading */}
              <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-snug tracking-tight text-foreground">
                {phase.heading}
              </h2>

              {/* Description */}
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-foreground/50">
                {phase.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Accordion deliverables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          {phase.deliverables.map((item, i) => (
            <ServiceAccordionItem
              key={item.title}
              title={item.title}
              description={item.description}
              index={i}
            />
          ))}
        </motion.div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ServiceCaseStudies studies={phase.caseStudies} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
