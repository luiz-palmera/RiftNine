import { cn } from "@/utils/cn";

type ChampionAvatarSize = "sm" | "lg";

type ChampionAvatarProps = {
  championName: string;
  championImg?: string;
  championEmoji?: string;
  size?: ChampionAvatarSize;
  className?: string;
};

const avatarSizeClassNames: Record<ChampionAvatarSize, string> = {
  sm: "size-9 text-2xl sm:size-10 sm:text-3xl",
  lg: "size-12 text-4xl sm:size-16 sm:text-5xl lg:size-20 lg:text-6xl",
};

export const ChampionAvatar = ({
  championName,
  championImg,
  championEmoji,
  size = "lg",
  className,
}: ChampionAvatarProps) => {
  const sizeClassName = avatarSizeClassNames[size];

  if (championImg) {
    return (
      <img
        className={cn(sizeClassName, "object-contain", className)}
        src={championImg}
        alt={championName}
      />
    );
  }

  if (!championEmoji) {
    return null;
  }

  return (
    <span
      className={cn(
        sizeClassName,
        "flex items-center justify-center leading-none",
        className,
      )}
      role="img"
      aria-label={championName}
    >
      {championEmoji}
    </span>
  );
};
