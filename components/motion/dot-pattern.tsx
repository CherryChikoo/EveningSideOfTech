"use client";
import { cn } from "@/lib/utils";
import React, { useId } from "react";

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  glow?: boolean;
}

export function DotPattern({
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
  glow = false,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full fill-mint/30", className)}
      {...props}
    >
      <defs>
        <pattern id={`${id}-dots`} width={width} height={height} patternUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
        {glow && (
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-dots)`} opacity={glow ? 0.65 : 1} />
      {glow ? <rect width="100%" height="100%" fill={`url(#${id}-glow)`} className="anim-pulse-glow" /> : null}
    </svg>
  );
}
