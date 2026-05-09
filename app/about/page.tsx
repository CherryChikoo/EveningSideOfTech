"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteLayout } from "@/components/sections/Layout";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/motion/aurora-text";
import { InteractiveHoverButton } from "@/components/motion/interactive-hover-button";
import { DotPattern } from "@/components/motion/dot-pattern";

import { Target, Lightbulb, Users, Rocket, Globe, ShieldCheck } from "lucide-react";



const values = [
  {
    icon: Target,
    title: "Precision Over Volume",
    body: "We don't run cohorts of hundreds. Every intern is hand-matched to a project where they'll make real impact and grow fastest.",
  },
  {
    icon: Lightbulb,
    title: "Learn by Shipping",
    body: "No tutorials, no busywork. From week one, you're contributing to production systems alongside senior engineers.",
  },
  {
    icon: Users,
    title: "Mentorship That Shows Up",
    body: "Paired 1:1 with a mentor who reviews your code, challenges your thinking, and advocates for your growth.",
  },
  {
    icon: Rocket,
    title: "Career Leverage",
    body: "Every intern leaves with a portfolio, a professional reference, and a network that compounds over years.",
  },
  {
    icon: Globe,
    title: "Remote-First, Global Reach",
    body: "We hire from everywhere. What matters isn't where you are — it's how you think and what you build.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Over Speed",
    body: "We move with intention. Every system shipped meets production standards — because that's the standard we're teaching.",
  },
];

const team = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    initials: "AC",
    bio: "Ex-Google, 10+ years in AI systems. Built ML infrastructure at scale before founding EveningSideOfTech.",
  },
  {
    name: "Sarah Kim",
    role: "Head of Engineering",
    initials: "SK",
    bio: "Full-stack architect specializing in LLM orchestration and production deployment pipelines.",
  },
  {
    name: "Marcus Rivera",
    role: "Head of Strategy",
    initials: "MR",
    bio: "Former McKinsey, now focused on identifying high-impact AI opportunities for enterprises.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Adoption",
    initials: "PS",
    bio: "Change management expert who ensures deployed AI systems become daily team habits.",
  },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-48 pb-20 text-center">
        <div className="absolute inset-0 -z-10 radial-glow" />
        <DotPattern
          glow
          className="opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]"
        />

        {/* Orbs */}
        <div className="orb orb-mint absolute left-[15%] top-[30%] h-[220px] w-[220px] anim-float-slow" />
        <div className="orb orb-teal absolute right-[12%] top-[40%] h-[160px] w-[160px] anim-float-alt" />

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl px-6"
        >
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-mint backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
            Our story
          </p>
          <h1 className="gradient-text-mint text-balance text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.95] tracking-tight">
            Built for the builders.
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-foreground/70"
          >
            EveningSideOfTech exists because we believe the best way to learn AI isn't
            through lectures — it's through building production systems with
            people who've done it before.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="card-mint-hover rounded-3xl p-7 md:p-10"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mint">
              Mission
            </div>
            <h2 className="text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Close the gap between{" "}
              <span className="gradient-text-mint">learning and doing.</span>
            </h2>
            <p className="mt-6 text-foreground/65 leading-relaxed">
              We provide structured, high-intensity internship tracks where
              ambitious people work on real AI projects with real deadlines —
              building the portfolio, skills, and network that launch careers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="card-mint-hover rounded-3xl p-7 md:p-10"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mint">
              Vision
            </div>
            <h2 className="text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The default path into{" "}
              <span className="gradient-text-mint">production AI.</span>
            </h2>
            <p className="mt-6 text-foreground/65 leading-relaxed">
              We're building the program we wish existed — where talent meets
              opportunity, mentorship is real, and every graduate ships
              something worth talking about.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,oklch(0.25_0.08_160/0.3),transparent_70%)]" />

        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16 text-balance text-center text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-tight"
          >
            What we{" "}
            <AuroraText className="font-serif italic">
              stand for.
            </AuroraText>
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group card-mint-hover relative overflow-hidden rounded-2xl p-6 md:p-8"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,oklch(0.4_0.12_160/0.2),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Animated circle */}
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full border border-mint/8 opacity-0 transition-all duration-700 group-hover:opacity-30 anim-spin-slow" />

                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-mint/25 bg-mint/8 text-mint transition-all duration-500 group-hover:border-mint/50 group-hover:shadow-[0_0_20px_-5px_var(--mint-glow)]">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium tracking-tight transition-colors group-hover:text-mint">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16 text-balance text-center text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-tight"
          >
            The{" "}
            <AuroraText className="font-serif italic">team.</AuroraText>
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group card-mint-hover overflow-hidden rounded-2xl p-6 text-center md:p-8"
              >
                {/* Avatar */}
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-mint/25 bg-mint/8 font-mono text-xl font-medium text-mint transition-all duration-500 group-hover:border-mint/60 group-hover:shadow-[0_0_30px_-5px_var(--mint-glow)]">
                  {member.initials}
                </div>
                <h3 className="text-lg font-medium tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mint/70">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/55">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,oklch(0.3_0.12_160/0.3),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl px-6"
        >
          <h2 className="text-balance text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-tight">
            Want to join the team?{" "}
            <AuroraText className="font-serif italic">
              Let's talk.
            </AuroraText>
          </h2>
          <p className="mt-6 text-lg text-foreground/65">
            Whether you're exploring internships or looking to partner, we'd
            love to hear from you.
          </p>
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-4">
            <Link href="/internships">
              <InteractiveHoverButton>Browse internships</InteractiveHoverButton>
            </Link>
            <Link href="/contact" className="btn-pill">
              Contact us
            </Link>
          </div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
