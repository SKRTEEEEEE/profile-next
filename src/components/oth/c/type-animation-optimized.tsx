"use client";

import { useEffect, useState } from "react";

type Props = {
  sequence: Array<string | number>;
};

export const CTypeAnimationOptimized = ({ sequence }: Props) => {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [TypeAnimation, setTypeAnimation] = useState<any>(null);

  useEffect(() => {
    // Defer loading TypeAnimation until after LCP
    // This prevents blocking the critical render path
    const loadAnimation = async () => {
      const mod = await import("react-type-animation");
      setTypeAnimation(() => mod.TypeAnimation);
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setMounted(true);
        loadAnimation();
      });
    } else {
      // Fallback: wait 2 seconds to ensure LCP has painted
      setTimeout(() => {
        setMounted(true);
        loadAnimation();
      }, 2000);
    }
  }, []);

  // Always show the first text immediately (no waiting for JS)
  // This makes the h2 element paint immediately for LCP
  if (!mounted || !TypeAnimation) {
    return (
      <span className="text-secondary-ceo-500 font-bold w-full">
        {sequence[0] as string}
      </span>
    );
  }

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={25}
      repeat={Infinity}
      className="text-secondary-ceo-500 font-bold w-full"
    />
  );
};
