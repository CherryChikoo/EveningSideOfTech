"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="card-mint flex flex-col items-center justify-center rounded-3xl p-8 text-center md:p-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.2,
            }}
            className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-mint/45 bg-mint/10"
          >
            <CheckCircle2 className="h-8 w-8 text-mint" />
          </motion.div>
          <h2 className="text-2xl font-medium tracking-tight">
            Message sent
          </h2>
          <p className="mt-4 max-w-sm text-foreground/65">
            We've received your message and will get back to you within 24
            hours. Thanks for reaching out.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card-mint-hover space-y-5 rounded-3xl p-7 md:p-10"
        >
          {[
            { key: "name", label: "Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
            { key: "company", label: "Company", type: "text" },
          ].map((f) => (
            <div key={f.key}>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                {f.label}{" "}
                {f.key !== "company" && (
                  <span className="text-mint">*</span>
                )}
              </label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form]}
                onChange={(e) => update(f.key, e.target.value)}
                className={`w-full rounded-lg border bg-background/40 px-4 py-3 text-foreground outline-none transition-colors focus:border-mint ${
                  errors[f.key]
                    ? "border-destructive/60"
                    : "border-border"
                }`}
              />
              {errors[f.key] && (
                <p className="mt-1.5 text-xs text-destructive">
                  {errors[f.key]}
                </p>
              )}
            </div>
          ))}
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
              What's on your mind? <span className="text-mint">*</span>
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className={`w-full resize-none rounded-lg border bg-background/40 px-4 py-3 text-foreground outline-none transition-colors focus:border-mint ${
                errors.message
                  ? "border-destructive/60"
                  : "border-border"
              }`}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-destructive">
                {errors.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-pill w-full justify-center disabled:opacity-70"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />{" "}
                Sending…
              </>
            ) : (
              <>
                Send message <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
