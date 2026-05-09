"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { FlowShell, WorkflowProgress } from "@/components/sections/internships/FlowShell";
import { storageKeys, type ApplicationDraft } from "@/lib/internships";
import { saveApplication } from "@/lib/admin-store";

type FormState = ApplicationDraft;

const steps = ["Profile", "Education", "Skills", "Links", "Confirm"];

export function RegistrationForm({ role, roleId }: { role: any; roleId: string }) {
  const navigate = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormState>({
    internshipId: role.id,
    fullName: "",
    email: "",
    phone: "",
    university: "",
    degree: "",
    graduationYear: "",
    skills: "",
    portfolio: "",
    linkedin: "",
    resumeName: "",
  });

  const update = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateStep = () => {
    if (step === 0) return form.fullName && form.email && form.phone;
    if (step === 1) return form.university && form.degree && form.graduationYear;
    if (step === 2) return form.skills;
    if (step === 3) return form.portfolio && form.linkedin;
    return true;
  };

  const next = () => {
    setError("");
    if (!validateStep()) {
      setError("Please complete required fields to continue.");
      return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const submit = async () => {
    setError("");
    setLoading(true);
    const payload = { ...form, internshipId: role.id };
    localStorage.setItem(storageKeys.applicationDraft, JSON.stringify(payload));
    localStorage.setItem(storageKeys.selectedInternship, role.id);
    localStorage.setItem(storageKeys.applicationState, "payment_pending");

    // Also save to admin applications store
    saveApplication(payload, "payment_pending");

    await new Promise((resolve) => setTimeout(resolve, 1200));
    navigate.push("/internships/payment");
    setLoading(false);
  };

  return (
    <FlowShell
      backTo="/internships"
      backText="Internships"
      stepLabel="Internship Registration"
      title={
        <>
          Apply for <span className="gradient-text-mint">{role.title}</span>
        </>
      }
      subtitle="Complete your details through a guided premium flow. You can review everything before proceeding to payment."
    >
      <WorkflowProgress steps={steps} activeStep={step} />
      <div className="card-mint rounded-3xl p-5 sm:p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 ? (
              <FieldGrid>
                <Field label="Full name" required>
                  <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass} />
                </Field>
                <Field label="Email" required>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
                </Field>
                <Field label="Phone" required>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
                </Field>
              </FieldGrid>
            ) : null}

            {step === 1 ? (
              <FieldGrid>
                <Field label="University" required>
                  <input value={form.university} onChange={(e) => update("university", e.target.value)} className={inputClass} />
                </Field>
                <Field label="Degree" required>
                  <input value={form.degree} onChange={(e) => update("degree", e.target.value)} className={inputClass} />
                </Field>
                <Field label="Graduation year" required>
                  <input value={form.graduationYear} onChange={(e) => update("graduationYear", e.target.value)} className={inputClass} />
                </Field>
              </FieldGrid>
            ) : null}

            {step === 2 ? (
              <FieldGrid>
                <Field label="Core skills (comma separated)" required>
                  <textarea
                    rows={4}
                    value={form.skills}
                    onChange={(e) => update("skills", e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
                <Field label="Resume upload" required={false}>
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border/60 bg-background/45 px-4 py-3 text-sm text-foreground/70 transition-colors hover:border-mint/50">
                    <span className="truncate pr-3">{form.resumeName || "Upload resume (PDF / DOCX)"}</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => update("resumeName", e.target.files?.[0]?.name || "")}
                    />
                  </label>
                </Field>
              </FieldGrid>
            ) : null}

            {step === 3 ? (
              <FieldGrid>
                <Field label="Portfolio URL" required>
                  <input value={form.portfolio} onChange={(e) => update("portfolio", e.target.value)} className={inputClass} />
                </Field>
                <Field label="LinkedIn profile" required>
                  <input value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} className={inputClass} />
                </Field>
              </FieldGrid>
            ) : null}

            {step === 4 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Internship", role.title],
                  ["Name", form.fullName || "—"],
                  ["Email", form.email || "—"],
                  ["Education", `${form.degree || "—"} · ${form.university || "—"}`],
                  ["Skills", form.skills || "—"],
                  ["Portfolio", form.portfolio || "—"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-border/60 bg-background/40 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">{label}</div>
                    <div className="mt-2 text-sm text-foreground/85">{value}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {error ? <p className="mt-5 text-sm text-destructive">{error}</p> : null}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || loading}
            className="rounded-full border border-border/70 bg-background/45 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-mint/40 hover:text-mint disabled:pointer-events-none disabled:opacity-40"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button onClick={next} className="btn-pill w-full justify-center px-5! py-2.5! sm:w-auto">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={submit} disabled={loading} className="btn-pill w-full justify-center px-5! py-2.5! disabled:opacity-70 sm:w-auto">
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Processing
                </>
              ) : (
                <>
                  Proceed to payment <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </FlowShell>
  );
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
        {label} {required ? <span className="text-mint">*</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-mint/60";
