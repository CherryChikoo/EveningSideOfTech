import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 48, suffix: "+", label: "interns placed across teams" },
  { value: 11, suffix: "+", label: "industries covered" },
  { value: 96, suffix: "%", label: "completion rate" },
  { value: 4, suffix: "", label: "focused internship tracks" },
  { value: 12, suffix: "wk", label: "average track duration" },
];

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <div ref={ref} className="gradient-text-mint font-display text-5xl font-light tracking-tight md:text-6xl lg:text-7xl">
      {count}
      {suffix}
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative py-32 md:py-40">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,oklch(0.3_0.1_160/0.2),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50"
        >
          By the numbers
        </motion.p>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`stat-glass text-center ${
                /* Last item spans full width on 2-col mobile layout */
                i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              {/* Decorative corner accent */}
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-mint/20" />

              <AnimatedCounter value={s.value} suffix={s.suffix} />
              <div className="mt-4 text-sm text-foreground/60 md:text-base">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
