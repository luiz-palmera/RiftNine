import { useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

export type MatchChatMessage = {
  id: number;
  content: string;
  tone: "system" | "success" | "error";
};

type MatchChatProps = {
  messages: MatchChatMessage[];
};

export const MatchChat = ({ messages }: MatchChatProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="min-w-0 p-0.5 bg-purple clip-chamfer">
      <div className="clip-chamfer bg-bg px-3 py-2 h-34 flex min-w-0 flex-col">
        <p className="text-purple-light text-xl leading-none"> CHAT</p>
        <div
          ref={messagesRef}
          className="mt-2 flex max-h-28 min-w-0 flex-1 flex-col gap-1 overflow-y-auto pr-1 [scrollbar-color:var(--color-purple-light)_var(--color-bg)] [scrollbar-width:thin]"
        >
          {messages.map((message) => (
            <p
              key={message.id}
              className={cn(
                "break-words text-lg leading-none",
                message.tone === "system" && "text-muted-foreground",
                message.tone === "success" && "text-green-400",
                message.tone === "error" && "text-red-accent",
              )}
            >
              <span className="text-purple-light">[R9]</span> {message.content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
