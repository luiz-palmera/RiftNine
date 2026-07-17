export type GameBoardIndicator = {
  id: string;
  label: string;
  imageSrc?: string;
  kind?: "region" | "role" | "trait" | "info";
};

export type GameBoardGuess = {
  championId: string;
  championName: string;
  championImg?: string;
  championEmoji?: string;
};

export type GameBoardSolution = GameBoardGuess & {
  acceptedNames?: string[];
};

export type GameBoardPosition = {
  id: string;
  row: GameBoardIndicator;
  column: GameBoardIndicator;
  rowIndex: number;
  columnIndex: number;
  guess?: GameBoardGuess;
};
