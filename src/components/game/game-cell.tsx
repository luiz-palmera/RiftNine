import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { Trophy } from "pixelarticons/react";

type GameCellProps = {
  mode: "search" | "correct" | "indicator" | "logo" | "secondarySearch";
  indicatorImg?: string;
  label?: string;
  championImg?: string;
  championName?: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export const GameCell = ({
  mode,
  indicatorImg,
  label,
  championImg,
  championName,
  isSelected,
  onClick,
}: GameCellProps) => {
  const content = (
    <motion.div className="flex items-center justify-center flex-col gap-2 text-center">
      {mode === "logo" && <p className="text-4xl">R9</p>}
      {mode === "indicator" && (
        <>
          {indicatorImg && (
            <img
              className="max-h-14 object-contain"
              src={indicatorImg}
              alt={label}
            />
          )}
          {label && <p className="text-sm uppercase leading-none">{label}</p>}
        </>
      )}
      {(mode === "search" || mode === "secondarySearch") && (
        <motion.div className="flex text-xl flex-col justify-center items-center text-muted-foreground">
          <Trophy className="size-10" />
          <p>FIND CHAMP</p>
        </motion.div>
      )}
      {mode === "correct" && (
        <>
          {championImg && (
            <img
              className="h-20 object-contain"
              src={championImg}
              alt={championName}
            />
          )}
          <p className="text-xl uppercase leading-none">{championName}</p>
        </>
      )}
    </motion.div>
  );

  const className = cn(
    "p-3 aspect-square flex items-center justify-center select-none transition-colors",
    mode === "search" && "bg-surface cursor-pointer",
    mode === "secondarySearch" && "bg-muted cursor-pointer",
    mode === "correct" && "bg-green-600",
    mode === "indicator" && "bg-purple-surface text-black",
    mode === "logo" && "bg-purple-dark ",
    isSelected && "outline-3 outline-purple-light outline-offset-[-6px]",
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        className={className}
        onClick={onClick}
        aria-label={label}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.div className={className} aria-label={label}>
      {content}
    </motion.div>
  );
};
