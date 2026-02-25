import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { a as $$Layout, b as $$Header, c as $$Footer } from '../chunks/Footer_BKvCJzbM.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
/* empty css                                 */
import { $ as $$Main } from '../chunks/Main_BPWwIqUn.mjs';
import { S as SITE } from '../chunks/config_BR15hYS5.mjs';
export { renderers } from '../renderers.mjs';

const PAGE_SIZE = 6;
function buildTotals(items) {
  return items.reduce(
    (acc, item) => {
      acc.type[item.typeCategory] = (acc.type[item.typeCategory] ?? 0) + 1;
      acc.status[item.statusCategory] = (acc.status[item.statusCategory] ?? 0) + 1;
      return acc;
    },
    { type: {}, status: {} }
  );
}
function AnimeGrid({ items }) {
  const [activeType, setActiveType] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const totals = useMemo(() => buildTotals(items), [items]);
  const typeFilters = useMemo(
    () => [
      { key: "all", label: "All", count: items.length },
      { key: "TV", label: "TV", count: totals.type["TV"] ?? 0 },
      { key: "Movie", label: "Movie", count: totals.type["Movie"] ?? 0 },
      { key: "Manga", label: "Manga", count: totals.type["Manga"] ?? 0 }
    ],
    [items.length, totals.type]
  );
  const filteredByType = useMemo(
    () => items.filter((item) => activeType === "all" || item.typeCategory === activeType),
    [items, activeType]
  );
  const statusCounts = useMemo(() => {
    const counts = {
      all: filteredByType.length,
      consuming: 0,
      completed: 0,
      plan: 0
    };
    filteredByType.forEach((item) => {
      const key = item.statusCategory;
      if (counts[key] !== void 0) counts[key] += 1;
    });
    return counts;
  }, [filteredByType]);
  const filteredItems = useMemo(
    () => filteredByType.filter(
      (item) => activeStatus === "all" || item.statusCategory === activeStatus
    ),
    [filteredByType, activeStatus]
  );
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE)),
    [filteredItems.length]
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [activeType, activeStatus]);
  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);
  const visibleItems = useMemo(
    () => filteredItems.slice(
      (currentPage - 1) * PAGE_SIZE,
      (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
    ),
    [filteredItems, currentPage]
  );
  const handleTypeChange = (key, disabled) => {
    if (disabled || key === activeType) return;
    setActiveType(key);
  };
  const handleStatusChange = (key, disabled) => {
    if (disabled || key === activeStatus) return;
    setActiveStatus(key);
  };
  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "prev") return Math.max(1, prev - 1);
      return Math.min(totalPages, prev + 1);
    });
  };
  return /* @__PURE__ */ jsx("section", { id: "collection", children: /* @__PURE__ */ jsxs("div", { className: "collection-group", children: [
    /* @__PURE__ */ jsxs("div", { className: "filters", children: [
      /* @__PURE__ */ jsx("div", { className: "type-row", children: typeFilters.map((filter) => {
        const isActive = filter.key === activeType;
        const disabled = filter.count === 0;
        return /* @__PURE__ */ jsxs(
          "span",
          {
            role: "button",
            tabIndex: disabled ? -1 : 0,
            className: [
              "type-item",
              isActive ? "active" : "",
              disabled ? "disabled" : ""
            ].filter(Boolean).join(" "),
            "data-filter": "type",
            "data-key": filter.key,
            "aria-pressed": isActive,
            onClick: () => handleTypeChange(filter.key, disabled),
            onKeyDown: (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleTypeChange(filter.key, disabled);
              }
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: "type-label", children: filter.label }),
              /* @__PURE__ */ jsx("span", { className: "type-count", children: filter.count })
            ]
          },
          filter.key
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "divider" }),
      /* @__PURE__ */ jsx("div", { className: "filter-row", children: [
        { key: "all", label: "All" },
        { key: "consuming", label: "Currently Consuming" },
        { key: "completed", label: "Completed" },
        { key: "plan", label: "Plan to Watch" }
      ].map((filter) => {
        const key = filter.key;
        const isActive = key === activeStatus;
        const count = statusCounts[key] ?? 0;
        const disabled = count === 0;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: [
              "filter-pill",
              isActive ? "active" : "",
              disabled ? "disabled" : ""
            ].filter(Boolean).join(" "),
            "data-filter": "status",
            "data-key": filter.key,
            "aria-pressed": isActive,
            disabled,
            onClick: () => handleStatusChange(key, disabled),
            children: [
              filter.label,
              " ",
              /* @__PURE__ */ jsxs("span", { className: "pill-count", children: [
                "(",
                count,
                ")"
              ] })
            ]
          },
          filter.key
        );
      }) })
    ] }),
    items.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "muted", id: "visible-meta", children: [
        "Showing ",
        /* @__PURE__ */ jsx("span", { id: "visible-count", children: filteredItems.length }),
        " of",
        " ",
        items.length,
        " entries"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "collection-grid", id: "collection-grid", children: visibleItems.map((item) => /* @__PURE__ */ jsx(
        "li",
        {
          className: "collection-card",
          "data-item": true,
          "data-type": item.typeCategory,
          "data-status": item.statusCategory,
          children: /* @__PURE__ */ jsx("a", { href: item.url, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs("div", { className: "thumb", children: [
            item.image ? /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image,
                alt: item.title,
                loading: "lazy",
                decoding: "async"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "placeholder", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { children: "?" }) }),
            /* @__PURE__ */ jsx("span", { className: "type-chip", children: item.typeCategory }),
            typeof item.score === "number" && item.score > 0 && /* @__PURE__ */ jsx("span", { className: "score-chip", children: item.score }),
            /* @__PURE__ */ jsx("div", { className: "title-overlay", children: /* @__PURE__ */ jsx("div", { className: "title-text", children: item.title }) }),
            item.notes ? /* @__PURE__ */ jsx("div", { className: "tags-overlay", title: item.notes, children: /* @__PURE__ */ jsx("div", { className: "tags-text", children: item.notes }) }) : null
          ] }) })
        },
        `${item.id}-${item.kind}`
      )) }),
      totalPages > 1 ? /* @__PURE__ */ jsxs("div", { className: "pager", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "pager-btn",
            "data-page": "prev",
            "aria-label": "Previous page",
            onClick: () => handlePageChange("prev"),
            disabled: currentPage === 1,
            children: "<"
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "pager-meta", id: "pager-meta", children: [
          "Page ",
          currentPage,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "pager-btn",
            "data-page": "next",
            "aria-label": "Next page",
            onClick: () => handlePageChange("next"),
            disabled: currentPage === totalPages,
            children: ">"
          }
        )
      ] }) : null
    ] }) : /* @__PURE__ */ jsx("p", { className: "muted", children: "Nothing to show right now." })
  ] }) });
}

