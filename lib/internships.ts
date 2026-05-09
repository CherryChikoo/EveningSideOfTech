export type Internship = {
  id: string;
  title: string;
  company: string;
  team: string;
  location: string;
  duration: string;
  lastDate: string;
  stipend: string;
  compensation: "Paid" | "Unpaid";
  mode: "Remote" | "Hybrid" | "Onsite";
  summary: string;
  skills: string[];
  description: string;
};

export const internships: Internship[] = [
  {
    id: "ai-product-analyst",
    title: "AI Product Analyst Intern",
    company: "EveningSideOfTech AI",
    team: "Strategy",
    location: "Auckland, NZ",
    duration: "12 weeks",
    lastDate: "30 Jun 2026",
    stipend: "$1,200 / month",
    compensation: "Paid",
    mode: "Hybrid",
    summary:
      "Map operational workflows, uncover automation opportunities, and define product requirements with senior delivery leads.",
    description:
      "Work directly with strategy and product teams to map operational bottlenecks, frame high-impact opportunities, and turn findings into launch-ready AI initiatives.",
    skills: ["Process Mapping", "SQL Basics", "Communication", "Prompt Design"],
  },
  {
    id: "ai-automation-engineer",
    title: "AI Automation Engineer Intern",
    company: "EveningSideOfTech AI",
    team: "Engineering",
    location: "Remote",
    duration: "16 weeks",
    lastDate: "5 Jul 2026",
    stipend: "$1,500 / month",
    compensation: "Paid",
    mode: "Remote",
    summary:
      "Build internal automations using LLM APIs and orchestration tools, then ship production-ready integrations with mentor support.",
    description:
      "Design and implement practical automations for internal and client workflows, from API integration to deployment quality checks and usage telemetry.",
    skills: ["JavaScript/TypeScript", "APIs", "Node.js", "Testing Mindset"],
  },
  {
    id: "adoption-operations",
    title: "AI Adoption Operations Intern",
    company: "EveningSideOfTech AI",
    team: "Adoption",
    location: "Sydney, AU",
    duration: "10 weeks",
    lastDate: "22 Jun 2026",
    stipend: "$1,000 / month",
    compensation: "Paid",
    mode: "Onsite",
    summary:
      "Turn deployed AI systems into daily team habits through enablement playbooks, adoption dashboards, and training loops.",
    description:
      "Partner with delivery teams to turn shipped AI capabilities into measurable behavior change with practical playbooks, workshops, and governance rituals.",
    skills: ["Documentation", "Facilitation", "Excel/Sheets", "Stakeholder Mgmt"],
  },
  {
    id: "ai-design-research",
    title: "AI UX Research Intern",
    company: "EveningSideOfTech AI",
    team: "Product",
    location: "Remote",
    duration: "8 weeks",
    lastDate: "18 Jun 2026",
    stipend: "$900 / month",
    compensation: "Paid",
    mode: "Remote",
    summary:
      "Research user friction in AI-assisted workflows and prototype improvements for speed, trust, and operational clarity.",
    description:
      "Run lean research cycles and prototype interaction improvements for AI-assisted experiences that need clarity, confidence, and operator trust.",
    skills: ["User Research", "Figma", "Journey Mapping", "Synthesis"],
  },
];

export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "payment_pending"
  | "payment_completed";

export const statusOrder: ApplicationStatus[] = [
  "submitted",
  "under_review",
  "approved",
  "payment_pending",
  "payment_completed",
];

export const statusLabels: Record<ApplicationStatus, string> = {
  submitted: "Application submitted",
  under_review: "Under review",
  approved: "Approved",
  rejected: "Rejected",
  payment_pending: "Payment pending",
  payment_completed: "Payment completed",
};

export const storageKeys = {
  selectedInternship: "internships:selected-role",
  applicationDraft: "internships:application-draft",
  applicationState: "internships:application-status",
};

export type ApplicationDraft = {
  internshipId: string;
  fullName: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  graduationYear: string;
  skills: string;
  portfolio: string;
  linkedin: string;
  resumeName?: string;
};

export const getInternshipById = (id?: string | null) =>
  internships.find((item) => item.id === id) ?? internships[0];
