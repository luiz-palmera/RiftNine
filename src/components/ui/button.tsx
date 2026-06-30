import { cn } from "../../utils/cn";

type ButtonProps = {
  title: string;
  variant?: "default" | "destructive";
  onClick: () => void;
};

export const Button = ({
  title,
  variant = "default",
  onClick,
}: ButtonProps) => {
  return (
    <>
      <div
        className={cn(
          "inline-flex w-fit items-center clip-chamfer px-6 py-2 cursor-pointer pixel-shadow",
          variant === "default" && "bg-purple hover:bg-purple-dark",
          variant === "destructive" && "pixel-shadow bg-player-red",
        )}
        onClick={onClick}
      >
        <p className="text-2xl">{title}</p>
      </div>
    </>
  );
};
