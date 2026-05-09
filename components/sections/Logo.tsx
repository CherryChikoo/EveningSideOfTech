export function Logo({ wordmark = true, className = "" }: { wordmark?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 40 32" className="h-6 w-auto" fill="none">
        <path d="M2 30 L10 8 L18 24 L26 4 L34 22 L38 14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
      {wordmark && <span className="text-xl font-medium tracking-tight">EveningSideOfTech</span>}
    </div>
  );
}
