"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteLayout } from "@/components/sections/Layout";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { WhyBuilt } from "@/components/sections/WhyBuilt";
import { Services } from "@/components/sections/Services";
import { BigStatement } from "@/components/sections/BigStatement";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { useHomeSectionDim } from "@/hooks/use-home-section-dim";



export default function Home(props: any) {
  useHomeSectionDim();

  return (
    <SiteLayout>
      <div data-home-section><Hero /></div>
      <div data-home-section><Story /></div>
      <div data-home-section><WhyBuilt /></div>
      <div data-home-section><Services /></div>
      <div data-home-section><CaseStudies /></div>
      <div data-home-section><Testimonials /></div>
      <div data-home-section><Stats /></div>
      <div data-home-section><BigStatement /></div>
      <div data-home-section><FAQ /></div>
      <div data-home-section><FinalCTA /></div>
    </SiteLayout>
  );
}
