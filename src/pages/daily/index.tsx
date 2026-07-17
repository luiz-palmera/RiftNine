import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { GameBoard } from "@/components/game/game-board";
import {
  mockDailyChampionOptions,
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
  normalizeChampionGuess,
} from "@/components/game/game-board.utils";
import { SearchBar } from "@/components/ui/search-bar";
import { Card } from "@/components/ui/card";
import { Info } from "@/components/ui/info";
import { Calendar2, Clock, Heart, Trophy } from "pixelarticons/react";
import { Header } from "@/components/ui/header";
import { MatchChat, type MatchChatMessage } from "@/components/game/match-chat";
import useTimer from "@/hooks/useTimer";
import { ResultModal } from "./components/result-moda";

const getTimeBonus = (elapsedSeconds: number) => {
  return Math.max(0, 90 - Math.floor(elapsedSeconds / 2));
};

const getChallengeDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getChampionAutocompleteSuggestions = (value: string) => {
  const normalizedValue = normalizeChampionGuess(value);

  if (!normalizedValue) {
    return [];
  }

  return mockDailyChampionOptions
    .filter((champion) =>
      normalizeChampionGuess(champion.championName).startsWith(
        normalizedValue,
      ),
    )
    .slice(0, 5)
    .map(({ championId, championName, championImg, championEmoji }) => ({
      id: championId,
      label: championName,
      imageSrc: championImg,
      emoji: championEmoji,
    }));
};

