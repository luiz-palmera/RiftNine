import { parseTime } from "@/utils/parseTime";
import { useEffect, useState } from "react";

export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (isRunning == false) return;

    const timer = setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, isRunning]);

  function stop() {
    setIsRunning(false);
  }

  const formattedTime = parseTime(seconds);

  return { formattedTime, stop };
}
