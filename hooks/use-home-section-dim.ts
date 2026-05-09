import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function useHomeSectionDim(selector = "[data-home-section]") {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const sections = gsap.utils.toArray<HTMLElement>(selector);
    if (!sections.length) return;

    const setActive = (activeIndex: number) => {
      sections.forEach((section, index) => {
        // More pronounced cinematic dimming
        const targetOpacity =
          index < activeIndex
            ? 0.45 // Past sections dim significantly
            : index === activeIndex
              ? 1 // Active section fully visible
              : 0.88; // Upcoming sections slightly dimmed

        const targetScale =
          index < activeIndex
            ? 0.985 // Subtle shrink for depth
            : 1;

        gsap.to(section, {
          opacity: targetOpacity,
          scale: targetScale,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    setActive(0);

    const triggers = sections.map((section, index) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
      }),
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      gsap.set(sections, { clearProps: "opacity,transform" });
    };
  }, [selector]);
}
