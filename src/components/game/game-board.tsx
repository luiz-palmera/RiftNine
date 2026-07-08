import type { ReactNode } from "react";

type GameBoardProps = {
  children: ReactNode;
};

export const GameBoard = ({ children }: GameBoardProps) => {
  return (
    <div className="bg-purple-dark grid grid-cols-4 grid-rows-4 p-1">
      {children}
    </div>
  );
};
