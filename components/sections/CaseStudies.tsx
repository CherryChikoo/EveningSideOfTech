import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const studies = [
  {
    tag: "Strategy · 12 weeks",
    title: "AI Product Analyst — Mapping Workflows to Automation Opportunities",
    body: "Worked alongside senior delivery leads to uncover operational bottlenecks and frame AI-first initiatives for an aged-care provider scaling operations across 40+ locations.",
    accent: "from-emerald-500/20 to-teal-700/30",
    glyph: "●",
  },
  {
    tag: "Engineering · 16 weeks",
    title: "AI Automation Engineer — Shipping Production Integrations",
    body: "Built and deployed LLM-powered automations for internal and client workflows, from API orchestration to usage telemetry pipelines, with mentor support.",
    accent: "from-mint/30 to-emerald-800/30",
    glyph: "▲",
  },
  {
    tag: "Adoption · 10 weeks",
    title: "AI Adoption Ops — Turning Deployed Systems into Team Habits",
    body: "Created enablement playbooks, adoption dashboards, and training loops that turned shipped AI capabilities into measurable daily behavior change.",
    accent: "from-emerald-700/30 to-slate-800/40",
    glyph: "✦",
  },
];

export function CaseStudies() {
  return (
    <section className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <h2 className="text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.05] tracking-tight">
            Intern{" "}
            <span className="font-serif italic gradient-text-mint">
              spotlights.
            </span>
          </h2>
          <p className="max-w-sm text-foreground/60">
            Real outcomes from interns who chose to build, not browse.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {studies.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.75,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group card-mint-hover block overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Card preview area with animated elements */}
              <div
                className={`relative aspect-4/3 overflow-hidden bg-linear-to-br ${s.accent}`}
              >
                {/* Subtle radial highlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)]" />

                {/* Animated floating circles */}
                <div className="absolute left-[15%] top-[20%] h-16 w-16 rounded-full border border-white/10 opacity-0 transition-all duration-700 group-hover:opacity-40 anim-float" />
                <div className="absolute right-[20%] bottom-[25%] h-10 w-10 rounded-full border border-white/8 opacity-0 transition-all duration-700 group-hover:opacity-30 anim-float-alt" />
                <div className="absolute left-[40%] bottom-[15%] h-6 w-6 rounded-full bg-mint/10 opacity-0 blur-sm transition-all duration-700 group-hover:opacity-50 anim-float-slow" />

                {/* Glyph */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="font-serif text-[10rem] leading-none text-white/80 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:text-white/90">
                    {s.glyph}
                  </div>
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent" />

                {/* Glow on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,oklch(0.5_0.15_160/0.2),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint/80">
                  {s.tag}
                </div>
                <h3 className="mt-3 flex items-start gap-2 text-xl font-medium leading-tight text-foreground transition-colors group-hover:text-mint">
                  {s.title}
                  <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-mint transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
