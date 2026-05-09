"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export function AuroraText({
  children,
  className = "",
  colors = ["#A7F3D0", "#34D399", "#10B981", "#6EE7B7", "#A7F3D0"],
  speed = 1,
}: AuroraTextProps) {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${10 / speed}s`,
  };

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{children}</span>
      <span
        className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
        style={gradientStyle}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