function parseDate(input) {
  if (!input) return null;
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
function calculateDurationHeight(startDate, finishDate) {
  const start = parseDate(startDate);
  const finish = parseDate(finishDate) ?? start;
  if (!start || !finish) return 72;
  const diffInDays = Math.max(
    1,
    Math.round(Math.abs(finish.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24))
  );
  const pixelsPerDay = 0.65;
  const minHeight = 60;
  const maxHeight = 220;
  return Math.min(maxHeight, Math.max(minHeight, Math.round(diffInDays * pixelsPerDay)));
}
function AnimeTimeline({ items }) {
  const cardRefs = useRef({});
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState({});
  const [lineActive, setLineActive] = useState(false);
  const groups = useMemo(() => {
    const timelineItems = items.map((item) => {
      const date = parseDate(item.finishDate ?? item.startDate);
      return date ? { item, date } : null;
    }).filter(Boolean).sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    const grouped = [];
    timelineItems.forEach((entry) => {
      const key = `${entry.date.getFullYear()}`;
      let bucket = grouped.find((group) => group.key === key);
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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.timelineKey;
            if (key) {
              setVisibleCards((prev) => ({ ...prev, [key]: true }));
            }
          } else {
            const key = entry.target.dataset.timelineKey;
            if (key) {
              setVisibleCards((prev) => ({ ...prev, [key]: false }));
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    Object.values(cardRefs.current).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [groups]);
  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setLineActive(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  if (!groups.length) {
    return /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-skin-line bg-skin-card px-4 py-6 text-sm text-skin-base/80", children: "No anime with timeline data yet. Check back soon." });
  }
  let entryIndex = 0;
  return /* @__PURE__ */ jsxs("div", { ref: timelineRef, className: "relative py-6 sm:py-8 md:py-10", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        ref: lineRef,
        className: `pointer-events-none absolute left-[18px] top-0 z-0 h-full -translate-x-1/2 border-l-2 border-skin-line transition-opacity duration-500 ease-out sm:left-10 md:left-1/2 ${lineActive ? "opacity-85" : "opacity-45"}`
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-col gap-12", children: groups.map((group) => /* @__PURE__ */ jsxs("div", { className: "relative pt-10", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-1 left-[18px] flex -translate-y-1/2 items-center justify-center sm:left-10 md:left-1/2 md:-translate-x-1/2", children: /* @__PURE__ */ jsx("span", { className: "rounded-full border border-skin-line bg-skin-fill px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-skin-base shadow-sm", children: group.label }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-12", children: group.entries.map((entry, idx) => {
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
          "bg-pink-400"
        ];
        const barColor = barColors[timelineIndex % barColors.length];
        const setRef = (el) => {
          if (el) {
            el.dataset.timelineKey = key;
            cardRefs.current[key] = el;
          } else {
            delete cardRefs.current[key];
          }
        };
        const comments = entry.item.notes;
        const visible = visibleCards[key];
        const cardMotion = side === "left" ? visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6" : visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6";
        const barMotion = side === "left" ? visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4" : visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4";
        const cardColumnClass = side === "left" ? "col-start-2 col-end-3 md:col-start-1 md:col-end-2 md:justify-self-end md:pr-12" : "col-start-2 col-end-3 md:col-start-3 md:col-end-4 md:justify-self-start md:pl-12";
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative grid grid-cols-[auto_1fr] items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-10",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  "aria-hidden": "true",
                  className: `relative col-start-1 row-start-1 flex items-center justify-start pl-6 md:col-start-2 md:pl-0 ${side === "left" ? "md:justify-end md:-translate-x-8" : "md:justify-start md:translate-x-8"}`,
                  children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `relative flex items-center transition-all duration-500 ease-out ${barMotion}`,
                      children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: `relative w-2 rounded-full shadow-[0_12px_28px_rgba(0,0,0,0.12)] ${barColor}`,
                            style: { height: `${durationHeight}px` }
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-full h-px w-12 border-t border-skin-line md:hidden" }),
                        side === "left" ? /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-full hidden h-px w-12 border-t border-skin-line md:block" }) : /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-full hidden h-px w-12 border-t border-skin-line md:block" })
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("div", { className: cardColumnClass, children: /* @__PURE__ */ jsx(
                "div",
                {
                  ref: setRef,
                  className: `group relative overflow-hidden rounded-xl border border-skin-line bg-skin-card p-4 text-skin-base shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-skin-accent hover:shadow-[0_18px_40px_rgba(var(--color-accent),0.18)] ${cardMotion}`,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-skin-line bg-skin-fill", children: entry.item.image ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: entry.item.image,
                        alt: entry.item.title,
                        loading: "lazy",
                        decoding: "async",
                        className: "h-full w-full object-cover transition duration-200 group-hover:scale-105"
                      }
                    ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-xs text-skin-base/60", children: "No image" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: entry.item.url,
                            target: "_blank",
                            rel: "noreferrer",
                            className: "text-base font-semibold text-skin-accent underline-offset-4 decoration-dashed transition hover:underline",
                            children: entry.item.title
                          }
                        ),
                        entry.item.score ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-skin-fill px-3 py-1 text-xs font-semibold uppercase tracking-wide text-skin-base/80 ring-1 ring-skin-line", children: [
                          "Score ",
                          entry.item.score
                        ] }) : null
                      ] }),
                      comments ? /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-skin-base/80", children: comments }) : null
                    ] })
                  ] })
                }
              ) })
            ]
          },
          key
        );
      }) })
    ] }, group.key)) })
  ] });
}

