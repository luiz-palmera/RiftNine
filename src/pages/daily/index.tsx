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
import { Clock, Heart, Trophy } from "pixelarticons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type MatchChatMessage = {
  id: number;
  content: string;
  tone: "system" | "success" | "error";
};

type MatchChatProps = {
  messages: MatchChatMessage[];
};

const MatchChat = ({ messages }: MatchChatProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="p-0.5 bg-purple clip-chamfer">
      <div className="clip-chamfer bg-bg px-3 py-2 min-h-34 flex flex-col">
        <p className="text-purple-light text-xl leading-none">MATCH CHAT</p>
        <div
          ref={messagesRef}
          className="mt-2 flex max-h-28 flex-1 flex-col gap-1 overflow-y-auto pr-1 [scrollbar-color:var(--color-purple-light)_var(--color-bg)] [scrollbar-width:thin]"
        >
          {messages.map((message) => (
            <p
              key={message.id}
              className={cn(
                "text-lg leading-none",
                message.tone === "system" && "text-muted-foreground",
                message.tone === "success" && "text-green-400",
                message.tone === "error" && "text-red-accent",
              )}
            >
              <span className="text-purple-light">[R9]</span> {message.content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

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
    <div className="gap-3 min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-xl flex flex-col gap-4">
        <GameBoard
          columns={mockDailyGame.columns}
          rows={mockDailyGame.rows}
          guesses={guesses}
          selectedCellId={selectedCell?.id}
          onCellSelect={handleCellSelect}
        />
        <div className="flex flex-col gap-2">
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
      <div className="w-full max-w-sm ">
        <Card title="MATCH INFO">
          <Info content={"2:30"} icon={<Clock />} title="Time" />
          <Info content={"3"} icon={<Heart />} title="Lives" />
          <Info content={"3"} icon={<Trophy />} title="Score" />
          <MatchChat messages={chatMessages} />
          <Button title="SURRENDER" onClick={() => {}} variant="destructive" />
        </Card>
      </div>
    </div>
  );
};
