"use client";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/motion/aurora-text";
import { InteractiveHoverButton } from "@/components/motion/interactive-hover-button";
import { DotPattern } from "@/components/motion/dot-pattern";
import Link from "next/link";

export function ServicesBigStatement() {
  return (
    <section className="services-statement">
      {/* Background effects */}
      <div className="services-statement-glow" />
      <DotPattern
        glow
        className="opacity-30 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]"
      />

      {/* Pulsing rings */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full border border-mint/8 anim-pulse-glow" />
        <div
          className="absolute inset-10 rounded-full border border-mint/5 anim-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Statement text */}
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-[clamp(2rem,5.5vw,4.5rem)] font-light leading-[1.08] tracking-tight"
        >
          <span className="block text-foreground/80">
            We build for{" "}
            <AuroraText className="font-serif italic">those few.</AuroraText>
          </span>
        </motion.h2>

        {/* Animated separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-10 h-px w-20 origin-center bg-gradient-to-r from-transparent via-mint/50 to-transparent"
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12"
        >
          <Link href="/contact">
            <InteractiveHoverButton className="px-8 py-3 text-sm">
              Get in touch
            </InteractiveHoverButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
