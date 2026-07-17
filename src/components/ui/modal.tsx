import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

export type ModalVariant = "default" | "destructive" | "success";

type ModalVariantStyles = {
  bg: string;
  border: string;
  text: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: ModalVariant;
};

const modalVariants = {
  default: {
    bg: "bg-purple",
    border: "border-purple",
    text: "text-purple",
  },
  destructive: {
    bg: "bg-red",
    border: "border-red",
    text: "text-red",
  },
  success: {
    bg: "bg-green-500",
    border: "border-green-500",
    text: "text-green-500",
  },
} satisfies Record<ModalVariant, ModalVariantStyles>;

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  variant = "default",
}: ModalProps) => {
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
            className={`relative  p-1 clip-chamfer ${modalVariants[variant].bg}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-surface p-6 clip-chamfer">
              {title && (
                <div
                  className={`border-b-2 ${modalVariants[variant].border} ${modalVariants[variant].text}`}
                >
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
