import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import AnimeGrid from "@components/AnimeGrid";
import AnimeTimeline from "@components/AnimeTimeline";
import type { CollectionItem } from "@utils/myanimelist";

type ViewMode = "grid" | "timeline";

interface Props {
  items: CollectionItem[];
  error?: string;
}

function sortForGrid(items: CollectionItem[]) {
  return [...items].sort((a, b) => {
    const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
    if (scoreDiff !== 0) return scoreDiff;
    return a.title.localeCompare(b.title);
  });
}

function sortForTimeline(items: CollectionItem[]) {
  const toTime = (item: CollectionItem) => {
    const finish = item.finishDate ? new Date(item.finishDate).getTime() : null;
    const start = item.startDate ? new Date(item.startDate).getTime() : null;
    return finish ?? start ?? 0;
  };

  return [...items].sort((a, b) => toTime(b) - toTime(a));
}

export default function CollectionExplorer({ items, error }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const gridItems = useMemo(() => sortForGrid(items), [items]);
  const timelineItems = useMemo(() => sortForTimeline(items), [items]);

  useEffect(() => {
    setAnchorEl(document.getElementById("collection-view-toggle-anchor"));
  }, []);

  const toggle = (
    <div className="inline-flex items-center gap-3">
      {error ? (
        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-500/30">
          Some data may be missing: {error}
        </span>
      ) : null}
      <div
        className="relative inline-flex cursor-pointer items-center rounded-full border border-skin-line bg-skin-card px-1 py-1 shadow-sm transition hover:border-skin-accent/80"
        role="switch"
        tabIndex={0}
        aria-checked={viewMode === "timeline"}
        onClick={() => setViewMode(prev => (prev === "grid" ? "timeline" : "grid"))}
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setViewMode(prev => (prev === "grid" ? "timeline" : "grid"));
          }
        }}
      >
        <span className="sr-only">Toggle collection view</span>
        {[
          { key: "grid" as ViewMode, label: "Grid" },
          { key: "timeline" as ViewMode, label: "Timeline" },
        ].map(option => {
          const isActive = option.key === viewMode;
          return (
            <span
              key={option.key}
              className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                isActive ? "text-skin-base" : "text-skin-base/65"
              }`}
              aria-hidden
            >
              {option.key === "grid" ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h4A1.5 1.5 0 0 1 9 3.5v4A1.5 1.5 0 0 1 7.5 9h-4A1.5 1.5 0 0 1 2 7.5v-4Zm0 9A1.5 1.5 0 0 1 3.5 11h4A1.5 1.5 0 0 1 9 12.5v4A1.5 1.5 0 0 1 7.5 18h-4A1.5 1.5 0 0 1 2 16.5v-4Zm9-9A1.5 1.5 0 0 1 12.5 2h4A1.5 1.5 0 0 1 18 3.5v4A1.5 1.5 0 0 1 16.5 9h-4A1.5 1.5 0 0 1 11 7.5v-4Zm0 9A1.5 1.5 0 0 1 12.5 11h4A1.5 1.5 0 0 1 18 12.5v4A1.5 1.5 0 0 1 16.5 18h-4A1.5 1.5 0 0 1 11 16.5v-4Z" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M3 4a1 1 0 0 1 1-1h12v2H4a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h7v2H4a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h4v2H4a1 1 0 0 1-1-1Zm13.5-10.25 2.5 2.25-2.5 2.25V9.75H11.5v-1.5h5Z" />
                </svg>
              )}
              <span className="hidden sm:inline">{option.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );

  const toggleNode = anchorEl
    ? createPortal(toggle, anchorEl)
    : <div className="mb-4 flex justify-end">{toggle}</div>;

  return (
    <div className="space-y-6">
      {toggleNode}

      {viewMode === "grid" ? (
        <AnimeGrid items={gridItems} />
      ) : (
        <AnimeTimeline items={timelineItems} />
      )}
    </div>
  );
}
