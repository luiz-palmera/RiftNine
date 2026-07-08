import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { Computer } from "pixelarticons/react";

type GameCellProps = {
  mode: "search" | "correct" | "indicator" | "logo";
};

export const GameCell = ({ mode }: GameCellProps) => {
  return (
    <motion.div
      className={cn(
        "p-3 aspect-square flex items-center justify-center",
        mode === "search" && "bg-surface",
        mode === "correct" && "bg-green-600",
        mode === "indicator" && "bg-purple-surface",
        mode === "logo" && "bg-purple-dark",
      )}
    >
      <motion.div className="flex items-center justify-center flex-col gap-2">
        {mode === "logo" ? (
          <p className="text-4xl">R9</p>
        ) : (
          <>
            <Computer />
            <p>Find a champion</p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
