"use client";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, delay: i * 0.15, ease: EASE as unknown as [number, number, number, number] },
      opacity: { duration: 0.4, delay: i * 0.15 },
    },
  }),
};

const scale = {
  hidden: { scale: 0.7, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.12, ease: EASE as unknown as [number, number, number, number] },
  }),
};

/** Identify — overlapping Venn circles */
export function IdentifyIllustration() {
  return (
    <motion.svg
      viewBox="0 0 280 280"
      className="h-full w-full"
      fill="none"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Outer ring */}
      <motion.circle
        cx="140"
        cy="140"
        r="100"
        stroke="oklch(0.88 0.15 165 / 0.15)"
        strokeWidth="0.5"
        custom={0}
        variants={draw}
      />
      {/* Inner circles */}
      <motion.circle
        cx="140"
        cy="90"
        r="50"
        stroke="oklch(0.88 0.15 165 / 0.4)"
        strokeWidth="1.2"
        custom={1}
        variants={draw}
      />
      <motion.circle
        cx="183.3"
        cy="165"
        r="50"
        stroke="oklch(0.88 0.15 165 / 0.4)"
        strokeWidth="1.2"
        custom={2}
        variants={draw}
      />
      <motion.circle
        cx="96.7"
        cy="165"
        r="50"
        stroke="oklch(0.88 0.15 165 / 0.4)"
        strokeWidth="1.2"
        custom={3}
        variants={draw}
      />
      {/* Connection lines */}
      <motion.line
        x1="140" y1="140" x2="140" y2="240"
        stroke="oklch(0.88 0.15 165 / 0.2)"
        strokeWidth="0.5"
        custom={4}
        variants={draw}
      />
      <motion.line
        x1="140" y1="140" x2="226.6" y2="90"
        stroke="oklch(0.88 0.15 165 / 0.2)"
        strokeWidth="0.5"
        custom={4}
        variants={draw}
      />
      <motion.line
        x1="140" y1="140" x2="53.4" y2="90"
        stroke="oklch(0.88 0.15 165 / 0.2)"
        strokeWidth="0.5"
        custom={4}
        variants={draw}
      />
      {/* Center dot */}
      <motion.circle
        cx="140"
        cy="140"
        r="4"
        fill="oklch(0.88 0.15 165 / 0.8)"
        custom={5}
        variants={scale}
      />
    </motion.svg>
  );
}

/** Develop — layered architecture blocks */
export function DevelopIllustration() {
  return (
    <motion.svg
      viewBox="0 0 280 280"
      className="h-full w-full"
      fill="none"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Top diamond */}
      <motion.path
        d="M140 40 L210 100 L140 160 L70 100 Z"
        stroke="oklch(0.88 0.15 165 / 0.35)"
        strokeWidth="1.2"
        custom={0}
        variants={draw}
      />
      {/* Middle diamond */}
      <motion.path
        d="M140 80 L210 140 L140 200 L70 140 Z"
        stroke="oklch(0.88 0.15 165 / 0.22)"
        strokeWidth="1"
        custom={1}
        variants={draw}
      />
      {/* Bottom diamond */}
      <motion.path
        d="M140 120 L210 180 L140 240 L70 180 Z"
        stroke="oklch(0.88 0.15 165 / 0.14)"
        strokeWidth="0.8"
        custom={2}
        variants={draw}
      />
      {/* Vertical spine */}
      <motion.line
        x1="140" y1="40" x2="140" y2="240"
        stroke="oklch(0.88 0.15 165 / 0.1)"
        strokeWidth="0.5"
        strokeDasharray="3 6"
        custom={3}
        variants={draw}
      />
      {/* Nodes on spine */}
      {[100, 140, 180].map((cy, i) => (
        <motion.circle
          key={cy}
          cx="140"
          cy={cy}
          r="3"
          fill="oklch(0.88 0.15 165 / 0.5)"
          custom={4 + i}
          variants={scale}
        />
      ))}
      {/* Outer frame */}
      <motion.rect
        x="30" y="20" width="220" height="240" rx="12"
        stroke="oklch(0.88 0.15 165 / 0.06)"
        strokeWidth="0.5"
        custom={0}
        variants={draw}
      />
    </motion.svg>
  );
}

/** Adopt — hexagonal structure with inner network */
export function AdoptIllustration() {
  return (
    <motion.svg
      viewBox="0 0 280 280"
      className="h-full w-full"
      fill="none"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Outer hexagon */}
      <motion.polygon
        points="140,25 240,67 240,152 140,194 40,152 40,67"
        stroke="oklch(0.88 0.15 165 / 0.3)"
        strokeWidth="1.2"
        custom={0}
        variants={draw}
        style={{ transformOrigin: "140px 110px" }}
      />
      {/* Inner hexagon */}
      <motion.polygon
        points="140,55 200,82 200,136 140,163 80,136 80,82"
        stroke="oklch(0.88 0.15 165 / 0.2)"
        strokeWidth="1"
        custom={1}
        variants={draw}
        style={{ transformOrigin: "140px 110px" }}
      />
      {/* Network lines */}
      {[
        "M140,55 L200,136",
        "M140,55 L80,136",
        "M200,82 L80,136",
        "M80,82 L200,136",
        "M200,82 L140,163",
        "M80,82 L140,163",
      ].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="oklch(0.88 0.15 165 / 0.08)"
          strokeWidth="0.5"
          custom={2 + i * 0.3}
          variants={draw}
        />
      ))}
      {/* Network nodes */}
      {[
        [140, 55], [200, 82], [200, 136], [140, 163], [80, 136], [80, 82], [140, 110],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={i === 6 ? 5 : 3}
          fill={i === 6 ? "oklch(0.88 0.15 165 / 0.6)" : "oklch(0.88 0.15 165 / 0.4)"}
          custom={3 + i * 0.15}
          variants={scale}
        />
      ))}
      {/* Bottom accent lines */}
      <motion.path
        d="M80,210 L200,210"
        stroke="oklch(0.88 0.15 165 / 0.1)"
        strokeWidth="0.5"
        custom={5}
        variants={draw}
      />
      <motion.path
        d="M100,225 L180,225"
        stroke="oklch(0.88 0.15 165 / 0.06)"
        strokeWidth="0.5"
        custom={5.5}
        variants={draw}
      />
    </motion.svg>
  );
}
