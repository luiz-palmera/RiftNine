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
        <IconButton aria-label="Open settings" onClick={() => {}}>
          <SettingsCog2 />
        </IconButton>
      </div>
    </div>
  );
};
