"use client";

import { m, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = { children: ReactNode; delay?: number; className?: string };

const shown = { opacity: 1, y: 0 };
const hidden = { opacity: 0, y: 16 };

/**
 * Subtle fade-up when scrolled into view.
 * Server HTML is fully visible (no-JS and crawlers see everything); only elements that start
 * below the fold are hidden after hydration, then revealed. Reduced motion is handled by MotionConfig.
 */
export function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect && rect.top > window.innerHeight) setArmed(true);
  }, []);

  const visible = !armed || inView;

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={visible ? shown : hidden}
      transition={visible ? { duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] } : { duration: 0 }}
    >
      {children}
    </m.div>
  );
}
