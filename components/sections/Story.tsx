import { motion } from "framer-motion";

const beats = [
  {
    text: "You want to break into AI — not just learn theory, but build production systems.",
    highlight: "build production systems",
  },
  {
    text: "But most internships hand you tutorials, not real projects. Most mentors are absent. Most certificates don't mean anything.",
    highlight: "don't mean anything",
  },
  {
    text: "You're not behind. You just haven't found the right launchpad yet.",
    highlight: "the right launchpad",
  },
  {
    text: "That's exactly why we built this.",
    highlight: "we built this",
  },
];

export function Story() {
  return (
    <section className="relative bg-background">
      {/* Subtle connecting line */}
      <div className="absolute left-1/2 top-0 -z-10 h-full w-px bg-gradient-to-b from-transparent via-mint/15 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        {beats.map((item, i) => (
          <Beat key={i} text={item.text} highlight={item.highlight} index={i} />
        ))}
      </div>
    </section>
  );
}

function Beat({ text, highlight, index }: { text: string; highlight: string; index: number }) {
  const parts = text.split(highlight);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.7 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="flex min-h-[72svh] snap-start items-center justify-center text-balance text-center md:min-h-[78svh]"
    >
      <div className="relative">
        {/* Faint glow behind text */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[200px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/5 blur-[80px]" />

        <p className="mx-auto max-w-4xl text-[clamp(1.75rem,3.8vw,3.2rem)] font-medium leading-[1.2] tracking-tight text-foreground/85">
          {parts[0]}
          <span className="gradient-text-mint">{highlight}</span>
          {parts[1]}
        </p>

        {/* Subtle beat indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 h-px w-12 origin-center bg-mint/30"
        />
      </div>
    </motion.div>
  );
}
