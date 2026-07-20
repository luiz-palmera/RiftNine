import type { MatchType } from "..";

type MatchBadgeProps = {
  matchType: MatchType;
};

export const MatchBadge = ({ matchType }: MatchBadgeProps) => {
  const matchLabels = (type: MatchType) => {
    return type === "md3" ? "Best of Three" : "Best of Five";
  };
  return (
    <div className="bg-purple-accent text-2xl text-bg px-3">
      {matchLabels(matchType)}
    </div>
  );
};
