export function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="sectional-band mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
      <div className="relative mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">{eyebrow}</p>
          <h2 className="display-type mt-2 text-4xl sm:text-5xl">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}
