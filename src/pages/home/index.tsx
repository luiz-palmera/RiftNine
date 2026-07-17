import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden">
      <div className="p-6 text-9xl mt-15 text-white text-center">
        <p className="relative inline-block overflow-hidden">
          Rift<span className="text-purple">9</span>
          <motion.span
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(201,137,212,0.92)_45%,transparent_70%)] bg-size-[250%_100%] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["180% 0", "-180% 0"] }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.2,
            }}
          >
            Rift9
          </motion.span>
        </p>
      </div>
      <div className="mt-5 flex flex-col p-5 items-center justify-center gap-5">
        <Button
          title="Daily"
          variant="default"
          onClick={() => navigate("/daily")}
        />
        <div className="group relative">
          <Button title="VERSUS" variant="disabled" />
          <div className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 bg-text-main px-3 py-1 text-xl whitespace-nowrap text-surface opacity-0 pixel-shadow transition-opacity group-hover:opacity-100">
            avaliable soon
          </div>
        </div>
      </div>
    </div>
  );
};
