import type { GameBoardSolution } from "./game-board.types";

export const getGameBoardCellId = (rowId: string, columnId: string) => {
  return `${rowId}:${columnId}`;
};

export const normalizeChampionGuess = (value: string) => {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
};

export const isChampionGuessCorrect = (
  value: string,
  solution?: GameBoardSolution,
) => {
  if (!solution) {
    return false;
  }

  const normalizedValue = normalizeChampionGuess(value);
  const acceptedNames = [
    solution.championId,
    solution.championName,
    ...(solution.acceptedNames ?? []),
  ];

  return acceptedNames.some(
    (acceptedName) => normalizeChampionGuess(acceptedName) === normalizedValue,
  );
};
