import { motion } from "framer-motion";
import { AuroraText } from "@/components/motion/aurora-text";

export function BigStatement() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden py-32">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,oklch(0.3_0.12_160/0.4),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />

      {/* Floating orbs */}
      <div className="orb orb-mint absolute left-[10%] top-[25%] h-[200px] w-[200px] anim-float-slow" />
      <div className="orb orb-teal absolute right-[15%] bottom-[20%] h-[160px] w-[160px] anim-float-alt" />
      <div className="orb orb-emerald absolute left-[60%] top-[15%] h-[120px] w-[120px] anim-float" />

      {/* Decorative ring */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full border border-mint/5 anim-spin-slow" />
        <div className="absolute inset-6 rounded-full border border-mint/8 anim-spin-slow" style={{ animationDirection: "reverse", animationDuration: "45s" }} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-[clamp(2rem,5.8vw,4.7rem)] font-light leading-[1.08] tracking-tight"
        >
          <span className="block text-foreground/90">
            AI is the career of the decade.
          </span>
          <span className="block">
            <AuroraText className="font-serif italic">
              Most people will wait. You won't.
            </AuroraText>
          </span>
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 text-balance text-[clamp(1.95rem,5.1vw,4.2rem)] font-light leading-[1.13] tracking-tight"
        >
          We build for{" "}
          <AuroraText className="font-serif italic">the builders.</AuroraText>
        </motion.h3>

        {/* Animated line separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 h-px w-24 origin-center bg-gradient-to-r from-transparent via-mint/50 to-transparent"
        />
      </div>
    </section>
  );
}
