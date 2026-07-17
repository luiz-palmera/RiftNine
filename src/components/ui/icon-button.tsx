import { motion } from "motion/react";
import type { ReactNode } from "react";

type IconButtonProps = {
  onClick: () => void;
  children: ReactNode;
  "aria-label"?: string;
};

export const IconButton = ({
  onClick,
  children,
  "aria-label": ariaLabel,
}: IconButtonProps) => {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-1 text-surface"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
};
