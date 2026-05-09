"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const RainbowButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex h-12 cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-all [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,#A7F3D0,#34D399,#10B981,#059669,#A7F3D0)] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
        "bg-[linear-gradient(#0a0f0d,#0a0f0d),linear-gradient(#0a0f0d_50%,rgba(10,15,13,0.6)_80%,rgba(10,15,13,0)),linear-gradient(90deg,#A7F3D0,#34D399,#10B981,#059669,#A7F3D0)]",
        "animate-rainbow",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  ),
);
RainbowButton.displayName = "RainbowButton";
