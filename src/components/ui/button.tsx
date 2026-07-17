import { cn } from "@/utils/cn";
import { motion } from "motion/react";

type ButtonProps = {
  title: string;
  variant?: "default" | "destructive" | "success" | "disabled";
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  title,
  variant = "default",
  disabled,
  onClick,
}: ButtonProps) => {
  const isDisabled = disabled || variant === "disabled";

  return (
    <motion.button
      type="button"
      disabled={isDisabled}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1, transition: { duration: 0.2 } }}
      whileHover={isDisabled ? undefined : { scale: 1.05 }}
      whileTap={isDisabled ? undefined : { scale: 0.95 }}
      className={cn(
        "cursor-pointer border-0 p-0.5 text-surface clip-chamfer",
        variant === "default" && "bg-purple-dark",
        variant === "destructive" && " bg-red-shadow ",
        variant === "disabled" && "cursor-not-allowed bg-gray-500",
      )}
      onClick={onClick}
    >
      <motion.div
        className={cn(
          "items-center justify-center flex clip-chamfer px-6 py-2 cursor-pointer pixel-shadow",
          variant === "default" && "bg-purple hover:bg-purple-accent",
          variant === "destructive" &&
            "pixel-shadow bg-red hover:bg-red-accent ",
          variant === "disabled" &&
            "cursor-not-allowed bg-gray-300 text-gray-500",
        )}
      >
        <p className="text-2xl">{title}</p>
      </motion.div>
    </motion.button>
  );
};
