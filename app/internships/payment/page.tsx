"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, CreditCard, LoaderCircle, Wallet } from "lucide-react";
import { SiteLayout } from "@/components/sections/Layout";
import { FlowShell, WorkflowProgress } from "@/components/sections/internships/FlowShell";
import { getInternshipById, storageKeys, type ApplicationDraft } from "@/lib/internships";

export default function PaymentPage() {
  const navigate = useRouter();
  const [method, setMethod] = useState<"card" | "upi">("card");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [draft, setDraft] = useState<ApplicationDraft | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKeys.applicationDraft);
      if (raw) setDraft(JSON.parse(raw) as ApplicationDraft);
    } catch {
      // ignore parse errors
    }
  }, []);

  const role = draft ? getInternshipById(draft.internshipId) : null;

  const complete = async () => {
    setLoading(true);
    setFailed(false);
    await new Promise((resolve) => setTimeout(resolve, 1600));

    if (simulateFailure) {
      localStorage.setItem(storageKeys.applicationState, "payment_pending");
      setFailed(true);
      setLoading(false);
      return;
    }

    localStorage.setItem(storageKeys.applicationState, "payment_completed");
    setLoading(false);
    navigate.push("/internships/confirmation");
  };

  return (
    <SiteLayout>
      <FlowShell
        backTo="/internships"
        backText="Internships"
        stepLabel="Secure Payment"
        title={
          <>
            Finalize your <span className="gradient-text-mint">internship seat</span>
          </>
        }
        subtitle="Stripe-inspired checkout with secure handling, clear totals, and instant confirmation states."
      >
        <WorkflowProgress
          steps={["Listing", "Registration", "Payment", "Confirmation", "Tracking"]}
          activeStep={2}
        />
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {!draft ? (
            <div className="card-mint rounded-3xl p-7 md:p-10 lg:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mint/80">Route guard</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight">Registration required before payment.</h2>
              <p className="mt-4 max-w-2xl text-foreground/65">
                Start by choosing an internship role and completing your application details. Payment unlocks after that step.
              </p>
              <button
                onClick={() => navigate.push("/internships")}
                className="btn-pill mt-7 px-5! py-2.5!"
              >
                Go to internships
              </button>
            </div>
          ) : null}

          {draft ? (
          <div className="card-mint rounded-3xl p-5 sm:p-6 md:p-8">
            <div className="mb-5 grid grid-cols-1 gap-2 sm:flex sm:gap-3">
              <button
                onClick={() => setMethod("card")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all ${
                  method === "card"
                    ? "border-mint/60 bg-mint/10 text-mint"
                    : "border-border/60 bg-background/35 text-foreground/70"
                }`}
              >
                <CreditCard className="h-4 w-4" /> Card
              </button>
              <button
                onClick={() => setMethod("upi")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all ${
                  method === "upi"
                    ? "border-mint/60 bg-mint/10 text-mint"
                    : "border-border/60 bg-background/35 text-foreground/70"
                }`}
              >
                <Wallet className="h-4 w-4" /> UPI / Wallet
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={method}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.35 }}
                className="grid gap-4 md:grid-cols-2"
              >
                {method === "card" ? (
                  <>
                    <PayField label="Cardholder name"><input className={payInput} defaultValue={draft?.fullName || ""} /></PayField>
                    <PayField label="Card number"><input className={payInput} defaultValue="4242 4242 4242 4242" /></PayField>
                    <PayField label="Expiry"><input className={payInput} defaultValue="12 / 29" /></PayField>
                    <PayField label="CVC"><input className={payInput} defaultValue="123" /></PayField>
                  </>
                ) : (
                  <>
                    <PayField label="UPI ID"><input className={payInput} defaultValue="name@bank" /></PayField>
                    <PayField label="Account holder"><input className={payInput} defaultValue={draft?.fullName || ""} /></PayField>
                    <PayField label="Phone"><input className={payInput} defaultValue={draft?.phone || ""} /></PayField>
                    <PayField label="OTP"><input className={payInput} defaultValue="" /></PayField>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <label className="mt-5 flex items-center gap-3 text-sm text-foreground/70">
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
                className="h-4 w-4 accent-emerald-400"
              />
              Simulate payment failure for fallback flow testing
            </label>

            {failed ? (
              <div className="mt-5 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground/85">
                <p className="flex items-center gap-2 font-medium text-destructive">
                  <AlertTriangle className="h-4 w-4" /> Payment failed
                </p>
                <p className="mt-2 text-foreground/75">
                  We could not authorize this attempt. Try another method or retry in a moment.
                </p>
              </div>
            ) : null}

            <button
              onClick={complete}
              disabled={loading}
              className="btn-pill mt-7 w-full justify-center px-5! py-3! disabled:opacity-70"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Processing secure payment
                </>
              ) : (
                <>
                  Complete payment <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
          ) : null}

          {draft && role ? (
          <aside className="card-mint rounded-3xl p-5 sm:p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mint/80">Order summary</p>
            <h2 className="mt-4 text-xl font-medium leading-tight sm:text-2xl">{role.title}</h2>
            <p className="mt-3 text-sm text-foreground/65">{role.duration} mentorship track · {role.mode}</p>
            <div className="mt-6 space-y-3 text-sm">
              <SummaryRow label="Program fee" value="$149.00" />
              <SummaryRow label="Platform access" value="$49.00" />
              <SummaryRow label="Tax" value="$20.00" />
              <SummaryRow label="Total due today" value="$218.00" strong />
            </div>
            <p className="mt-6 rounded-xl border border-border/60 bg-background/45 p-3 text-xs text-foreground/55">
              Your payment is encrypted and verified. Receipt and application ID are sent instantly after success.
            </p>
          </aside>
          ) : null}
        </div>
      </FlowShell>
    </SiteLayout>
  );
}

function PayField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">{label}</span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-lg px-2 py-1 ${strong ? "text-base font-medium text-foreground" : "text-foreground/75"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

const payInput =
  "w-full rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-mint/60";
