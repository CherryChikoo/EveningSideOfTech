export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface CaseStudy {
  label: string;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

export interface ServicePhaseData {
  number: string;
  slug: string;
  title: string;
  heading: string;
  description: string;
  deliverables: ServiceDeliverable[];
  caseStudies: CaseStudy[];
}

export const servicePhases: ServicePhaseData[] = [
  {
    number: "01",
    slug: "identify",
    title: "Identify",
    heading: "Decide what's actually worth building",
    description:
      "Before anything gets built, we get aligned. We take the time to understand your ambitions, your skills, and where you'll grow fastest. Then we narrow everything down to the right track — one that will create real, measurable impact on your career. This phase ensures you're not guessing — and not wasting time on the wrong path.",
    deliverables: [
      {
        title: "Skills & Ambition Assessment",
        description:
          "Get clarity on your current strengths, growth areas, and career trajectory so we can match you to the right track with precision.",
      },
      {
        title: "Track Alignment Workshop",
        description:
          "Work directly with senior mentors to understand each track's focus, deliverables, and the type of work you'll be doing from day one.",
      },
      {
        title: "Portfolio & Readiness Audit",
        description:
          "Evaluate your existing projects, technical depth, and communication skills to identify gaps before you start building.",
      },
      {
        title: "Prioritization & Track Selection",
        description:
          "Stack-rank your options by impact and fit so you commit to the track where you'll compound the fastest.",
      },
      {
        title: "Onboarding & Diagnostics Brief",
        description:
          "A clear view of where you're ready now, what needs ramp-up, and what to expect in your first two weeks.",
      },
    ],
    caseStudies: [
      {
        label: "Case Study",
        title: "Mapping Workflows to Automation Opportunities",
        description:
          "Worked alongside senior delivery leads to uncover operational bottlenecks and frame AI-first initiatives for an organisation scaling operations across 40+ locations.",
        href: "#",
        gradient: "from-emerald-600/30 via-teal-800/20 to-transparent",
      },
      {
        label: "Case Study",
        title: "Transforming Operations with AI-Powered Intelligence",
        description:
          "A high-performance team had world-class talent and resources, but operational inefficiencies were holding them back from reaching the next level.",
        href: "#",
        gradient: "from-mint/25 via-emerald-900/20 to-transparent",
      },
    ],
  },
  {
    number: "02",
    slug: "develop",
    title: "Develop",
    heading: "Build it right so it works from day one",
    description:
      "Once your track is clear, you're embedded in real projects immediately. This is where learning becomes reality. You'll plan and build AI systems that integrate into real workflows — designed for reliability, real-world use, and production deployment. No fragile demos. No tutorial projects.",
    deliverables: [
      {
        title: "Scoping & Technical Architecture",
        description:
          "Translate project goals into a clear build plan — defining scope, data flows, integrations, and success criteria upfront.",
      },
      {
        title: "Data & Systems Integration",
        description:
          "Embed AI into existing stacks so it fits naturally into how work already happens — learning production-grade integration patterns.",
      },
      {
        title: "Proof of Concept to Production Build",
        description:
          "Build quickly, test in real workflows, then harden what works into a production-ready system with mentor guidance.",
      },
      {
        title: "Security, Governance & Reliability Design",
        description:
          "Implement access controls, monitoring, and guardrails so systems are safe, auditable, and dependable.",
      },
      {
        title: "Performance Tuning & Optimization",
        description:
          "Improve accuracy, speed, and cost efficiency before anything is deployed broadly — learning to ship with confidence.",
      },
    ],
    caseStudies: [
      {
        label: "Case Study",
        title: "Building AI-Driven Efficiency at Scale",
        description:
          "An organisation faced the challenge of scaling operations to meet growing demand while navigating complex regulatory reform changes.",
        href: "#",
        gradient: "from-cyan-700/25 via-emerald-900/20 to-transparent",
      },
      {
        label: "Case Study",
        title: "Shipping Production AI Integrations",
        description:
          "Built and deployed LLM-powered automations for internal and client workflows, from API orchestration to usage telemetry pipelines.",
        href: "#",
        gradient: "from-emerald-700/30 via-teal-900/15 to-transparent",
      },
    ],
  },
  {
    number: "03",
    slug: "adopt",
    title: "Adopt",
    heading: "Make AI part of how work actually gets done",
    description:
      "Shipping code isn't success. Adoption is. In this phase, we work side by side with you to ensure your deliverables are understood, documented, and portfolio-ready. The goal isn't a \"handover\" — it's ownership of work you can point to.",
    deliverables: [
      {
        title: "Pilot Launch & Controlled Rollout",
        description:
          "Introduce your systems intentionally, gather feedback from stakeholders, and refine before scaling.",
      },
      {
        title: "AI Enablement & Documentation",
        description:
          "Create hands-on documentation and training materials so teams know when and how to use what you've built.",
      },
      {
        title: "Workflow Integration Support",
        description:
          "Embed AI into existing routines without slowing anyone down — proving real-world adoption.",
      },
      {
        title: "Performance Tracking & Career Leverage",
        description:
          "Measure impact, build your case studies, and translate project outcomes into career leverage — references, portfolios, and a network that compounds.",
      },
    ],
    caseStudies: [
      {
        label: "Case Study",
        title: "Turning Deployed Systems into Team Habits",
        description:
          "Created enablement playbooks, adoption dashboards, and training loops that turned shipped AI capabilities into measurable daily behavior change.",
        href: "#",
        gradient: "from-emerald-600/25 via-slate-800/20 to-transparent",
      },
      {
        label: "Case Study",
        title: "From Intern Project to Production System",
        description:
          "An intern-built prototype was refined, documented, and adopted by the wider team — demonstrating real operational value from day one.",
        href: "#",
        gradient: "from-teal-700/25 via-emerald-900/15 to-transparent",
      },
    ],
  },
];
