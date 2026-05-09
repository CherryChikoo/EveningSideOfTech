import { motion } from "framer-motion";
import { AuroraText } from "@/components/motion/aurora-text";

const quotes = [
  {
    text: "In just nine weeks, **EveningSideOfTech matched me with a project that pushed every skill I had.** They didn't hand me tutorials — they gave me production systems, real deadlines, and mentors who actually showed up.",
    name: "Marita",
    org: "AI PRODUCT ANALYST TRACK",
    initials: "MA",
  },
  {
    text: "EveningSideOfTech's engineering track felt like joining a real startup team. **I shipped code to production in week two.** The portfolio I walked away with opened doors that three years of coursework couldn't.",
    name: "Josh",
    org: "AI AUTOMATION ENGINEER TRACK",
    initials: "JO",
  },
];

export function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden py-32 md:py-48">
      <Blueprint />

      {/* Decorative orbs */}
      <div className="orb orb-mint absolute -right-20 top-[30%] h-[200px] w-[200px] anim-float-slow" />
      <div className="orb orb-emerald absolute -left-16 bottom-[20%] h-[160px] w-[160px] anim-float-alt" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-balance text-[clamp(2rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight md:mb-32"
        >
          Don't just take our{" "}
          <AuroraText className="font-serif italic">word for it…</AuroraText>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {quotes.map((q, i) => (
            <Quote key={i} {...q} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Quote({
  text,
  name,
  org,
  initials,
  delay,
}: {
  text: string;
  name: string;
  org: string;
  initials: string;
  delay: number;
}) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return (
    <motion.figure
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group card-mint-hover rounded-3xl p-7 md:p-10"
    >
      {/* Decorative quote mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 font-serif text-5xl leading-none text-mint/30"
      >
        "
      </motion.div>

      <blockquote className="text-balance text-[1.05rem] leading-relaxed text-foreground/68 md:text-[1.2rem]">
        {parts.map((p, i) =>
          p.startsWith("**") ? (
            <span key={i} className="text-mint">
              {p.slice(2, -2)}
            </span>
          ) : (
            <span key={i}>{p}</span>
          ),
        )}
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4">
        {/* Avatar circle */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-mint/30 bg-mint/10 font-mono text-sm font-medium text-mint transition-all duration-500 group-hover:border-mint/60 group-hover:shadow-[0_0_20px_-5px_var(--mint-glow)]">
          {initials}
        </div>
        <div>
          <div className="text-lg font-medium">{name}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
            {org}
          </div>
        </div>
      </figcaption>

      {/* Hover animated circle */}
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full border border-mint/8 opacity-0 transition-all duration-700 group-hover:opacity-30 anim-spin-slow" />
    </motion.figure>
  );
}

function Blueprint() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.5 0.05 160 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.5 0.05 160 / 0.08) 1px, transparent 1px)",
          backgroundSize: "120px 60px",
        }}
      />
    </div>
  );
}
