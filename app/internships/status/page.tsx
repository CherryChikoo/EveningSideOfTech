"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Clock3, XCircle } from "lucide-react";
import { SiteLayout } from "@/components/sections/Layout";
import { FlowShell, WorkflowProgress } from "@/components/sections/internships/FlowShell";
import {
  statusLabels,
  storageKeys,
  type ApplicationStatus,
  statusOrder,
} from "@/lib/internships";

const statusOptions: ApplicationStatus[] = [
  "submitted",
  "under_review",
  "approved",
  "rejected",
  "payment_pending",
  "payment_completed",
];



export default function StatusPage(props: any) {
    const [active, setActive] = useState<ApplicationStatus>("submitted");

  useEffect(() => {
    const stored = localStorage.getItem(storageKeys.applicationState) as ApplicationStatus | null;
    if (stored) setActive(stored);
  }, []);

  const timeline = useMemo(
    () =>
      statusOrder.map((status) => ({
        status,
        reached:
          statusOrder.indexOf(status) <= statusOrder.indexOf(active),
      })),
    [active],
  );

  // Map active status to the closest workflow step
  const workflowStep = (() => {
    if (active === "payment_completed") return 4;
    if (active === "payment_pending") return 3;
    if (active === "approved" || active === "rejected") return 3;
    if (active === "under_review") return 2;
    return 2; // submitted
  })();

  return (
    <SiteLayout>
      <FlowShell
        backTo="/internships"
        backText="Internships"
        stepLabel="Application Tracking"
        title={
          <>
            Monitor your{" "}
            <span className="gradient-text-mint">application status</span>
          </>
        }
        subtitle="Live progress states with clear outcomes for review, decisions, and payment checkpoints."
      >
        {/* Navigatable workflow bar */}
        <WorkflowProgress
          steps={[
            "Listing",
            "Registration",
            "Payment",
            "Confirmation",
            "Tracking",
          ]}
          activeStep={workflowStep}
        />

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Sidebar — current state + demo controls */}
          <aside className="card-mint rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-medium">Current state</h2>
            <StatusBadge status={active} />
            <p className="mt-4 text-sm text-foreground/65">
              Demo controls below let you preview every possible status and
              feedback state.
            </p>
            <div className="mt-5 grid gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setActive(option);
                    localStorage.setItem(
                      storageKeys.applicationState,
                      option,
                    );
                  }}
                  className={`rounded-xl border px-3 py-2 text-left text-sm transition-all ${
                    active === option
                      ? "border-mint/60 bg-mint/10 text-mint"
                      : "border-border/60 bg-background/40 text-foreground/70 hover:border-mint/35"
                  }`}
                >
                  {statusLabels[option]}
                </button>
              ))}
            </div>
          </aside>

          {/* Main — timeline */}
          <section className="card-mint rounded-3xl p-6 md:p-8">
            <h3 className="text-2xl font-medium leading-tight">
              Progress timeline
            </h3>
            <div className="mt-6 space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.status}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`h-3.5 w-3.5 rounded-full border ${
                        item.reached
                          ? "border-mint bg-mint shadow-[0_0_20px_var(--mint-glow)]"
                          : "border-border bg-background"
                      }`}
                    />
                    {/* Connecting line */}
                    {index < timeline.length - 1 && (
                      <div
                        className={`mt-1 h-6 w-px ${
                          item.reached ? "bg-mint/30" : "bg-border/40"
                        }`}
                      />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm ${
                      item.reached
                        ? "border-mint/45 bg-mint/10 text-foreground"
                        : "border-border/60 bg-background/35 text-foreground/55"
                    }`}
                  >
                    {statusLabels[item.status]}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status message */}
            <div className="mt-8 rounded-2xl border border-border/60 bg-background/45 p-4">
              <p className="text-sm text-foreground/75">
                {active === "approved" &&
                  "You are approved. Continue to payment to secure your slot."}
                {active === "rejected" &&
                  "This application was not selected. You can apply to another role anytime."}
                {active === "payment_pending" &&
                  "Approval is complete. Payment is pending to confirm placement."}
                {active === "payment_completed" &&
                  "All done. Your onboarding pack is being prepared."}
                {active === "submitted" &&
                  "Application submitted successfully. Initial screening is pending."}
                {active === "under_review" &&
                  "Your profile is currently being reviewed by the internship panel."}
              </p>
            </div>

            {/* Quick navigation */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/internships" className="btn-pill px-5! py-2.5!">
                Explore internships <ArrowRight className="h-4 w-4" />
              </Link>
              {(active === "approved" || active === "payment_pending") && (
                <Link
                  href="/internships/payment"
                  className="btn-pill px-5! py-2.5!"
                >
                  Go to payment <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {active === "rejected" && (
                <Link
                  href="/internships"
                  className="rounded-full border border-border/70 bg-background/45 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-mint/40 hover:text-mint"
                >
                  Browse other roles
                </Link>
              )}
            </div>
          </section>
        </div>
      </FlowShell>
    </SiteLayout>
  );
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  if (status === "rejected") {
    return (
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-sm text-destructive">
        <XCircle className="h-4 w-4" /> {statusLabels[status]}
      </div>
    );
  }
  if (status === "approved" || status === "payment_completed") {
    return (
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-mint/55 bg-mint/10 px-3 py-1.5 text-sm text-mint">
        <BadgeCheck className="h-4 w-4" /> {statusLabels[status]}
      </div>
    );
  }
  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/45 px-3 py-1.5 text-sm text-foreground/70">
      <Clock3 className="h-4 w-4" /> {statusLabels[status]}
    </div>
  );
}
