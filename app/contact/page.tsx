"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteLayout } from "@/components/sections/Layout";
import { motion } from "framer-motion";
import { DotPattern } from "@/components/motion/dot-pattern";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage(props: any) {
  return (
    <SiteLayout>
      <section className="relative min-h-[100svh] pt-40 pb-32">
        <div className="absolute inset-0 -z-10 radial-glow" />
        <DotPattern
          glow
          className="opacity-20 [mask-image:radial-gradient(ellipse_50%_40%_at_50%_30%,black,transparent)]"
        />

        {/* Orbs */}
        <div className="orb orb-mint absolute right-[10%] top-[25%] h-[200px] w-[200px] anim-float-slow" />
        <div className="orb orb-teal absolute left-[5%] bottom-[30%] h-[150px] w-[150px] anim-float-alt" />

        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-mint backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
              Get in touch
            </p>
            <h1 className="gradient-text-mint text-balance text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1] tracking-tight">
              Let's build something that matters.
            </h1>
            <p className="mt-8 max-w-md text-lg text-foreground/70">
              Whether you're applying for an internship, exploring a
              partnership, or just curious — we'd love to hear from you.
            </p>

            {/* Info cards */}
            <div className="mt-10 space-y-4">
              <div className="card-mint rounded-xl p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                  Response time
                </div>
                <div className="mt-1 text-sm text-foreground/80">
                  Within 24 hours on business days
                </div>
              </div>
              <div className="card-mint rounded-xl p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                  Email
                </div>
                <div className="mt-1 text-sm text-mint">
                  hello@EveningSideOfTech.ai
                </div>
              </div>
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </section>
    </SiteLayout>
  );
}
