import type {
  GameBoardGuess,
  GameBoardIndicator,
  GameBoardPosition,
  GameBoardSolution,
} from "./game-board.types";

export const getGameBoardCellId = (rowId: string, columnId: string) => {
  return `${rowId}:${columnId}`;
};

export const normalizeChampionGuess = (value: string) => {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
};

export const findChampionGuessMatch = (
  value: string,
  solutions: GameBoardSolution[] = [],
) => {
  const normalizedValue = normalizeChampionGuess(value);

  return solutions.find((solution) =>
    [
      solution.championId,
      solution.championName,
      ...(solution.acceptedNames ?? []),
    ].some(
      (acceptedName) =>
        normalizeChampionGuess(acceptedName) === normalizedValue,
    ),
  );
};

export const isChampionGuessCorrect = (
  value: string,
  solutions?: GameBoardSolution[],
) => {
  return Boolean(findChampionGuessMatch(value, solutions));
};

type GetNextOpenGameBoardPositionParams = {
  rows: GameBoardIndicator[];
  columns: GameBoardIndicator[];
  guesses: Record<string, GameBoardGuess>;
  currentCellId: string;
};

export const getNextOpenGameBoardPosition = ({
  rows,
  columns,
  guesses,
  currentCellId,
}: GetNextOpenGameBoardPositionParams) => {
  const positions: GameBoardPosition[] = rows.flatMap((row, rowIndex) =>
    columns.map((column, columnIndex) => {
      const id = getGameBoardCellId(row.id, column.id);

      return {
        id,
        row,
        column,
        rowIndex,
        columnIndex,
        guess: guesses[id],
      };
    }),
  );

  const currentPositionIndex = positions.findIndex(
    (position) => position.id === currentCellId,
  );

  const orderedPositions =
    currentPositionIndex === -1
      ? positions
      : [
          ...positions.slice(currentPositionIndex + 1),
          ...positions.slice(0, currentPositionIndex + 1),
        ];

  return orderedPositions.find((position) => !position.guess);
};
