import { Fragment } from "react";
import { cn } from "@/utils/cn";
import { GameCell } from "./game-cell";
import { getGameBoardCellId } from "./game-board.utils";
import type {
  GameBoardGuess,
  GameBoardIndicator,
  GameBoardPosition,
} from "./game-board.types";

type GameBoardProps = {
  rows: GameBoardIndicator[];
  columns: GameBoardIndicator[];
  guesses?: Record<string, GameBoardGuess>;
  selectedCellId?: string;
  className?: string;
  onCellSelect?: (position: GameBoardPosition) => void;
};

export const GameBoard = ({
  rows,
  columns,
  guesses = {},
  selectedCellId,
  className,
  onCellSelect,
}: GameBoardProps) => {
  const gridSize = {
    gridTemplateColumns: `repeat(${columns.length + 1}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows.length + 1}, minmax(0, 1fr))`,
  };

  return (
    <div
      className={cn("bg-purple-dark grid p-1 w-full max-w-xl", className)}
      style={gridSize}
      role="grid"
      aria-label="Daily Rift Nine board"
    >
      <GameCell mode="logo" label="Rift Nine" />
      {columns.map((column) => (
        <GameCell
          key={column.id}
          mode="indicator"
          indicatorImg={column.imageSrc}
          label={column.label}
        />
      ))}
      {rows.map((row, rowIndex) => (
        <Fragment key={row.id}>
          <GameCell
            mode="indicator"
            indicatorImg={row.imageSrc}
            label={row.label}
          />
          {columns.map((column, columnIndex) => {
            const id = getGameBoardCellId(row.id, column.id);
            const guess = guesses[id];

            return (
              <GameCell
                key={id}
                mode={
                  guess
                    ? "correct"
                    : (rowIndex + columnIndex) % 2 === 0
                      ? "search"
                      : "secondarySearch"
                }
                label={`Find a champion for ${row.label} and ${column.label}`}
                championImg={guess?.championImg}
                championEmoji={guess?.championEmoji}
                championName={guess?.championName}
                isSelected={selectedCellId === id}
                onClick={
                  guess
                    ? undefined
                    : () =>
                        onCellSelect?.({
                          id,
                          row,
                          column,
                          rowIndex,
                          columnIndex,
                          guess,
                        })
                }
              />
            );
          })}
        </Fragment>
      ))}
    </div>
  );
};
