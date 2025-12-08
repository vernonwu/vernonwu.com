import { useEffect, useMemo, useRef, useState } from "react";
import type { CollectionItem } from "@utils/myanimelist";

interface TimelineEntry {
  item: CollectionItem;
  date: Date;
}

interface TimelineGroup {
  key: string;
  label: string;
  entries: TimelineEntry[];
}

function parseDate(input?: string): Date | null {
  if (!input) return null;
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function calculateDurationHeight(startDate?: string, finishDate?: string) {
  const start = parseDate(startDate);
  const finish = parseDate(finishDate) ?? start;
  if (!start || !finish) return 72;

  const diffInDays = Math.max(
    1,
    Math.round(Math.abs(finish.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
  const pixelsPerDay = 0.65;
  const minHeight = 60;
  const maxHeight = 220;

  return Math.min(maxHeight, Math.max(minHeight, Math.round(diffInDays * pixelsPerDay)));
}

export default function AnimeTimeline({ items }: { items: CollectionItem[] }) {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  const [lineActive, setLineActive] = useState(false);

  const groups = useMemo(() => {
    const timelineItems = items
      .map(item => {
        const date = parseDate(item.finishDate ?? item.startDate);
        return date ? { item, date } : null;
      })
      .filter(Boolean)
      .sort(
        (a, b) =>
          (b as TimelineEntry).date.getTime() - (a as TimelineEntry).date.getTime()
      ) as TimelineEntry[];

    const grouped: TimelineGroup[] = [];

    timelineItems.forEach(entry => {
      const key = `${entry.date.getFullYear()}`;
      let bucket = grouped.find(group => group.key === key);
      if (!bucket) {
        bucket = { key, label: key, entries: [] };
        grouped.push(bucket);
      }
      bucket.entries.push(entry);
    });

    return grouped;
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).dataset.timelineKey;
            if (key) {
              setVisibleCards(prev => ({ ...prev, [key]: true }));
            }
          } else {
            const key = (entry.target as HTMLElement).dataset.timelineKey;
            if (key) {
              setVisibleCards(prev => ({ ...prev, [key]: false }));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(cardRefs.current).forEach(node => node && observer.observe(node));

    return () => observer.disconnect();
  }, [groups]);

  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setLineActive(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  if (!groups.length) {
    return (
      <div className="rounded-lg border border-skin-line bg-skin-card px-4 py-6 text-sm text-skin-base/80">
        No anime with timeline data yet. Check back soon.
      </div>
    );
  }

  let entryIndex = 0;

  return (
    <div ref={timelineRef} className="relative py-6 sm:py-8 md:py-10">
      <div
        aria-hidden="true"
        ref={lineRef}
        className={`pointer-events-none absolute left-[18px] top-0 z-0 h-full -translate-x-1/2 border-l-2 border-skin-line transition-opacity duration-500 ease-out sm:left-10 md:left-1/2 ${
          lineActive ? "opacity-85" : "opacity-45"
        }`}
      />
      <div className="relative z-10 flex flex-col gap-12">
        {groups.map(group => (
          <div key={group.key} className="relative pt-10">
            <div className="pointer-events-none absolute -top-1 left-[18px] flex -translate-y-1/2 items-center justify-center sm:left-10 md:left-1/2 md:-translate-x-1/2">
              <span className="rounded-full border border-skin-line bg-skin-fill px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-skin-base shadow-sm">
                {group.label}
              </span>
            </div>

            <div className="flex flex-col gap-12">
              {group.entries.map((entry, idx) => {
                const timelineIndex = entryIndex++;
                const side = timelineIndex % 2 === 0 ? "left" : "right";
                const key = `${group.key}-${entry.item.id}-${idx}`;
                const durationHeight = calculateDurationHeight(
                  entry.item.startDate,
                  entry.item.finishDate
                );
                const barColors = [
                  "bg-skin-accent",
                  "bg-yellow-400",
                  "bg-emerald-400",
                  "bg-orange-400",
                  "bg-sky-400",
                  "bg-pink-400",
                ];
                const barColor = barColors[timelineIndex % barColors.length];
                const setRef = (el: HTMLDivElement | null) => {
                  if (el) {
                    el.dataset.timelineKey = key;
                    cardRefs.current[key] = el;
                  } else {
                    delete cardRefs.current[key];
                  }
                };
                const comments =
                  (entry.item as CollectionItem & { comments?: string }).comments ??
                  (entry.item.tags?.length ? entry.item.tags.join(", ") : undefined);
              const visible = visibleCards[key];
              const cardMotion =
                side === "left"
                  ? visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-6"
                  : visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6";
              const barMotion =
                side === "left"
                  ? visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                  : visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4";
              const cardColumnClass =
                side === "left"
                  ? "col-start-2 col-end-3 md:col-start-1 md:col-end-2 md:justify-self-end md:pr-12"
                  : "col-start-2 col-end-3 md:col-start-3 md:col-end-4 md:justify-self-start md:pl-12";

                return (
                  <div
                    key={key}
                    className="relative grid grid-cols-[auto_1fr] items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-10"
                  >
                    <div
                      aria-hidden="true"
                      className={`relative col-start-1 row-start-1 flex items-center justify-start pl-6 md:col-start-2 md:pl-0 ${
                        side === "left" ? "md:justify-end md:-translate-x-8" : "md:justify-start md:translate-x-8"
                      }`}
                    >
                      <div
                        className={`relative flex items-center transition-all duration-500 ease-out ${barMotion}`}
                      >
                        <div
                          className={`relative w-2 rounded-full shadow-[0_12px_28px_rgba(0,0,0,0.12)] ${barColor}`}
                          style={{ height: `${durationHeight}px` }}
                        />
                        <div className="absolute top-1/2 left-full h-px w-12 border-t border-skin-line md:hidden" />
                        {side === "left" ? (
                          <div className="absolute top-1/2 right-full hidden h-px w-12 border-t border-skin-line md:block" />
                        ) : (
                          <div className="absolute top-1/2 left-full hidden h-px w-12 border-t border-skin-line md:block" />
                        )}
                      </div>
                    </div>
                    <div className={cardColumnClass}>
                      <div
                        ref={setRef}
                        className={`group relative overflow-hidden rounded-xl border border-skin-line bg-skin-card p-4 text-skin-base shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-skin-accent hover:shadow-[0_18px_40px_rgba(var(--color-accent),0.18)] ${cardMotion}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-skin-line bg-skin-fill">
                            {entry.item.image ? (
                              <img
                                src={entry.item.image}
                                alt={entry.item.title}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-skin-base/60">
                                No image
                              </div>
                            )}
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <a
                                href={entry.item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-base font-semibold text-skin-accent underline-offset-4 decoration-dashed transition hover:underline"
                              >
                                {entry.item.title}
                              </a>
                              {entry.item.score ? (
                                <span className="inline-flex items-center rounded-full bg-skin-fill px-3 py-1 text-xs font-semibold uppercase tracking-wide text-skin-base/80 ring-1 ring-skin-line">
                                  Score {entry.item.score}
                                </span>
                              ) : null}
                            </div>

                            {comments ? (
                              <p className="text-sm leading-relaxed text-skin-base/80">
                                {comments}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
