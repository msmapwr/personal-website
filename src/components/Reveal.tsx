import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionTokens } from "../theme/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** 滚动进入视口时淡入上移；尊重 prefers-reduced-motion */
export function Reveal({ children, delay = 0, y = motionTokens.distance.medium, className }: RevealProps) {
  const reduce = useReducedMotion();
  const safeDelay = Math.min(Math.max(delay, 0), motionTokens.stagger.maxItems * motionTokens.stagger.short);
  const safeDistance = Math.min(Math.max(y, 0), motionTokens.distance.medium);

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: safeDistance }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.15 }}
      transition={{ duration: motionTokens.duration.enter, delay: safeDelay, ease: motionTokens.easing }}
    >
      {children}
    </motion.div>
  );
}
