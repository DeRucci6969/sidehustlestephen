"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const quotes = [
  "Pick one buyer, one problem, and one paid starter offer.",
  "If the buyer cannot see the problem, your pitch is too abstract.",
  "A good first offer is small enough to buy and useful enough to notice.",
  "Do not start with a brand. Start with a buyer conversation.",
  "The first version should prove demand, not impress other founders.",
  "Screenshots beat theory when you are pitching a local business.",
  "Charge for a narrow outcome before you build a bigger service.",
  "Use the first delivery to find the retainer, not to pretend it is passive.",
  "A useful template still needs your judgement before it reaches a client.",
  "The goal is not a perfect idea. The goal is a real buyer response.",
  "One specific outreach message beats a hundred vague announcements.",
  "Keep the promise boring, useful, and deliverable.",
];

export function QuoteCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % quotes.length);
    }, 12000);

    return () => window.clearInterval(timer);
  }, [paused]);

  function move(direction: -1 | 1) {
    setPaused(true);
    setIndex((current) => (current + direction + quotes.length) % quotes.length);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
      <div className="quote-section relative overflow-hidden rounded-lg px-6 py-12 text-center text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <figure className="relative z-10 mx-auto flex max-w-5xl flex-col items-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/40">
            Field note {String(index + 1).padStart(2, "0")} / {quotes.length}
          </p>
          <blockquote key={index} className="quote-text mt-5 text-[clamp(1.85rem,10vw,5rem)] leading-[1.04] text-white sm:leading-[1.02]">
            {quotes[index]}
          </blockquote>
          <div className="mt-9 flex gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous quote"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/8 text-white transition hover:-translate-y-0.5 hover:bg-white/14"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next quote"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white text-[var(--obsidian)] transition hover:-translate-y-0.5"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </figure>
      </div>
    </section>
  );
}
