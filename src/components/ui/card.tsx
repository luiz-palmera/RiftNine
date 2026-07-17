import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
};

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="min-w-0 p-1 bg-purple clip-chamfer">
      <div className="min-w-0 bg-surface px-3 py-3 clip-chamfer sm:px-6">
        {title && (
          <div className="border-b-2 border-purple text-purple ">
            <p className="text-2xl">{title}</p>
          </div>
        )}
        <div className="flex min-w-0 flex-col gap-2 p-2">{children}</div>
      </div>
    </div>
  );
};
