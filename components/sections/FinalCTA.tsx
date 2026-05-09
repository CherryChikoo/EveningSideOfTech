import { motion } from "framer-motion";
import { AuroraText } from "@/components/motion/aurora-text";
import { InteractiveHoverButton } from "@/components/motion/interactive-hover-button";
import { DotPattern } from "@/components/motion/dot-pattern";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden py-32">
      <DotPattern
        glow
        className="opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,oklch(0.35_0.13_160/0.45),transparent_70%)]" />

      {/* Floating orbs */}
      <div className="orb orb-mint absolute left-[20%] top-[30%] h-[180px] w-[180px] anim-float-slow" />
      <div className="orb orb-teal absolute right-[25%] bottom-[25%] h-[140px] w-[140px] anim-float-alt" />

      {/* Pulsing border ring */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full border border-mint/10 anim-pulse-glow" />
        <div className="absolute inset-8 rounded-full border border-mint/6 anim-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1] tracking-tight"
        >
          Ready to{" "}
          <AuroraText className="font-serif italic">build?</AuroraText>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto mt-8 max-w-xl text-lg text-foreground/70"
        >
          Choose your track, complete your application, and start building
          production AI systems with mentors who've shipped before.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 inline-flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/internships">
            <InteractiveHoverButton className="px-8 py-3 text-sm">
              Explore internships
            </InteractiveHoverButton>
          </Link>
          <Link href="/contact" className="btn-pill">
            Talk to us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
