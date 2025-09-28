"use client";

import { TypeAnimation } from "react-type-animation";

type Props = React.ComponentProps<typeof TypeAnimation>;
type Sequence = Props["sequence"];

export const CTypeAnimation = ({ sequence }: { sequence: Sequence }) => {
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={25}
      repeat={Infinity}
      className={"text-secondary-ceo-500 font-bold w-full"}
    />
  );
};