export const Daily = () => {
  const { formattedTime, seconds, stop } = useTimer();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const nextChatMessageId = useRef(2);
  const [challengeDate] = useState(getChallengeDate);
  const [lives, setLives] = useState(3);
  const [selectedCell, setSelectedCell] = useState<GameBoardPosition>();
  const [score, setScore] = useState(90);
  const [searchValue, setSearchValue] = useState("");
  const [searchBarVariant, setSearchBarVariant] = useState<
    "default" | "destructive"
  >("default");
  const [searchBarShakeKey, setSearchBarShakeKey] = useState(0);
  const [placeholder, setPlaceholder] = useState("Select a square to guess...");
  const [showResults, setShowResults] = useState(false);
  const [resultTime, setResultTime] = useState("00:00");
  const [timeBonus, setTimeBonus] = useState(0);
  const [guesses, setGuesses] = useState<Record<string, GameBoardGuess>>({});
  const [missedCellIds, setMissedCellIds] = useState<Record<string, boolean>>(
    {},
  );
  const [selectedCriteria, setSelectedCriteria] = useState("Pick a square");
  const [chatMessages, setChatMessages] = useState<MatchChatMessage[]>([
    {
      id: 1,
      content: "Rift Nine match started.",
      tone: "system",
    },
  ]);
  const championSuggestions = useMemo(
    () => getChampionAutocompleteSuggestions(searchValue),
    [searchValue],
  );

  const focusSearchInput = useCallback(() => {
    if (lives <= 0 || showResults) {
      return;
    }

    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  }, [lives, showResults]);

  const pushChatMessage = (content: string, tone: MatchChatMessage["tone"]) => {
    const nextMessage = {
      id: nextChatMessageId.current,
      content,
      tone,
    };

    nextChatMessageId.current += 1;

    setChatMessages((currentMessages) => [...currentMessages, nextMessage]);
  };

  const finishMatch = (finalBoardScore: number, completedMatch: boolean) => {
    const nextTimeBonus = completedMatch ? getTimeBonus(seconds) : 0;

    setResultTime(formattedTime);
    setTimeBonus(nextTimeBonus);
    setScore(finalBoardScore + nextTimeBonus);
    setShowResults(true);
    stop();
  };

  useEffect(() => {
    if (selectedCell && !showResults) {
      focusSearchInput();
    }
  }, [focusSearchInput, selectedCell, showResults]);

  const isKnownChampion = (value: string) => {
    return Boolean(findChampionGuessMatch(value, mockDailyChampionOptions));
  };

  const handleCellSelect = (cell: GameBoardPosition) => {
    if (lives <= 0 || showResults) {
      return;
    }

    setSelectedCell(cell);
    setSearchValue("");
    setSearchBarVariant("default");
    setPlaceholder("Champion name");
    setSelectedCriteria(`${cell.row.label} + ${cell.column.label}`);
    focusSearchInput();
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setSearchBarVariant("default");
  };

  const handleGuessSubmit = (value: string) => {
    if (lives <= 0) {
      setShowResults(true);
      return;
    }
    if (!isKnownChampion(value)) {
      return;
    }
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
      const nextLives = Math.max(0, lives - 1);
      const nextScore = Math.max(0, score - 27);

      pushChatMessage("You lost one life. -27pts", "error");
      setSearchValue("");
      setSearchBarVariant("destructive");
      setSearchBarShakeKey((currentShakeKey) => currentShakeKey + 1);
      setLives(nextLives);
      setScore(nextScore);
      setMissedCellIds((currentMissedCellIds) => ({
        ...currentMissedCellIds,
        [selectedCell.id]: true,
      }));

      if (nextLives === 0) {
        setSelectedCell(undefined);
        setSearchValue("");
        setPlaceholder("Match lost");
        setSelectedCriteria("Match lost");
        pushChatMessage("Time bonus +0pts", "system");
        pushChatMessage("Match lost.", "system");
        finishMatch(nextScore, false);
        return;
      }

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

    const nextScore = score + 9;

    setGuesses(nextGuesses);
    setSearchValue("");
    setSearchBarVariant("default");
    pushChatMessage(`${solution.championName} locked in. + 9pts`, "success");

    if (!nextCell) {
      setSelectedCell(undefined);
      setPlaceholder("Board complete");
      setSelectedCriteria("Board complete");
      pushChatMessage(`Time bonus +${getTimeBonus(seconds)}pts`, "system");
      pushChatMessage("Board complete.", "system");
      finishMatch(nextScore, true);
      return;
    }

    setScore(nextScore);
    setSelectedCell(nextCell);
    setPlaceholder("Champion name");
    setSelectedCriteria(`${nextCell.row.label} + ${nextCell.column.label}`);
  };

  const totalCells = mockDailyGame.rows.length * mockDailyGame.columns.length;
  const completed = Object.keys(guesses).length === totalCells;
  const matchFinished = completed || lives <= 0;

  const handleFinishedMatchClick = () => {
    if (matchFinished && !showResults) {
      setShowResults(true);
    }
  };

  return (
    <>
      <Header />
      <ResultModal
        completed={completed}
        isOpen={showResults}
        variant={completed ? "default" : "destructive"}
        onClose={() => setShowResults(false)}
        challengeLabel={challengeDate}
        score={score}
        time={resultTime}
        timeBonus={timeBonus}
        rows={mockDailyGame.rows}
        columns={mockDailyGame.columns}
        guesses={guesses}
        missedCellIds={missedCellIds}
      />
      <main
        className="flex min-h-[calc(100dvh-5rem)] items-start justify-center px-3 pt-4 pb-6 sm:px-6 sm:pt-10 sm:pb-8"
        onClick={handleFinishedMatchClick}
      >
        <div className="grid w-full max-w-5xl min-w-0 grid-cols-1 items-start gap-3 lg:grid-cols-[minmax(0,36rem)_minmax(0,24rem)] lg:items-stretch">
          <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
            <GameBoard
              columns={mockDailyGame.columns}
              rows={mockDailyGame.rows}
              guesses={guesses}
              selectedCellId={selectedCell?.id}
              onCellSelect={handleCellSelect}
            />
          </div>

          <div className="order-3 flex min-h-0 min-w-0 flex-col lg:col-start-2 lg:row-start-1">
            <div className="flex min-w-0 items-center gap-2 text-3xl text-purple sm:text-4xl">
              <Calendar2 />
              <p className="min-w-0 break-words">Daily Challenge</p>
            </div>

            <div className="flex-1">
              <Card title="MATCH INFO">
                <Info content={formattedTime} icon={<Clock />} title="Time" />
                <Info content={lives} icon={<Heart />} title="Lives" />
                <Info content={score} icon={<Trophy />} title="Score" />

                <MatchChat messages={chatMessages} />
              </Card>
            </div>
          </div>

          <div className="order-2 flex min-w-0 flex-col gap-2 lg:col-start-1 lg:row-start-2">
            <p className="break-words text-xl sm:text-2xl">
              {selectedCriteria}
            </p>

            <SearchBar
              ref={searchInputRef}
              value={searchValue}
              placeholder={placeholder}
              disabled={!selectedCell}
              variant={searchBarVariant}
              shakeKey={searchBarShakeKey}
              suggestions={championSuggestions}
              isSubmitAllowed={isKnownChampion}
              onChange={handleSearchChange}
              onSubmit={handleGuessSubmit}
            />
          </div>
        </div>
      </main>
    </>
  );
};
