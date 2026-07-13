import { Home, SettingsCog2 } from "pixelarticons/react";
import { IconButton } from "./icon-button";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 text-surface flex items-center justify-center gap-102 text-6xl text-center bg-bg w-full">
      <IconButton onClick={() => navigate("/")}>
        <Home />
      </IconButton>
      <h1>
        Rift<span className="text-purple">9</span>
      </h1>
      <IconButton onClick={() => {}}>
        <SettingsCog2 />
      </IconButton>
    </div>
  );
};
