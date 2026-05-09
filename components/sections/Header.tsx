import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { InteractiveHoverButton } from "@/components/motion/interactive-hover-button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Internships", to: "/internships" },
  { label: "About", to: "/about" },
  { label: "Status", to: "/internships/status" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = usePathname() || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-xl bg-background/60 border-b border-border/40 shadow-[0_4px_30px_oklch(0.1_0.02_160/0.3)]"
          : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="text-foreground transition-opacity hover:opacity-80">
          <Logo wordmark={!scrolled} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.to || currentPath.startsWith(link.to + "/");
            return (
              <Link
                key={link.to}
                href={link.to}
                className={`relative text-sm font-medium transition-colors ${
                  isActive
                    ? "text-mint"
                    : "text-foreground/80 hover:text-mint"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 mx-auto h-[2px] w-4 rounded-full bg-mint"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="hidden sm:block">
          <InteractiveHoverButton>Get in touch</InteractiveHoverButton>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/50 text-foreground/80 transition-colors hover:border-mint/40 hover:text-mint md:hidden"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={menuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-6 mt-3 overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-2 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-0.5">
              {[
                { label: "Home", to: "/" },
                ...navLinks,
                { label: "Contact", to: "/contact" },
              ].map((link) => {
                const isActive =
                  link.to === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(link.to);
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-mint/10 text-mint"
                        : "text-foreground/80 hover:bg-mint/5 hover:text-mint"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
