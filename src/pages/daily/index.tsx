import { useEffect, useRef, useState } from "react";

import { GameBoard } from "@/components/game/game-board";
import {
  mockDailyGame,
  mockDailySolutions,
  toVisibleGuess,
} from "@/components/game/mock-daily-game";
import type {
  GameBoardGuess,
  GameBoardPosition,
} from "@/components/game/game-board.types";
import {
  findChampionGuessMatch,
  getNextOpenGameBoardPosition,
} from "@/components/game/game-board.utils";
import { SearchBar } from "@/components/ui/search-bar";
import { Card } from "@/components/ui/card";
import { Info } from "@/components/ui/info";
import { Calendar2, Clock, Heart, Trophy } from "pixelarticons/react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { MatchChat, type MatchChatMessage } from "@/components/game/match-chat";

export const Daily = () => {
  const [selectedCell, setSelectedCell] = useState<GameBoardPosition>();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const nextChatMessageId = useRef(2);
  const [searchValue, setSearchValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Select a square to guess...");
  const [guesses, setGuesses] = useState<Record<string, GameBoardGuess>>({});
  const [selectedCriteria, setSelectedCriteria] = useState("Pick a square");
  const [chatMessages, setChatMessages] = useState<MatchChatMessage[]>([
    {
      id: 1,
      content: "Rift Nine match started.",
      tone: "system",
    },
  ]);

  const focusSearchInput = () => {
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const pushChatMessage = (content: string, tone: MatchChatMessage["tone"]) => {
    const nextMessage = {
      id: nextChatMessageId.current,
      content,
      tone,
    };

    nextChatMessageId.current += 1;

    setChatMessages((currentMessages) => [...currentMessages, nextMessage]);
  };

  useEffect(() => {
    if (selectedCell) {
      focusSearchInput();
    }
  }, [selectedCell]);

  const handleCellSelect = (cell: GameBoardPosition) => {
    setSelectedCell(cell);
    setSearchValue("");
    setPlaceholder("Champion name");
    setSelectedCriteria(`${cell.row.label} + ${cell.column.label}`);
    focusSearchInput();
  };

  const handleGuessSubmit = (value: string) => {
    if (!selectedCell) {
      setSelectedCriteria("Pick a square");
      pushChatMessage("Pick a square first.", "error");
      return;
    }

    const solution = findChampionGuessMatch(
      value,
      mockDailySolutions[selectedCell.id],
    );

    if (!solution) {
      pushChatMessage("Try another champion.", "error");
      focusSearchInput();
      return;
    }

    const nextGuesses = {
      ...guesses,
      [selectedCell.id]: toVisibleGuess(solution),
    };
    const nextCell = getNextOpenGameBoardPosition({
      rows: mockDailyGame.rows,
      columns: mockDailyGame.columns,
      guesses: nextGuesses,
      currentCellId: selectedCell.id,
    });

    setGuesses(nextGuesses);
    setSearchValue("");
    pushChatMessage(`${solution.championName} locked in.`, "success");

    if (!nextCell) {
      setSelectedCell(undefined);
      setPlaceholder("Board complete");
      setSelectedCriteria("Board complete");
      pushChatMessage("Board complete.", "system");
      return;
    }

    setSelectedCell(nextCell);
    setPlaceholder("Champion name");
    setSelectedCriteria(`${nextCell.row.label} + ${nextCell.column.label}`);
  };

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-6.5rem)] items-start justify-center px-6 pt-10 pb-8">
        <div className="grid w-full max-w-5xl grid-cols-[minmax(0,36rem)_minmax(0,24rem)] items-stretch gap-3">
          <div className="col-start-1 row-start-1">
            <GameBoard
              columns={mockDailyGame.columns}
              rows={mockDailyGame.rows}
              guesses={guesses}
              selectedCellId={selectedCell?.id}
              onCellSelect={handleCellSelect}
            />
          </div>

          <div className="col-start-2 row-start-1 flex min-h-0 flex-col">
            <div className="flex items-center gap-2 text-4xl text-purple">
              <Calendar2 />
              <p>Daily Challenge</p>
            </div>

            <div className="flex-1">
              <Card title="MATCH INFO">
                <Info content="2:30" icon={<Clock />} title="Time" />
                <Info content="3" icon={<Heart />} title="Lives" />
                <Info content="3" icon={<Trophy />} title="Score" />

                <MatchChat messages={chatMessages} />

                <Button
                  title="SURRENDER"
                  onClick={() => {}}
                  variant="destructive"
                />
              </Card>
            </div>
          </div>

          <div className="col-start-1 row-start-2 flex flex-col gap-2">
            <p className="text-2xl">{selectedCriteria}</p>

            <SearchBar
              ref={searchInputRef}
              value={searchValue}
              placeholder={placeholder}
              disabled={!selectedCell}
              onChange={setSearchValue}
              onSubmit={handleGuessSubmit}
            />
          </div>
        </div>
      </main>
    </>
  );
};
