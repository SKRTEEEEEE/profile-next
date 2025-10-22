"use client";

import dynamic from 'next/dynamic';
import type { TypeAnimation } from "react-type-animation";

type Props = React.ComponentProps<typeof TypeAnimation>;
type Sequence = Props["sequence"];

// Lazy load TypeAnimation to reduce initial bundle size
const TypeAnimationDynamic = dynamic(
  () => import('react-type-animation').then(mod => ({ default: mod.TypeAnimation })),
  { 
    ssr: false,  // Animation doesn't work on server
    loading: () => (
      <span className="text-secondary-ceo-500 font-bold w-full">
        {/* Show first item of sequence while loading */}
      </span>
    )
  }
);

export const CTypeAnimationLazy = ({ sequence }: { sequence: Sequence }) => {
  return (
    <TypeAnimationDynamic
      sequence={sequence}
      wrapper="span"
      speed={25}
      repeat={Infinity}
      className={"text-secondary-ceo-500 font-bold w-full"}
    />
  );
};
