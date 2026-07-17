import type { ReactNode } from "react";

type InfoProps = {
  title: string;
  icon?: ReactNode;
  content: number | string;
};

export const Info = ({ icon, title, content }: InfoProps) => {
  return (
    <div className="min-w-0 p-0.5 bg-muted-foreground clip-chamfer">
      <div className="clip-chamfer flex min-w-0 flex-wrap gap-x-2 gap-y-1 bg-muted px-3 py-2 text-lg sm:px-8 sm:text-xl">
        <div className="flex min-w-0 text-purple gap-1 items-center">
          {icon}
          <p>{title}:</p>
        </div>
        <p className="min-w-0 break-words text-black">{content}</p>
      </div>
    </div>
  );
};
