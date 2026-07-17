import { motion } from "motion/react";
import type { Variants } from "motion/react";

type GlitchVariant = "default" | "destructive" | "success";

type GlitchColors = {
  left: string;
  right: string;
  text: string;
};

const glitchStyles = {
  default: {
    left: "cyan",
    right: "magenta",
    text: "text-purple",
  },
  destructive: {
    left: "orange",
    right: "red",
    text: "text-red-500",
  },
  success: {
    left: "lime",
    right: "green",
    text: "text-green-500",
  },
} satisfies Record<GlitchVariant, GlitchColors>;

const transparentFilter =
  "drop-shadow(0px 0px 0px transparent drop-shadow(0px 0px 0px transparent)";

const glitchVariants: Variants = {
  idle: {
    x: 0,
    y: 0,
    skewX: 0,
    filter: transparentFilter,
  },

  glitch: (colors: GlitchColors) => ({
    x: [0, -4, 4, -2, 3, 0],
    y: [0, 1, -1, 0, 1, 0],
    skewX: [0, -4, 4, -2, 2, 0],

    filter: [
      transparentFilter,
      `drop-shadow(-3px 0px 0px ${colors.left}) drop-shadow(3px 0px 0px ${colors.right})`,
      `drop-shadow(3px 0px 0px ${colors.left}) drop-shadow(-3px 0px 0px ${colors.right})`,
      `drop-shadow(-2px 0px 0px ${colors.left}) drop-shadow(2px 0px 0px ${colors.right})`,
      `drop-shadow(2px 0px 0px ${colors.left}) drop-shadow(-2px 0px 0px ${colors.right})`,
      transparentFilter,
    ],

    transition: {
      duration: 2.3,
      ease: "linear",
      times: [0, 0.15, 0.3, 0.5, 0.75, 1],
    },
  }),
};

type GlitchTextProps = {
  active: boolean;
  children: React.ReactNode;
  variant?: GlitchVariant;
};

export const GlitchText = ({
  active,
  children,
  variant = "default",
}: GlitchTextProps) => {
  const styles = glitchStyles[variant];
  return (
    <motion.span
      className="inline-block"
      custom={styles}
      variants={glitchVariants}
      initial="idle"
      animate={active ? "glitch" : "idle"}
    >
      {children}
    </motion.span>
  );
};
