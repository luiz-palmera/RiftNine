import { motion } from "motion/react";
import type { ReactNode } from "react";

type IconButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

export const IconButton = ({ onClick, children }: IconButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className=" p-1 text-surface cursor-pointer"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
