import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { Trophy } from "pixelarticons/react";
import { ChampionAvatar } from "./champion-avatar";

type GameCellProps = {
  mode: "search" | "correct" | "indicator" | "logo" | "secondarySearch";
  indicatorImg?: string;
  label?: string;
  championImg?: string;
  championEmoji?: string;
  championName?: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export const GameCell = ({
  mode,
  indicatorImg,
  label,
  championImg,
  championEmoji,
  championName,
  isSelected,
  onClick,
}: GameCellProps) => {
  const content = (
    <motion.div className="flex min-w-0 max-w-full items-center justify-center flex-col gap-1 text-center sm:gap-2">
      {mode === "logo" && <p className="text-2xl sm:text-4xl">R9</p>}
      {mode === "indicator" && (
        <>
          {indicatorImg && (
            <img
              className="max-h-8 max-w-full object-contain sm:max-h-14"
              src={indicatorImg}
              alt={label}
            />
          )}
          {label && (
            <p className="max-w-full break-words text-[0.625rem] uppercase leading-none sm:text-sm">
              {label}
            </p>
          )}
        </>
      )}
      {(mode === "search" || mode === "secondarySearch") && (
        <motion.div className="flex text-xs flex-col justify-center items-center text-muted-foreground sm:text-lg lg:text-xl">
          <Trophy className="size-6 sm:size-8 lg:size-10" />
          <p className="leading-none">FIND CHAMP</p>
        </motion.div>
      )}
      {mode === "correct" && (
        <>
          {championName && (
            <ChampionAvatar
              championName={championName}
              championImg={championImg}
              championEmoji={championEmoji}
              size="lg"
            />
          )}
          <p
            className="max-w-full truncate text-[0.65rem] uppercase leading-none sm:text-sm lg:text-xl"
            title={championName}
          >
            {championName}
          </p>
        </>
      )}
    </motion.div>
  );

  const className = cn(
    "aspect-square min-w-0 overflow-hidden p-1 flex items-center justify-center select-none transition-colors sm:p-2 lg:p-3",
    mode === "search" && "bg-surface cursor-pointer",
    mode === "secondarySearch" && "bg-muted cursor-pointer",
    mode === "correct" && "bg-green-600",
    mode === "indicator" && "bg-purple-surface text-black",
    mode === "logo" && "bg-purple-dark ",
  );

  const shouldPulse = isSelected && mode !== "correct";

  if (onClick) {
    return (
      <motion.button
        type="button"
        className={className}
        animate={
          shouldPulse
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.8, 1, 0.8],
              }
            : {
                scale: 1,
                opacity: 1,
              }
        }
        transition={
          shouldPulse
            ? {
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
              }
            : {
                duration: 0.15,
              }
        }
        onClick={mode !== "correct" ? onClick : () => {}}
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
