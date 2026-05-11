"use client";
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/sections/Layout";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicePhaseContent } from "@/components/sections/services/ServicePhase";
import { ServicesBigStatement } from "@/components/sections/services/ServicesBigStatement";
import { servicePhases } from "@/lib/services-data";
import "./services-page.css";

export default function ServicesPage() {
  const [activeSlug, setActiveSlug] = useState(servicePhases[0].slug);

  const activePhase = servicePhases.find((p) => p.slug === activeSlug) ?? servicePhases[0];

  const handlePhaseClick = useCallback((slug: string) => {
    setActiveSlug(slug);
  }, []);

  return (
    <SiteLayout>
      <div className="services-page">
        {/* Hero + Tab Navigation */}
        <ServicesHero
          activePhase={activeSlug}
          onPhaseClick={handlePhaseClick}
        />

        {/* Active Phase Content */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <AnimatePresence mode="wait">
            <ServicePhaseContent key={activeSlug} phase={activePhase} />
          </AnimatePresence>
        </section>
      </div>
    </SiteLayout>
  );
}
