"use client";

import { useEffect, useMemo, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { packs } from "@/data/packs";

const names = [
  "Jessica",
  "Marcus",
  "Sophie",
  "Daniel",
  "Amelia",
  "Ryan",
  "Chloe",
  "Nathan",
  "Olivia",
  "Mia",
  "Ethan",
  "Grace",
];

type UnlockEvent = {
  id: number;
  name: string;
  pack: string;
};

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function UnlockActivityToast() {
  const packTitles = useMemo(() => packs.map((pack) => pack.title), []);
  const [event, setEvent] = useState<UnlockEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer: number;
    let hideTimer: number;
    let cancelled = false;
    let nextId = 0;

    const schedule = (delay: number) => {
      showTimer = window.setTimeout(() => {
        if (cancelled) return;

        setEvent({
          id: nextId,
          name: pickRandom(names),
          pack: pickRandom(packTitles),
        });
        nextId += 1;
        setVisible(true);

        hideTimer = window.setTimeout(() => {
          setVisible(false);
          schedule(9000 + Math.floor(Math.random() * 8000));
        }, 5600);
      }, delay);
    };

    schedule(3600);

    return () => {
      cancelled = true;
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [packTitles]);

  if (!event) return null;

  return (
    <aside
      key={event.id}
      aria-live="polite"
      className={[
        "unlock-activity-toast pointer-events-none fixed bottom-5 right-5 z-30 w-[min(calc(100vw-2.5rem),24rem)] rounded-full border border-[rgba(10,12,16,0.1)] bg-[rgba(255,253,248,0.9)] p-2 pr-4 text-[var(--navy-ink)] shadow-[0_18px_48px_rgba(10,12,16,0.14)] backdrop-blur-xl",
        visible ? "is-visible" : "is-hidden",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--obsidian)] text-white shadow-[0_10px_22px_rgba(10,12,16,0.2)]">
          <LockKeyhole size={17} />
        </span>
        <p className="min-w-0 text-sm font-semibold leading-5">
          <span className="font-bold">{event.name}</span> just unlocked the{" "}
          <span className="text-[var(--safety-orange)]">{event.pack}</span> Launch Pack
        </p>
      </div>
    </aside>
  );
}
