import { cn } from "@/utils/cn";

export type Player = {
  nickname: string;
  tier: string;
  icon?: string;
};

type BannerProps = {
  player: Player;
  variant?: "player" | "rival";
};

export const Banner = ({ player, variant = "player" }: BannerProps) => {
  const isPlayer = variant === "player";

  const backgroundPath = isPlayer
    ? "M0 0 H90 L82 100 H0 Z"
    : "M10 0 H100 V100 H18 Z";

  const borderPath = isPlayer
    ? "M0 0 H90 L82 100 H0"
    : "M100 0 H10 L18 100 H100";

  return (
    <div className="relative min-h-30 w-full">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d={backgroundPath} className="fill-surface" />

        <path
          d={borderPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
          className={isPlayer ? "text-player-blue" : "text-player-red"}
        />
      </svg>

      <div
        className={cn(
          "relative z-10 flex min-h-30 items-center py-6",
          isPlayer ? "pl-6 pr-[20%]" : "justify-end pl-[20%] pr-6",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2",
            !isPlayer && "flex-row-reverse",
          )}
        >
          <div
            className={cn(
              "flex size-18 shrink-0 items-center justify-center",
              "border-[3px] bg-black text-5xl text-white",
              isPlayer ? "border-player-blue" : "border-player-red",
            )}
          >
            {player.icon ?? "?"}
          </div>

          <div
            className={cn("flex flex-col", !isPlayer && "items-end text-right")}
          >
            <p className="text-3xl text-bg">{player.nickname}</p>

            <p
              className={cn(
                "text-2xl",
                isPlayer ? "text-player-blue" : "text-player-red",
              )}
            >
              {player.tier}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
