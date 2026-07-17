import { Button } from "@/components/ui/button";
import type {
  GameBoardGuess,
  GameBoardIndicator,
} from "@/components/game/game-board.types";
import { getGameBoardCellId } from "@/components/game/game-board.utils";
import { GlitchText } from "@/components/ui/glitch-text";
import { Modal, type ModalVariant } from "@/components/ui/modal";
import { cn } from "@/utils/cn";
import { Smile } from "pixelarticons/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { buildResultShareText } from "./result-share";

type ResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  challengeLabel: string;
  completed?: boolean;
  variant?: ModalVariant;
  score: number;
  time: string;
  timeBonus: number;
  rows: GameBoardIndicator[];
  columns: GameBoardIndicator[];
  guesses: Record<string, GameBoardGuess>;
  missedCellIds: Record<string, boolean>;
};

export const ResultModal = ({
  isOpen,
  onClose,
  challengeLabel,
  completed = false,
  variant = "default",
  score,
  time,
  timeBonus,
  rows,
  columns,
  guesses,
  missedCellIds,
}: ResultModalProps) => {
  const navigate = useNavigate();
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  const totalCells = rows.length * columns.length;
  const solvedCells = rows.reduce(
    (total, row) =>
      total +
      columns.filter((column) => guesses[getGameBoardCellId(row.id, column.id)])
        .length,
    0,
  );
  const shareText = buildResultShareText({
    challengeLabel,
    appUrl: window.location.origin,
    score,
    time,
    rows,
    columns,
    guesses,
    missedCellIds,
  });

  const handleShare = async () => {
    await navigator.clipboard.writeText(shareText);
    setShareStatus("copied");
    window.setTimeout(() => setShareStatus("idle"), 1600);
  };

  return (
    <Modal
      isOpen={isOpen}
      variant={variant}
      onClose={onClose}
      title="GAME RESULTS"
    >
      <div className="flex min-w-0 flex-col items-center gap-4">
        <div className="flex min-w-0 items-center py-3 text-center text-xl sm:py-4 sm:text-2xl">
          {completed ? (
            <p>
              <GlitchText active variant={variant}>
                Congrats!
              </GlitchText>{" "}
              You've completed the challenge.
            </p>
          ) : (
            <span className="flex gap-1 items-center">
              You're a faliure{" "}
              <GlitchText variant={variant} active>
                <span
                  className={cn(
                    "flex items-center",
                    variant === "destructive" && "text-red",
                    variant === "default" && "text-purple",
                    variant === "success" && "text-green-500",
                  )}
                >
                  hahaha <Smile />
                </span>
              </GlitchText>
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-text-main sm:gap-x-6">
          <div>
            <p className="text-sm uppercase text-text-main/70">Score</p>
            <p className="text-3xl sm:text-4xl">{score}</p>
          </div>
          <div>
            <p className="text-sm uppercase text-text-main/70">Time</p>
            <p className="text-3xl sm:text-4xl">{time}</p>
          </div>
          <div>
            <p className="text-sm uppercase text-text-main/70">Bonus</p>
            <p className="text-3xl sm:text-4xl">+{timeBonus}</p>
          </div>
          <div>
            <p className="text-sm uppercase text-text-main/70">PICKS</p>
            <p className="text-3xl sm:text-4xl">
              {solvedCells}/{totalCells}
            </p>
          </div>
        </div>

        <div
          className="grid gap-1 p-1"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
          aria-label={`${solvedCells} of ${totalCells} squares correct`}
        >
          {rows.flatMap((row) =>
            columns.map((column) => {
              const id = getGameBoardCellId(row.id, column.id);
              const isCorrect = Boolean(guesses[id]);

              return (
                <div
                  key={id}
                  className={cn(
                    "size-16 clip-chamfer sm:size-20",
                    isCorrect ? "bg-green-500" : "bg-red",
                  )}
                  title={`${row.label} + ${column.label}: ${
                    isCorrect ? "correct" : "not solved"
                  }`}
                  aria-label={`${row.label} plus ${column.label}: ${
                    isCorrect ? "correct" : "not solved"
                  }`}
                />
              );
            }),
          )}
        </div>
        <div className="mt-3 flex flex-col gap-3 p-3 text-surface sm:flex-row">
          <div className="relative">
            {shareStatus === "copied" && (
              <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-text-main px-3 py-1 text-xl text-surface pixel-shadow">
                Copied!
              </div>
            )}
            <Button
              variant={variant}
              title="Share results"
              onClick={handleShare}
            />
          </div>
          <Button
            title="Return to home"
            variant={variant}
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </Modal>
  );
};
