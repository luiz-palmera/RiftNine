import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/ui/glitch-text";
import { Modal } from "@/components/ui/modal";
import { Smile } from "pixelarticons/react";
import { useNavigate } from "react-router";

type ResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  completed?: boolean;
};

export const ResultModal = ({
  isOpen,
  onClose,
  completed = false,
}: ResultModalProps) => {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="GAME RESULTS">
      <div className="flex flex-col gap-3 items-center">
        <p className="py-4 text-2xl flex items-center">
          {completed ? (
            "Congrats! You've completed the challenge"
          ) : (
            <p className="flex gap-1 items-center">
              You're a faliure{" "}
              <GlitchText active>
                <span className="text-purple flex items-center">
                  hahaha <Smile />
                </span>
              </GlitchText>
            </p>
          )}
        </p>
        <div>GRID</div>
        <div className="flex gap-3 text-surface">
          <Button title="Share with your friends" onClick={() => {}} />
          <Button title="Return to home" onClick={() => navigate("/")} />
        </div>
      </div>
    </Modal>
  );
};
