import { cn } from "@/utils/cn";
import { motion } from "motion/react";

type ButtonProps = {
  title: string;
  variant?: "default" | "destructive" | "success";
  onClick: () => void;
};

export const Button = ({
  title,
  variant = "default",
  onClick,
}: ButtonProps) => {
  return (
    <motion.button
      type="button"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "cursor-pointer border-0 p-0.5 text-surface clip-chamfer",
        variant === "default" && "bg-purple-dark",
        variant === "destructive" && " bg-red-shadow ",
      )}
      onClick={onClick}
    >
      <motion.div
        className={cn(
          "items-center justify-center flex clip-chamfer px-6 py-2 cursor-pointer pixel-shadow",
          variant === "default" && "bg-purple hover:bg-purple-accent",
          variant === "destructive" &&
            "pixel-shadow bg-red hover:bg-red-accent ",
        )}
      >
        <p className="text-2xl">{title}</p>
      </motion.div>
    </motion.button>
  );
};
