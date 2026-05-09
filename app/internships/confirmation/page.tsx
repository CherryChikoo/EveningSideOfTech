"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/sections/Layout";
import { FlowShell, WorkflowProgress } from "@/components/sections/internships/FlowShell";



export default function ConfirmationPage(props: any) {
  return (
    <SiteLayout>
      <FlowShell
        backTo="/internships"
        backText="Internships"
        stepLabel="Application Confirmed"
        title={
          <>
            You're in.{" "}
            <span className="gradient-text-mint">Application received.</span>
          </>
        }
        subtitle="Your internship application and payment have been recorded. You can now monitor every stage from your tracking dashboard."
      >
        {/* Navigatable workflow bar */}
        <WorkflowProgress
          steps={["Listing", "Registration", "Payment", "Confirmation", "Tracking"]}
          activeStep={3}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="card-mint max-w-3xl rounded-3xl p-7 md:p-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-mint/45 bg-mint/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-mint">
            <CheckCircle2 className="h-4 w-4" /> Payment completed
          </div>
          <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight md:text-4xl">
            Next update in 24-48 hours.
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/65">
            We are reviewing your profile with internship mentors. You will see
            timeline updates and decision states in real time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/internships/status" className="btn-pill px-5! py-2.5!">
              Track application <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/internships"
              className="rounded-full border border-border/70 bg-background/45 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-mint/40 hover:text-mint"
            >
              Browse more roles
            </Link>
          </div>
        </motion.div>
      </FlowShell>
    </SiteLayout>
  );
}
