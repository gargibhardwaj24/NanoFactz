import React from "react";
import useRandomSkill from "../hooks/useRandomSkill";

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f3ead9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ad4f29' font-family='Georgia, serif' font-size='22' font-style='italic'%3Eno plate%3C/text%3E%3C/svg%3E";

function LoadingState() {
  return (
    <div className="space-y-3">
      <div className="skeleton h-7 w-3/4 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
    </div>
  );
}

export default function SkillCard() {
  const { skill, loading, error, fetchNewSkill } = useRandomSkill();

  return (
    <article className="relative overflow-hidden rounded-2xl border border-line bg-white/70 shadow-[0_1px_0_rgba(33,28,22,0.04),0_18px_40px_-24px_rgba(33,28,22,0.35)]">
      {/* ember edge */}
      <span className="absolute inset-x-0 top-0 h-[3px] bg-ember" aria-hidden="true" />

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ember">
            Fact of the day
          </span>
          <span className="shrink-0 font-display text-sm italic text-muted">
            via Wikipedia
          </span>
        </div>

        <div className="mt-5 min-h-[7rem]">
          {loading && <LoadingState />}

          {error && !loading && (
            <div className="rounded-lg border border-line bg-paper-deep px-4 py-3 text-sm text-ink">
              <span className="font-medium text-ember">Couldn&rsquo;t fetch a fact.</span>{" "}
              {error} — try drawing again.
            </div>
          )}

          {skill && !loading && (
            <div key={skill.title} className="animate-rise flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex-1">
                <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-[1.7rem]">
                  {skill.title}
                </h2>
                <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-muted">
                  {skill.extract}
                </p>
              </div>

              {skill.image && (
                <figure className="order-first w-full shrink-0 overflow-hidden rounded-lg border border-line sm:order-none sm:w-36">
                  <img
                    src={skill.image}
                    alt={skill.title || "illustration"}
                    loading="lazy"
                    className="h-40 w-full object-cover sm:h-28"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                </figure>
              )}
            </div>
          )}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <button
            onClick={fetchNewSkill}
            disabled={loading}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span
              className="text-base leading-none transition-transform duration-500 group-hover:rotate-180"
              aria-hidden="true"
            >
              ↻
            </span>
            {loading ? "Drawing…" : "Draw another"}
          </button>

          {skill?.sourceUrl && !loading && (
            <a
              href={skill.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
            >
              Read the full entry →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
