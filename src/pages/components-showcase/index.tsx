import { GameBoard } from "@/components/game/game-board";
import { mockDailyGame } from "@/components/game/mock-daily-game";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info } from "@/components/ui/info";
import { SearchBar } from "@/components/ui/search-bar";
import { Clock, Trophy } from "pixelarticons/react";

export const ComponentsShowcase = () => {
  return (
    <>
      <div className="bg-purple p-20 text-white text-4xl">
        COMPONENTS SHOWCASE
      </div>{" "}
      <div className="mt-5 flex flex-col p-5 gap-5">
        <h1 className="text-2xl">SOURCE COMPONENTS</h1>
        <div className="flex flex-col gap-4 w-lg">
          <div className="flex gap-2 flex-col">
            <p>BUTTONS:</p>
            <Button title="Daily" variant="default" onClick={() => {}} />
            <Button
              title="Exit"
              variant="destructive"
              onClick={() => {
                console.log("Entrando...");
              }}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <p>Info:</p>
            <Info icon={<Trophy />} title="Score" content={0} />
            <Card title="MATCH INFO">
              <Info icon={<Trophy />} title="Score" content={12} />
              <Info icon={<Clock />} title="Time" content={"2:35"} />
            </Card>
          </div>
          <div className="flex gap-2 flex-col">
            <p>Inputs:</p>
            <SearchBar />
          </div>
          <div className="flex gap-2 flex-col">
            <p>Game:</p>
            <GameBoard
              columns={mockDailyGame.columns}
              rows={mockDailyGame.rows}
            />
          </div>
        </div>
      </div>
    </>
  );
};
