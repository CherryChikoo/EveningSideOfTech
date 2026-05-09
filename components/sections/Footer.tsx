import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border/40 pt-24 pb-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[400px] bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,oklch(0.35_0.12_160/0.4),transparent_70%)]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-15" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo className="text-foreground" />
            <p className="mt-6 max-w-sm text-foreground/60">
              Premium AI internship tracks designed for operators, builders, and high-agency talent.
            </p>
            <Link href="/internships" className="btn-pill mt-8">
              Explore internships <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <FooterCol
            title="Platform"
            links={[
              ["Internships", "/internships"],
              ["Services", "/services"],
              ["About", "/about"],
              ["Admin", "/admin"],
            ]}
          />
          <FooterCol
            title="Apply"
            links={[
              ["Browse Roles", "/internships"],
              ["Track Status", "/internships/status"],
              ["Contact", "/contact"],
            ]}
          />
          <FooterCol
            title="Connect"
            links={[
              ["YouTube", "#"],
              ["LinkedIn", "#"],
              ["X / Twitter", "#"],
            ]}
          />
        </div>
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-8 text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 md:flex-row">
          <span>© {new Date().getFullYear()} EveningSideOfTech AI</span>
          <span>Built for builders</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <div className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-foreground/50">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            {href.startsWith("/") ? (
              <Link
                href={href}
                className="text-foreground/80 transition-colors hover:text-mint"
              >
                {label}
              </Link>
            ) : (
              <a
                href={href}
                className="text-foreground/80 transition-colors hover:text-mint"
              >
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
