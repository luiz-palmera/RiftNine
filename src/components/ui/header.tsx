import { Home, SettingsCog2 } from "pixelarticons/react";
import { IconButton } from "./icon-button";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-bg px-3 py-4 text-surface sm:px-5">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 text-center text-4xl sm:text-6xl">
        <IconButton aria-label="Go to home" onClick={() => navigate("/")}>
          <Home />
        </IconButton>
        <h1 className="min-w-0 leading-none">
          Rift<span className="text-purple">9</span>
        </h1>
        <div className="group relative">
          <IconButton aria-label="Open settings" onClick={() => {}}>
            <SettingsCog2 />
          </IconButton>
          <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-text-main px-3 py-1 text-xl whitespace-nowrap text-surface opacity-0 pixel-shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            available soon
          </div>
        </div>
      </div>
    </div>
  );
};
