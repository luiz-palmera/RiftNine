import { useState } from "react";

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
import { isChampionGuessCorrect } from "@/components/game/game-board.utils";
import { SearchBar } from "@/components/ui/search-bar";

export const Daily = () => {
  const [selectedCell, setSelectedCell] = useState<GameBoardPosition>();
  const [searchValue, setSearchValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Select a square to guess...");
  const [guesses, setGuesses] = useState<Record<string, GameBoardGuess>>({});
  const [feedback, setFeedback] = useState("Pick a square");

  const handleCellSelect = (cell: GameBoardPosition) => {
    setSelectedCell(cell);
    setSearchValue("");
    setPlaceholder("Champion name");
    setFeedback(`${cell.row.label} + ${cell.column.label}`);
  };

  const handleGuessSubmit = (value: string) => {
    if (!selectedCell) {
      setFeedback("Pick a square");
      return;
    }

    const solution = mockDailySolutions[selectedCell.id];

    if (!isChampionGuessCorrect(value, solution)) {
      setFeedback("Try another champion");
      return;
    }

    setGuesses((currentGuesses) => ({
      ...currentGuesses,
      [selectedCell.id]: toVisibleGuess(solution),
    }));
    setSearchValue("");
    setFeedback(`${solution.championName} locked in`);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-xl flex flex-col gap-4">
        <GameBoard
          columns={mockDailyGame.columns}
          rows={mockDailyGame.rows}
          guesses={guesses}
          selectedCellId={selectedCell?.id}
          onCellSelect={handleCellSelect}
        />
        <div className="flex flex-col gap-2">
          <p className="text-2xl">{feedback}</p>
          <SearchBar
            value={searchValue}
            placeholder={placeholder}
            disabled={!selectedCell}
            onChange={setSearchValue}
            onSubmit={handleGuessSubmit}
          />
        </div>
      </div>
    </div>
  );
};
