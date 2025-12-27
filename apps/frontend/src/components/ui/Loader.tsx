import { useEffect, useState } from "react";

export default function Loader({ base = "Loading", speed = 400 }: { base?: string; speed?: number }) {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDots(d => (d + 1) % 4), speed);
    return () => clearInterval(id);
  }, [speed]);

  return <span role="status" aria-live="polite">{base}{".".repeat(dots)}</span>;
}