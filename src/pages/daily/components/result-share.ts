import type {
  GameBoardGuess,
  GameBoardIndicator,
} from "@/components/game/game-board.types";
import { getGameBoardCellId } from "@/components/game/game-board.utils";

type BuildResultShareTextParams = {
  challengeLabel: string;
  appUrl: string;
  score: number;
  time: string;
  rows: GameBoardIndicator[];
  columns: GameBoardIndicator[];
  guesses: Record<string, GameBoardGuess>;
  missedCellIds: Record<string, boolean>;
};

const cellStateEmoji = {
  correct: "🟪",
  missed: "🟥",
  empty: "⬛",
};

export const getShareCellEmoji = ({
  cellId,
  guesses,
  missedCellIds,
}: {
  cellId: string;
  guesses: Record<string, GameBoardGuess>;
  missedCellIds: Record<string, boolean>;
}) => {
  if (guesses[cellId]) {
    return cellStateEmoji.correct;
  }

  if (missedCellIds[cellId]) {
    return cellStateEmoji.missed;
  }

  return cellStateEmoji.empty;
};

export const buildResultShareText = ({
  challengeLabel,
  appUrl,
  score,
  time,
  rows,
  columns,
  guesses,
  missedCellIds,
}: BuildResultShareTextParams) => {
  const totalCells = rows.length * columns.length;
  const solvedCells = rows.reduce(
    (total, row) =>
      total +
      columns.filter((column) => guesses[getGameBoardCellId(row.id, column.id)])
        .length,
    0,
  );
  const grid = rows
    .map((row) =>
      columns
        .map((column) =>
          getShareCellEmoji({
            cellId: getGameBoardCellId(row.id, column.id),
            guesses,
            missedCellIds,
          }),
        )
        .join(""),
    )
    .join("\n");

  return [
    `Rift9 ${challengeLabel}`,
    grid,
    "",
    `${solvedCells}/${totalCells} picks`,
    `Score: ${score}`,
    `⏱ ${time}`,
    appUrl,
  ].join("\n");
};
