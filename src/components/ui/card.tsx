import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="p-1 bg-purple clip-chamfer">
      <div className="bg-surface px-6 py-3 clip-chamfer w-md h-full">
        <div className="border-b-2 border-purple text-purple ">
          <p className="text-2xl">{title}</p>
        </div>
        <div className="p-2 flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
};
