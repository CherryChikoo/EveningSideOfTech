import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

export function useGsapReveal(scopeSelector: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`${scopeSelector} [data-reveal]`).forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.05,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [scopeSelector]);
}
