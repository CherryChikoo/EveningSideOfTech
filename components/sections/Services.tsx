import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { AuroraText } from "@/components/motion/aurora-text";

const items = [
  {
    n: "1",
    title: "Identify",
    body: "Every track starts with clarity. We match you to the right team based on your ambitions, your skills, and where you'll grow fastest. No generic placements — only high-signal matches.",
    icon: IdentifyIcon,
  },
  {
    n: "2",
    title: "Develop",
    body: "Once matched, you're embedded in real projects from day one. You'll build alongside senior engineers, ship production code, and develop the portfolio that actually opens doors.",
    icon: DevelopIcon,
  },
  {
    n: "3",
    title: "Adopt",
    body: "By the end of your track, you'll own deliverables you can point to. We help you translate project impact into career leverage — references, case studies, and a network that compounds.",
    icon: AdoptIcon,
  },
];

export function Services() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 text-balance text-center text-[clamp(2rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight"
        >
          Our process is{" "}
          <AuroraText className="font-serif italic">three steps…</AuroraText>
        </motion.h2>

        <div className="space-y-10">
          {items.map((it, i) => (
            <ServiceRow key={it.n} {...it} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  n,
  title,
  body,
  icon: Icon,
  index,
}: {
  n: string;
  title: string;
  body: string;
  icon: React.FC;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative grid grid-cols-1 items-center gap-4 sm:gap-6 md:grid-cols-[90px_1fr]"
    >
      <div className="bg-linear-to-b from-mint via-mint/85 to-mint/45 bg-clip-text font-display text-6xl font-semibold tracking-tight text-transparent sm:text-7xl md:text-8xl">
        {n}
      </div>
      <div className="card-mint relative overflow-hidden rounded-3xl p-5 transition-all duration-500 hover:border-mint/60 hover:shadow-[0_0_80px_-20px_var(--mint-glow)] sm:p-7 md:p-12">
        {/* Hover glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,oklch(0.3_0.1_160/0.3),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Animated decorative circles */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-mint/10 opacity-0 transition-all duration-700 group-hover:opacity-30 group-hover:scale-110 anim-spin-slow" />
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full border border-mint/15 opacity-0 transition-all duration-700 group-hover:opacity-40 anim-spin-slow" style={{ animationDirection: "reverse" }} />

        <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-center md:gap-8">
          <div className="flex justify-center text-foreground/90 transition-transform duration-700 group-hover:rotate-[8deg] group-hover:scale-110">
            <Icon />
          </div>
          <div>
            <a
              href={`#${title.toLowerCase()}`}
              className="inline-flex items-center gap-2 text-2xl font-medium tracking-tight transition-colors hover:text-mint sm:text-3xl md:text-4xl"
            >
              {title}{" "}
              <ChevronRight className="h-6 w-6 text-mint transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base md:text-lg">
              {body}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IdentifyIcon() {
  return (
    <motion.svg
      viewBox="0 0 160 160"
      className="h-32 w-32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
    >
      {[
        { cx: 65, cy: 65 },
        { cx: 95, cy: 65 },
        { cx: 65, cy: 95 },
        { cx: 95, cy: 95 },
      ].map((item, index) => (
        <motion.circle
          key={`${item.cx}-${item.cy}`}
          r="35"
          variants={{
            hidden: { cx: 80, cy: 80, opacity: 0.5 },
            show: {
              cx: item.cx,
              cy: item.cy,
              opacity: 1,
              transition: {
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
function DevelopIcon() {
  return (
    <motion.svg
      viewBox="0 0 160 160"
      className="h-32 w-32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
    >
      <motion.path
        d="M80 30 L130 60 L80 90 L30 60 Z"
        variants={{
          hidden: { y: 16, opacity: 0 },
          show: { y: 0, opacity: 1, transition: { duration: 0.55 } },
        }}
      />
      <motion.path
        d="M80 60 L130 90 L80 120 L30 90 Z"
        opacity=".7"
        variants={{
          hidden: { y: 10, opacity: 0 },
          show: {
            y: 0,
            opacity: 0.7,
            transition: { duration: 0.55, delay: 0.1 },
          },
        }}
      />
      <motion.path
        d="M80 90 L130 120 L80 150 L30 120 Z"
        opacity=".4"
        variants={{
          hidden: { y: 4, opacity: 0 },
          show: {
            y: 0,
            opacity: 0.4,
            transition: { duration: 0.55, delay: 0.2 },
          },
        }}
      />
    </motion.svg>
  );
}
function AdoptIcon() {
  return (
    <motion.svg
      viewBox="0 0 160 160"
      className="h-32 w-32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
    >
      <motion.polygon
        points="80,20 140,55 140,125 80,160 20,125 20,55"
        variants={{
          hidden: { scale: 0.84, opacity: 0.3 },
          show: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6 },
          },
        }}
        style={{ transformOrigin: "80px 90px" }}
      />
      <motion.polygon
        points="80,55 115,75 115,115 80,135 45,115 45,75"
        variants={{
          hidden: { scale: 0.92, opacity: 0.2 },
          show: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6, delay: 0.12 },
          },
        }}
        style={{ transformOrigin: "80px 95px" }}
      />
      <motion.path
        d="M55 110 L80 70 L105 110 Z"
        variants={{
          hidden: { y: 10, opacity: 0 },
          show: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.45, delay: 0.2 },
          },
        }}
      />
    </motion.svg>
  );
}
