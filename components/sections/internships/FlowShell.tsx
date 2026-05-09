import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FlowShellProps = {
  title: React.ReactNode;
  subtitle: string;
  stepLabel?: string;
  children: React.ReactNode;
  backTo?: string;
  backText?: string;
};

export function FlowShell({
  title,
  subtitle,
  stepLabel,
  children,
  backTo,
  backText = "Back",
}: FlowShellProps) {
  return (
    <section className="relative min-h-svh overflow-hidden pt-40 pb-24">
      <div className="absolute inset-0 -z-10 radial-glow" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="mx-auto max-w-6xl px-6">
        {backTo ? (
          <Link
            href={backTo}
            className="mb-8 inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/70 transition-colors hover:border-mint/50 hover:text-mint"
          >
            <ChevronLeft className="h-4 w-4" /> {backText}
          </Link>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-3xl"
        >
          {stepLabel ? (
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-mint/80">
              {stepLabel}
            </p>
          ) : null}
          <h1 className="text-balance text-[clamp(2rem,5.4vw,4.6rem)] font-light leading-[1.02] tracking-tight">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/65">
            {subtitle}
          </p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

/**
 * Clickable workflow progress bar — each completed/active step links
 * to its corresponding route so users can navigate the flow.
 */
const defaultStepRoutes: Record<string, string> = {
  Listing: "/internships",
  Registration: "/internships",
  Payment: "/internships/payment",
  Confirmation: "/internships/confirmation",
  Tracking: "/internships/status",
};

export function WorkflowProgress({
  steps,
  activeStep,
  stepRoutes,
}: {
  steps: string[];
  activeStep: number;
  stepRoutes?: Record<string, string>;
}) {
  const routes = stepRoutes || defaultStepRoutes;

  return (
    <nav
      aria-label="Application progress"
      className="mb-10 flex items-center gap-1 overflow-x-auto rounded-2xl border border-border/50 bg-background/40 p-2 backdrop-blur-xl sm:gap-2 sm:p-3"
    >
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isCurrent = index === activeStep;
        const isClickable = isCompleted || isCurrent;
        const route = routes[step];

        const className = cn(
          "relative flex-none w-max rounded-xl border px-3 py-2 text-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all whitespace-nowrap",
          isCurrent
            ? "border-mint/60 bg-mint/10 text-mint font-medium"
            : isCompleted
              ? "border-mint/30 bg-mint/5 text-mint/70 hover:bg-mint/10 hover:text-mint cursor-pointer"
              : "border-border/60 bg-background/40 text-foreground/40",
        );

        const content = (
          <>
            <span className="flex items-center justify-center gap-1.5">
              {isCompleted && (
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint/60" />
              )}
              {isCurrent && (
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
              )}
              {step}
            </span>
          </>
        );

        if (isClickable && route) {
          return (
            <Link key={step} href={route} className={className}>
              {content}
            </Link>
          );
        }

        return (
          <div key={step} className={className}>
            {content}
          </div>
        );
      })}
    </nav>
  );
}
