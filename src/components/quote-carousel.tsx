"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const quotes = [
  "Start messy. Improve in motion.",
  "The market rewards action, not intention.",
  "You do not need more confidence. You need more reps.",
  "Build the ugly first version. Polish comes after proof.",
  "Every business starts as an awkward attempt.",
  "Thinking feels safe. Shipping creates evidence.",
  "Your first move does not need to be perfect. It needs to exist.",
  "The fastest way to learn is to put something in front of customers.",
  "Stop waiting for certainty. Entrepreneurs create it through action.",
  "Momentum is built by doing the next obvious thing.",
  "A bad launch teaches more than a perfect idea in your notes app.",
  "The business you start badly beats the one you plan forever.",
  "Clarity does not come before action. It comes from action.",
  "Move first. Refine second. Win later.",
  "You cannot optimise what you have not started.",
  "The gap between you and the person winning is usually execution.",
  "Every day you delay, someone less prepared gets ahead by starting.",
  "Build before you believe. Confidence follows evidence.",
  "One imperfect offer in the market is worth more than ten perfect ideas in your head.",
  "Entrepreneurs are not people with better ideas. They are people who act before the idea feels safe.",
];

export function QuoteCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % quotes.length);
    }, 6200);

    return () => window.clearInterval(timer);
  }, []);

  function move(direction: -1 | 1) {
    setIndex((current) => (current + direction + quotes.length) % quotes.length);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
      <div className="quote-section relative overflow-hidden rounded-lg px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.32fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Founder notes</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/58">
              A rotating reminder to move from idea to evidence.
            </p>
            <div className="mt-8 flex gap-2">
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
          </div>

          <figure className="min-w-0">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              {String(index + 1).padStart(2, "0")} / {quotes.length}
            </p>
            <blockquote key={index} className="quote-text mt-5 text-[clamp(2.7rem,7vw,6.7rem)] leading-[0.94] text-white">
              {quotes[index]}
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}
