"use client";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border border-mint/40 bg-background/45 backdrop-blur-md p-2 px-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-400 hover:border-mint/70 hover:shadow-[0_0_30px_-8px_var(--mint-glow)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-mint transition-all duration-400 group-hover:scale-[1.8] group-hover:shadow-[0_0_14px_var(--mint-glow)]" />
        <span className="inline-block transition-all duration-400 group-hover:-translate-y-1 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 z-[5] bg-background/85 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-foreground opacity-0 transition-all duration-400 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  ),
);
InteractiveHoverButton.displayName = "InteractiveHoverButton";
