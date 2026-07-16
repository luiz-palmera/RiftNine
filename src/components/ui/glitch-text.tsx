import { motion } from "motion/react";
import type { Variants } from "motion/react";

const glitchVariants: Variants = {
  idle: {
    x: 0,
    y: 0,
    skewX: 0,
    filter:
      "drop-shadow(0px 0px 0px transparent) drop-shadow(0px 0px 0px transparent)",
  },

  glitch: {
    x: [0, -4, 4, -2, 3, 0],
    y: [0, 1, -1, 0, 1, 0],
    skewX: [0, -4, 4, -2, 2, 0],

    filter: [
      "drop-shadow(0px 0px 0px transparent) drop-shadow(0px 0px 0px transparent)",
      "drop-shadow(-3px 0px 0px cyan) drop-shadow(3px 0px 0px magenta)",
      "drop-shadow(3px 0px 0px cyan) drop-shadow(-3px 0px 0px magenta)",
      "drop-shadow(-2px 0px 0px cyan) drop-shadow(2px 0px 0px magenta)",
      "drop-shadow(2px 0px 0px cyan) drop-shadow(-2px 0px 0px magenta)",
      "drop-shadow(0px 0px 0px transparent) drop-shadow(0px 0px 0px transparent)",
    ],

    transition: {
      duration: 2.3,
      ease: "linear",
      times: [0, 0.15, 0.3, 0.5, 0.75, 1],
    },
  },
};

type GlitchTextProps = {
  active: boolean;
  children: React.ReactNode;
};

export const GlitchText = ({ active, children }: GlitchTextProps) => {
  return (
    <motion.span
      className="inline-block"
      variants={glitchVariants}
      initial="idle"
      animate={active ? "glitch" : "idle"}
    >
      {children}
    </motion.span>
  );
};
