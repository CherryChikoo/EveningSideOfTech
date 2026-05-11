import Link from "next/link";
import { Logo } from "./Logo";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Internships", href: "/internships" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const exploreLinks = [
  { label: "Services", href: "/services" },
  { label: "Internships", href: "/internships" },
  { label: "Browse Roles", href: "/internships" },
  { label: "Status", href: "/internships/status" },
] as const;

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
  { label: "YouTube", href: "#" },
] as const;

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden">
      {/* Atmospheric dark green glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,oklch(0.2_0.06_160/0.5),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Top divider line with glow */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-mint/25 to-transparent" />
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        {/* Upper section: Big statement + CTA */}
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h3 className="text-balance text-[clamp(1.5rem,3.5vw,2.5rem)] font-light leading-[1.15] tracking-tight text-foreground/90">
              We build for{" "}
              <span className="font-serif italic gradient-text-mint">
                those few.
              </span>
            </h3>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full border border-mint/30 bg-mint/5 px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-sm transition-all duration-500 hover:border-mint/60 hover:text-mint hover:shadow-[0_0_30px_-8px_var(--mint-glow)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mint transition-transform duration-500 group-hover:scale-150" />
            Get in touch
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-border/30 via-border/20 to-border/30" />

        {/* Links grid */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand column */}
          <div>
            <Logo className="text-foreground" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground/40">
              Premium AI internship tracks for operators, builders, and high-agency talent.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-foreground/40">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label + link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/55 transition-colors duration-300 hover:text-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-foreground/40">
              Social
            </h4>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/55 transition-colors duration-300 hover:text-mint"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-foreground/40">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-foreground/55 transition-colors duration-300 hover:text-mint"
                >
                  Get in touch
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@eveningsideoftech.ai"
                  className="text-sm text-foreground/55 transition-colors duration-300 hover:text-mint"
                >
                  Email us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 h-px w-full bg-border/15" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[0.7rem] text-foreground/30 sm:flex-row">
          <span className="font-mono tracking-widest">
            &copy; {new Date().getFullYear()} EveningSideOfTech
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-foreground/60"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-foreground/15">|</span>
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-foreground/60"
            >
              Privacy Policy
            </Link>
            <span className="text-foreground/15">|</span>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-foreground/60"
            >
              LinkedIn
            </a>
            <span className="text-foreground/15">|</span>
            <a
              href="mailto:hello@eveningsideoftech.ai"
              className="transition-colors duration-300 hover:text-foreground/60"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
