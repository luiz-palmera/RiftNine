import type { ReactNode } from "react";

type InfoProps = {
  title: string;
  icon?: ReactNode;
  content: number | string;
};

export const Info = ({ icon, title, content }: InfoProps) => {
  return (
    <div className="p-0.5 bg-muted-foreground clip-chamfer">
      <div className="clip-chamfer flex gap-2 bg-muted py-2 px-8 text-xl">
        <div className="flex text-purple gap-1 items-center">
          {icon}
          <p>{title}:</p>
        </div>
        <p className="text-black ">{content}</p>
      </div>
    </div>
  );
};
