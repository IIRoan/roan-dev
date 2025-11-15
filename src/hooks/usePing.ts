import { useEffect, useState } from "react";

export function usePing(interval: number = 30000) {
  const [ping, setPing] = useState<number | null>(null);

  useEffect(() => {
    const measurePing = async () => {
      try {
        const startTime = performance.now();
        await fetch("/", { method: "HEAD", cache: "no-store" });
        const endTime = performance.now();
        setPing(Math.round(endTime - startTime));
      } catch (error) {
        setPing(null);
      }
    };

    measurePing();
    const intervalId = setInterval(measurePing, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return ping;
}
