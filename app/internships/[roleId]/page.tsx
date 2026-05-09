"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  ChevronLeft,
  Clock,
  DollarSign,
  Globe,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/sections/Layout";
import { getInternshipById, internships } from "@/lib/internships";
import { InteractiveHoverButton } from "@/components/motion/interactive-hover-button";


    export default function InternshipDetail() {
  const { roleId } = useParams();
  const role = useMemo(() => getInternshipById(roleId as string), [roleId]);

  const otherRoles = useMemo(
    () => {
      if (!role) return [];
      return internships.filter((r) => r.id !== role.id).slice(0, 3);
    },
    [role?.id],
  );

  if (!role) return null;

  return (
    <SiteLayout>
      <section className="relative min-h-svh overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 -z-10 radial-glow" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-20" />

        {/* Floating orbs */}
        <div className="orb orb-mint absolute right-[10%] top-[20%] h-[200px] w-[200px] anim-float-slow" />
        <div className="orb orb-teal absolute left-[5%] top-[50%] h-[150px] w-[150px] anim-float-alt" />

        <div className="mx-auto max-w-6xl px-6">
          {/* Back link */}
          <Link
            href="/internships"
            className="mb-8 inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/70 transition-colors hover:border-mint/50 hover:text-mint"
          >
            <ChevronLeft className="h-4 w-4" /> Internships
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-mint/35 bg-mint/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-mint">
                <Sparkles className="h-3.5 w-3.5" /> {role.team} Track
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                {role.mode}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                {role.compensation}
              </span>
            </div>
            <h1 className="text-balance text-[clamp(2rem,5vw,4.2rem)] font-light leading-[1.02] tracking-tight">
              {role.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground/65">
              {role.description}
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Main content */}
            <div className="space-y-6">
              {/* Summary card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="card-mint-hover rounded-3xl p-6 md:p-8"
              >
                <h2 className="mb-6 text-xl font-medium tracking-tight">
                  What you'll do
                </h2>
                <p className="leading-relaxed text-foreground/70">
                  {role.summary}
                </p>
                <p className="mt-4 leading-relaxed text-foreground/70">
                  {role.description}
                </p>
                <p className="mt-4 leading-relaxed text-foreground/70">
                  You'll work directly with senior team members, participate in
                  daily standups and weekly reviews, and own deliverables that
                  ship to production. This is not a shadowing program — it's a
                  working role with real responsibility and mentorship.
                </p>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="card-mint-hover rounded-3xl p-6 md:p-8"
              >
                <h2 className="mb-6 text-xl font-medium tracking-tight">
                  Skills & requirements
                </h2>
                <div className="flex flex-wrap gap-3">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border border-mint/25 bg-mint/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-mint/90 transition-all hover:border-mint/50 hover:bg-mint/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-sm text-foreground/55">
                  No prior AI experience required — but you should be comfortable learning quickly,
                  working independently, and meeting deadlines.
                </p>
              </motion.div>

              {/* Apply CTA (mobile) */}
              <div className="lg:hidden">
                <Link href={`/internships/${role.id}/register`}>
                  <InteractiveHoverButton className="w-full justify-center py-3.5">
                    Apply now
                  </InteractiveHoverButton>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              {/* Details card */}
              <div className="card-mint rounded-3xl p-6">
                <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-mint/80">
                  Role details
                </h3>
                <div className="space-y-4">
                  <DetailRow icon={Clock} label="Duration" value={role.duration} />
                  <DetailRow icon={Globe} label="Location" value={role.location} />
                  <DetailRow icon={Briefcase} label="Mode" value={role.mode} />
                  <DetailRow icon={DollarSign} label="Stipend" value={role.stipend} />
                  <DetailRow icon={Calendar} label="Apply by" value={role.lastDate} />
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href={`/internships/${role.id}/register`}
                    className="block"
                  >
                    <InteractiveHoverButton className="w-full justify-center py-3">
                      Apply now
                    </InteractiveHoverButton>
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-pill w-full justify-center text-center"
                  >
                    Ask a question
                  </Link>
                </div>
              </div>

              {/* Company info */}
              <div className="card-mint rounded-2xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                  Company
                </p>
                <p className="mt-2 text-sm text-foreground/80">
                  {role.company}
                </p>
                <p className="mt-1 text-sm text-foreground/55">
                  AI strategy, development, and adoption for ambitious teams.
                </p>
              </div>
            </motion.aside>
          </div>

          {/* Related roles */}
          {otherRoles.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-24"
            >
              <h2 className="mb-8 text-2xl font-medium tracking-tight">
                Other internship tracks
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                {otherRoles.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.7 }}
                  >
                    <Link href={`/internships/${r.id}`}
                      className="group card-mint-hover block rounded-2xl p-5 transition-all hover:-translate-y-0.5 md:p-6"
                    >
                      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                        {r.team} · {r.mode} · {r.duration}
                      </div>
                      <h3 className="text-lg font-medium leading-tight tracking-tight transition-colors group-hover:text-mint">
                        {r.title}
                      </h3>
                      <p className="mt-3 text-sm text-foreground/55 line-clamp-2">
                        {r.summary}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mint/70 transition-colors group-hover:text-mint">
                        View details{" "}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background/40 text-foreground/60">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45">
          {label}
        </div>
        <div className="text-sm text-foreground/85">{value}</div>
      </div>
    </div>
  );
}
