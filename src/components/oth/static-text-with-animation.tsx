"use client";

import { useEffect, useState } from "react";

type Props = {
  staticText: string;
  sequence: Array<string | number>;
  className?: string;
};

// This component renders static text immediately for LCP
// Then loads animation after page is idle
export function StaticTextWithAnimation({ staticText, sequence, className }: Props) {
  const [showAnimation, setShowAnimation] = useState(false);
   
  const [TypeAnimation, setTypeAnimation] = useState<any>(null);

  useEffect(() => {
    // Only load animation after everything else is done
    const timer = setTimeout(() => {
      import("react-type-animation").then((mod) => {
        setTypeAnimation(() => mod.TypeAnimation);
        setShowAnimation(true);
      });
    }, 3000); // Wait 3 seconds after page load

    return () => clearTimeout(timer);
  }, []);

  // Always render static text first - this ensures h2 paints immediately
  if (!showAnimation || !TypeAnimation) {
    return <span className={className}>{staticText}</span>;
  }

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={25}
      repeat={Infinity}
      className={className}
    />
  );
}