function sortForGrid(items) {
  return [...items].sort((a, b) => {
    const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
    if (scoreDiff !== 0) return scoreDiff;
    return a.title.localeCompare(b.title);
  });
}
function sortForTimeline(items) {
  const toTime = (item) => {
    const finish = item.finishDate ? new Date(item.finishDate).getTime() : null;
    const start = item.startDate ? new Date(item.startDate).getTime() : null;
    return finish ?? start ?? 0;
  };
  return [...items].sort((a, b) => toTime(b) - toTime(a));
}
function CollectionExplorer({ items, error }) {
  const [viewMode, setViewMode] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const gridItems = useMemo(() => sortForGrid(items), [items]);
  const timelineItems = useMemo(() => sortForTimeline(items), [items]);
  useEffect(() => {
    setAnchorEl(document.getElementById("collection-view-toggle-anchor"));
  }, []);
  const toggle = /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3", children: [
    error ? /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-500/30", children: [
      "Some data may be missing: ",
      error
    ] }) : null,
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative inline-flex cursor-pointer items-center rounded-full border border-skin-line bg-skin-card px-1 py-1 shadow-sm transition hover:border-skin-accent/80",
        role: "switch",
        tabIndex: 0,
        "aria-checked": viewMode === "timeline",
        onClick: () => setViewMode((prev) => prev === "grid" ? "timeline" : "grid"),
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setViewMode((prev) => prev === "grid" ? "timeline" : "grid");
          }
        },
        children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle collection view" }),
          [
            { key: "grid", label: "Grid" },
            { key: "timeline", label: "Timeline" }
          ].map((option) => {
            const isActive = option.key === viewMode;
            return /* @__PURE__ */ jsxs(
              "span",
              {
                className: `relative z-10 flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition ${isActive ? "text-skin-base" : "text-skin-base/65"}`,
                "aria-hidden": true,
                children: [
                  option.key === "grid" ? /* @__PURE__ */ jsx(
                    "svg",
                    {
                      "aria-hidden": "true",
                      viewBox: "0 0 20 20",
                      className: "h-4 w-4",
                      fill: "currentColor",
                      children: /* @__PURE__ */ jsx("path", { d: "M2 3.5A1.5 1.5 0 0 1 3.5 2h4A1.5 1.5 0 0 1 9 3.5v4A1.5 1.5 0 0 1 7.5 9h-4A1.5 1.5 0 0 1 2 7.5v-4Zm0 9A1.5 1.5 0 0 1 3.5 11h4A1.5 1.5 0 0 1 9 12.5v4A1.5 1.5 0 0 1 7.5 18h-4A1.5 1.5 0 0 1 2 16.5v-4Zm9-9A1.5 1.5 0 0 1 12.5 2h4A1.5 1.5 0 0 1 18 3.5v4A1.5 1.5 0 0 1 16.5 9h-4A1.5 1.5 0 0 1 11 7.5v-4Zm0 9A1.5 1.5 0 0 1 12.5 11h4A1.5 1.5 0 0 1 18 12.5v4A1.5 1.5 0 0 1 16.5 18h-4A1.5 1.5 0 0 1 11 16.5v-4Z" })
                    }
                  ) : /* @__PURE__ */ jsx(
                    "svg",
                    {
                      "aria-hidden": "true",
                      viewBox: "0 0 20 20",
                      className: "h-4 w-4",
                      fill: "currentColor",
                      children: /* @__PURE__ */ jsx("path", { d: "M3 4a1 1 0 0 1 1-1h12v2H4a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h7v2H4a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h4v2H4a1 1 0 0 1-1-1Zm13.5-10.25 2.5 2.25-2.5 2.25V9.75H11.5v-1.5h5Z" })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: option.label })
                ]
              },
              option.key
            );
          })
        ]
      }
    )
  ] });
  const toggleNode = anchorEl ? createPortal(toggle, anchorEl) : /* @__PURE__ */ jsx("div", { className: "mb-4 flex justify-end", children: toggle });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    toggleNode,
    viewMode === "grid" ? /* @__PURE__ */ jsx(AnimeGrid, { items: gridItems }) : /* @__PURE__ */ jsx(AnimeTimeline, { items: timelineItems })
  ] });
}

