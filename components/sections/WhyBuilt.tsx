import { motion } from "framer-motion";
import Link from "next/link";
import { AuroraText } from "@/components/motion/aurora-text";
import { InteractiveHoverButton } from "@/components/motion/interactive-hover-button";

export function WhyBuilt() {
  return (
    <section className="relative isolate overflow-hidden py-32 md:py-48">
      {/* Background effects */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[80%] bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,oklch(0.4_0.15_160/0.5),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-mint/40 to-transparent" />

      {/* Decorative orbs */}
      <div className="orb orb-mint absolute -left-20 bottom-20 h-[180px] w-[180px] anim-float-slow" />
      <div className="orb orb-teal absolute -right-10 top-20 h-[140px] w-[140px] anim-float-alt" />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-[clamp(2.1rem,6vw,5.2rem)] font-light leading-[1.03] tracking-tight"
        >
          That's why we built <AuroraText className="font-serif italic">EveningSideOfTech.</AuroraText>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-14 space-y-7 text-balance"
        >
          <p className="text-[1.65rem] font-medium md:text-[2rem]">
            AI careers that actually move the needle.
          </p>
          <p className="mx-auto max-w-2xl text-[1.05rem] leading-relaxed text-foreground/68 md:text-[1.2rem]">
            EveningSideOfTech gives you real projects, real mentors, and real deadlines — so when you graduate, you have a portfolio, not a playlist of lectures.
          </p>
          <p className="text-[1.05rem] text-foreground/80 md:text-[1.2rem]">
            Stop collecting certificates. <span className="font-semibold text-foreground">Start building things that work.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16"
        >
          <Link href="/internships">
            <InteractiveHoverButton>Explore internships</InteractiveHoverButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
