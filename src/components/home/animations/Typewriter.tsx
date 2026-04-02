"use client";

import { useEffect, useState } from "react";

interface Props {
  words: string[];
  className?: string;
  speed?: number;
  pauseDuration?: number;
}

export function Typewriter({
  words,
  className,
  speed = 80,
  pauseDuration = 2000,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    if (!deleting && charIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), pauseDuration);
      return () => clearTimeout(pause);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setCharIndex((prev) => prev + (deleting ? -1 : 1));
        setDisplayed(current.slice(0, charIndex + (deleting ? -1 : 1)));
      },
      deleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pauseDuration]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}
