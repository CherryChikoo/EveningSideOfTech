"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/services-data";

interface Props {
  studies: CaseStudy[];
}

export function ServiceCaseStudies({ studies }: Props) {
  if (!studies.length) return null;

  return (
    <div className="mt-16 grid gap-6 sm:grid-cols-2">
      {studies.map((study, i) => (
        <motion.a
          key={study.title}
          href={study.href}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{
            duration: 0.7,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="case-study-card group"
        >
          {/* Image area */}
          <div className="case-study-card-image">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${study.gradient}`}
            />
            {/* Geometric decorative element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl border border-white/[0.07] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                <div className="absolute inset-2 rounded-xl border border-white/[0.05] transition-transform duration-700 group-hover:-rotate-6" />
                <div className="absolute inset-4 rounded-lg bg-white/[0.03] transition-all duration-700 group-hover:bg-white/[0.06]" />
              </div>
            </div>
            {/* Hover glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,oklch(0.5_0.15_160/0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Content */}
          <div className="case-study-card-body">
            <div className="case-study-label">{study.label}</div>
            <h4 className="flex items-start gap-2 text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-mint">
              <span>{study.title}</span>
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-mint/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint" />
            </h4>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground/50">
              {study.description}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
