import { Banner, type Player } from "./components/banner";
import { MatchBadge } from "./components/match-badge";

export type MatchType = "md5" | "md3";

type ScoreboardProps = {
  player: Player;
  playerScore: number;
  rivalScore: number;
  matchType: MatchType;
};

export const Scoreboard = ({
  player,
  playerScore,
  rivalScore,
  matchType,
}: ScoreboardProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex  w-full items-center">
        <Banner player={player} />
        <div className="items-center flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-5xl gap-12 flex items-center">
              <span className="text-8xl text-player-blue">{playerScore}</span> x{" "}
              <span className="text-8xl text-player-red">{rivalScore}</span>
            </p>
          </div>
        </div>
        <Banner variant="rival" player={player} />
      </div>
      <MatchBadge matchType={matchType} />
    </div>
  );
};
