import { useRef } from "react";
import type { ReactNode } from "react";
import { motionTokens } from "../theme/motion";
import { gsap, useGSAP } from "../animation/gsap";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** 滚动进入视口时淡入上移；尊重 prefers-reduced-motion */
export function Reveal({ children, delay = 0, y = motionTokens.distance.medium, className }: RevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const safeDelay = Math.min(Math.max(delay, 0), motionTokens.stagger.maxItems * motionTokens.stagger.short);
  const safeDistance = Math.min(Math.max(y, 0), motionTokens.distance.medium);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => {
      if (conditions?.reduceMotion) {
        gsap.set(rootRef.current, { clearProps: "all" });
        return;
      }

      gsap.fromTo(rootRef.current,
        { autoAlpha: 0, y: safeDistance, rotateX: 4, transformPerspective: 800 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: motionTokens.duration.enter + 0.15,
          delay: safeDelay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, rootRef);

    return () => mm.revert();
  }, { scope: rootRef, dependencies: [safeDelay, safeDistance], revertOnUpdate: true });

  return <div ref={rootRef} className={className}>{children}</div>;
}