const BASE_URL = "https://api.myanimelist.net/v2";
function mapItems(kind, data) {
  return data?.map(({ node, list_status }) => {
    const image = node.main_picture?.large ?? node.main_picture?.medium;
    const mediaType = node.media_type?.toLowerCase();
    const japaneseTitle = node.alternative_titles?.ja;
    const title = japaneseTitle && japaneseTitle.trim() || node.title;
    const typeCategory = kind === "manga" ? "Manga" : mediaType === "tv" ? "TV" : mediaType === "movie" ? "Movie" : "Other";
    const statusCategory = kind === "anime" ? list_status?.status === "watching" ? "consuming" : list_status?.status === "completed" ? "completed" : list_status?.status === "plan_to_watch" ? "plan" : "other" : list_status?.status === "reading" ? "consuming" : list_status?.status === "completed" ? "completed" : list_status?.status === "plan_to_read" ? "plan" : "other";
    const progress = kind === "anime" ? `${list_status?.num_episodes_watched ?? 0} eps` : `${list_status?.num_chapters_read ?? 0} ch`;
    const startDate = list_status?.start_date ? new Date(list_status.start_date).toISOString() : void 0;
    const finishDate = list_status?.finish_date ? new Date(list_status.finish_date).toISOString() : void 0;
    return {
      id: node.id,
      title,
      image,
      japaneseTitle,
      status: list_status?.status,
      statusCategory,
      score: list_status?.score,
      progress,
      url: `https://myanimelist.net/${kind}/${node.id}`,
      kind,
      mediaType: node.media_type,
      typeCategory,
      notes: list_status?.comments?.trim() || void 0,
      startDate,
      finishDate
    };
  }) ?? [];
}
async function fetchMalList(kind, { clientId, username, limit = 6 }) {
  if (!clientId) {
    return { items: [], error: "MAL_CLIENT_ID is missing." };
  }
  if (!username) {
    return { items: [], error: "MAL_USERNAME is missing." };
  }
  const fields = kind === "anime" ? "list_status{status,score,num_episodes_watched,comments,start_date,finish_date},media_type,alternative_titles{ja}" : "list_status{status,score,num_chapters_read,comments,start_date,finish_date},media_type,alternative_titles{ja}";
  const params = new URLSearchParams({
    limit: limit.toString(),
    fields,
    nsfw: "true"
  });
  const url = `${BASE_URL}/users/${encodeURIComponent(username)}/${kind}list?${params.toString()}`;
  try {
    const response = await fetch(url, {
      headers: { "X-MAL-CLIENT-ID": clientId }
    });
    if (!response.ok) {
      return {
        items: [],
        error: `MyAnimeList ${kind}list responded with ${response.status}.`
      };
    }
    const data = await response.json();
    const items = mapItems(kind, data.data);
    return { items, next: data.paging?.next };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to reach MyAnimeList.";
    return { items: [], error: message };
  }
}
async function fetchMalListAll(kind, options) {
  const initial = await fetchMalList(kind, {
    ...options,
    limit: options.limit ?? 100
  });
  if (initial.error || !options.clientId || !options.username) {
    return initial;
  }
  const items = [...initial.items];
  let nextUrl = initial.next;
  let guard = 0;
  while (nextUrl && guard < 20) {
    try {
      const response = await fetch(nextUrl, {
        headers: { "X-MAL-CLIENT-ID": options.clientId }
      });
      if (!response.ok) break;
      const data = await response.json();
      if (data.data?.length) {
        items.push(...mapItems(kind, data.data));
      }
      nextUrl = data.paging?.next;
    } catch {
      break;
    }
    guard += 1;
  }
  return { items };
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const clientId = "50cb40a7fae1506ccb985b12c5632530";
  const username = "WingsOFreedom";
  const anime = await fetchMalListAll("anime", {
    clientId,
    username,
    limit: 100
  });
  const manga = await fetchMalListAll("manga", {
    clientId,
    username,
    limit: 100
  });
  const items = [...anime.items, ...manga.items].sort(
    (a, b) => (b.score ?? 0) - (a.score ?? 0)
  );
  const error = anime.error ?? manga.error;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Collection | ${SITE.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "collection" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "Collection", "pageDesc": "Anime and manga I track on MyAnimeList." }, { "default": async ($$result3) => renderTemplate`  ${renderComponent($$result3, "CollectionExplorer", CollectionExplorer, { "client:load": true, "items": items, "error": error, "client:component-hydration": "load", "client:component-path": "@components/CollectionExplorer", "client:component-export": "default" })} `, "header-right": async ($$result3) => renderTemplate`${maybeRenderHead()}<div id="collection-view-toggle-anchor"></div>` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/pages/collection/index.astro", void 0);
const $$file = "/Users/stevejobs/study/projects/vernonwu.com/src/pages/collection/index.astro";
const $$url = "/collection";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
