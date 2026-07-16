import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.dialog
            open
            aria-modal="true"
            className="relative m-0 border-0 bg-purple p-1 clip-chamfer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-surface p-6 clip-chamfer">
              {title && (
                <div className="border-b-2 border-purple text-purple">
                  <p className="text-2xl">{title}</p>
                </div>
              )}

              <div>{children}</div>
            </div>
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
