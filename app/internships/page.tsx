"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/sections/Layout";
import { getStoredInternships } from "@/lib/admin-store";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";



type Mode = "All" | "Remote" | "Hybrid" | "Onsite";
type Domain = "All" | "Strategy" | "Engineering" | "Adoption" | "Product";
type Comp = "All" | "Paid" | "Unpaid";

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all ${
        active
          ? "border-mint/60 bg-mint/10 text-mint"
          : "border-border/50 bg-transparent text-foreground/50 hover:border-mint/30 hover:text-foreground/70"
      }`}
    >
      {label}
    </button>
  );
}

export default function InternshipsPage(props: any) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("All");
  const [domain, setDomain] = useState<Domain>("All");
  const [compensation, setCompensation] = useState<Comp>("All");
  useGsapReveal("#internships-list");

  const internships = useMemo(() => getStoredInternships(), []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return internships.filter((item) => {
      const matchesMode = mode === "All" || item.mode === mode;
      const matchesDomain = domain === "All" || item.team === domain;
      const matchesComp =
        compensation === "All" || item.compensation === compensation;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.team.toLowerCase().includes(q) ||
        item.skills.join(" ").toLowerCase().includes(q);
      return matchesMode && matchesDomain && matchesComp && matchesQuery;
    });
  }, [mode, query, domain, compensation]);

  const hasActiveFilters =
    mode !== "All" || domain !== "All" || compensation !== "All" || query !== "";

  return (
    <SiteLayout>
      <section className="relative min-h-svh overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 -z-10 radial-glow" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-25" />

        {/* Background orbs */}
        <div className="orb orb-mint absolute right-[5%] top-[15%] h-[200px] w-[200px] anim-float-slow" />
        <div className="orb orb-teal absolute left-[8%] bottom-[20%] h-[160px] w-[160px] anim-float-alt" />

        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint/35 bg-mint/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-mint">
              <Sparkles className="h-3.5 w-3.5" /> Internship Tracks
            </p>
            <h1 className="text-balance text-[clamp(2.4rem,6.3vw,5.2rem)] font-light leading-[0.98] tracking-tight">
              Build real AI systems, not demo projects.
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-foreground/65">
              Choose a focused internship role, complete your premium application
              flow, then track your progress end-to-end.
            </p>
          </motion.div>

          {/* Search & Filters — consolidated into one clean block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-12 space-y-4 rounded-2xl border border-border/60 bg-background/45 p-4 backdrop-blur-xl sm:p-5"
          >
            {/* Search */}
            <label className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/45 px-4 py-3 transition-colors focus-within:border-mint/40">
              <Search className="h-4 w-4 shrink-0 text-foreground/55" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by role, team, or skills…"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
              />
            </label>

            {/* Inline filter groups */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
              {/* Mode filter */}
              <div className="flex items-center gap-2">
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                  Mode
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "Remote", "Hybrid", "Onsite"] as const).map(
                    (item) => (
                      <FilterPill
                        key={item}
                        label={item}
                        active={mode === item}
                        onClick={() => setMode(item)}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Domain filter */}
              <div className="flex items-center gap-2">
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                  Team
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      "All",
                      "Strategy",
                      "Engineering",
                      "Adoption",
                      "Product",
                    ] as const
                  ).map((item) => (
                    <FilterPill
                      key={item}
                      label={item}
                      active={domain === item}
                      onClick={() => setDomain(item)}
                    />
                  ))}
                </div>
              </div>

              {/* Compensation filter */}
              <div className="flex items-center gap-2">
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                  Pay
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "Paid", "Unpaid"] as const).map((item) => (
                    <FilterPill
                      key={item}
                      label={item}
                      active={compensation === item}
                      onClick={() => setCompensation(item)}
                    />
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setMode("All");
                    setDomain("All");
                    setCompensation("All");
                    setQuery("");
                  }}
                  className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-mint/70 transition-colors hover:text-mint"
                >
                  Clear all
                </button>
              )}
            </div>
          </motion.div>

          {/* Results */}
          <div
            id="internships-list"
            className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-2"
          >
            {filtered.length === 0 && (
              <div className="card-mint rounded-2xl p-8 text-center lg:col-span-2">
                <p className="text-foreground/60">
                  No internships match your filters. Try adjusting your search.
                </p>
              </div>
            )}
            {filtered.map((role) => (
              <article
                key={role.id}
                data-reveal
                className="group card-mint-hover relative overflow-hidden rounded-3xl p-5 transition-all duration-500 hover:-translate-y-1 sm:p-6 md:p-9"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,oklch(0.45_0.14_160/0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Animated decorative circles */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-mint/8 opacity-0 transition-all duration-700 group-hover:opacity-25 anim-spin-slow" />
                <div
                  className="absolute -right-2 -top-2 h-14 w-14 rounded-full border border-mint/12 opacity-0 transition-all duration-700 group-hover:opacity-35 anim-spin-slow"
                  style={{ animationDirection: "reverse" }}
                />

                {/* Floating dot */}
                <div className="absolute right-8 bottom-8 h-3 w-3 rounded-full bg-mint/15 opacity-0 blur-sm transition-all duration-700 group-hover:opacity-60 anim-float" />

                {/* Meta */}
                <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
                  <span>{role.team}</span>
                  <span className="text-foreground/25">·</span>
                  <span>{role.mode}</span>
                  <span className="text-foreground/25">·</span>
                  <span>{role.duration}</span>
                  <span className="text-foreground/25">·</span>
                  <span>{role.compensation}</span>
                </div>

                <h2 className="text-xl font-medium leading-tight tracking-tight transition-colors group-hover:text-mint sm:text-2xl md:text-3xl">
                  {role.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground/65 md:text-base">
                  {role.summary}
                </p>

                {/* Skills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/70 bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/65 transition-colors group-hover:border-mint/25 group-hover:text-foreground/75"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-foreground/75">
                    <span className="font-medium text-foreground">
                      {role.stipend}
                    </span>{" "}
                    · {role.location} · Apply by {role.lastDate}
                  </p>
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <Link href={`/internships/${role.id}`}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-border/70 bg-background/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-mint/45 hover:text-mint sm:flex-none"
                    >
                      View details
                    </Link>
                    <Link href={`/internships/${role.id}`}
                      className="btn-pill flex-1 justify-center px-5! py-2.5! sm:flex-none"
                    >
                      Apply now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
