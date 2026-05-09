"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteLayout } from "@/components/sections/Layout";
import { Services } from "@/components/sections/Services";
import { motion } from "framer-motion";



export default function ServicesPage(props: any) {
  return (
    <SiteLayout>
      <section className="relative pt-48 pb-12 text-center">
        <div className="absolute inset-0 -z-10 radial-glow" />
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text-mint mx-auto max-w-5xl px-6 text-balance text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.95] tracking-tight"
        >
          How we work.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl px-6 text-lg text-foreground/70"
        >
          A three-step process that turns AI from a buzzword into a measurable business outcome.
        </motion.p>
      </section>
      <Services />
    </SiteLayout>
  );
}
