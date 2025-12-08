import { useEffect, useMemo, useState } from "react";
import type { CollectionItem } from "@utils/myanimelist";
import "./AnimeGrid.css";

type TypeFilterKey = "all" | "TV" | "Movie" | "Manga";
type StatusFilterKey = "all" | "consuming" | "completed" | "plan";

const PAGE_SIZE = 6;

function buildTotals(items: CollectionItem[]) {
  return items.reduce(
    (acc, item) => {
      acc.type[item.typeCategory] = (acc.type[item.typeCategory] ?? 0) + 1;
      acc.status[item.statusCategory] =
        (acc.status[item.statusCategory] ?? 0) + 1;
      return acc;
    },
    { type: {} as Record<string, number>, status: {} as Record<string, number> }
  );
}

export default function AnimeGrid({ items }: { items: CollectionItem[] }) {
  const [activeType, setActiveType] = useState<TypeFilterKey>("all");
  const [activeStatus, setActiveStatus] = useState<StatusFilterKey>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const totals = useMemo(() => buildTotals(items), [items]);

  const typeFilters = useMemo(
    () => [
      { key: "all" as const, label: "All", count: items.length },
      { key: "TV" as const, label: "TV", count: totals.type["TV"] ?? 0 },
      { key: "Movie" as const, label: "Movie", count: totals.type["Movie"] ?? 0 },
      { key: "Manga" as const, label: "Manga", count: totals.type["Manga"] ?? 0 },
    ],
    [items.length, totals.type]
  );

  const filteredByType = useMemo(
    () =>
      items.filter(item => activeType === "all" || item.typeCategory === activeType),
    [items, activeType]
  );

  const statusCounts = useMemo(() => {
    const counts: Record<StatusFilterKey, number> = {
      all: filteredByType.length,
      consuming: 0,
      completed: 0,
      plan: 0,
    };

    filteredByType.forEach(item => {
      const key = item.statusCategory as StatusFilterKey;
      if (counts[key] !== undefined) counts[key] += 1;
    });

    return counts;
  }, [filteredByType]);

  const filteredItems = useMemo(
    () =>
      filteredByType.filter(
        item => activeStatus === "all" || item.statusCategory === activeStatus
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
    setCurrentPage(prev => Math.min(prev, totalPages));
  }, [totalPages]);

  const visibleItems = useMemo(
    () =>
      filteredItems.slice(
        (currentPage - 1) * PAGE_SIZE,
        (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
      ),
    [filteredItems, currentPage]
  );

  const handleTypeChange = (key: TypeFilterKey, disabled: boolean) => {
    if (disabled || key === activeType) return;
    setActiveType(key);
  };

  const handleStatusChange = (key: StatusFilterKey, disabled: boolean) => {
    if (disabled || key === activeStatus) return;
    setActiveStatus(key);
  };

  const handlePageChange = (direction: "prev" | "next") => {
    setCurrentPage(prev => {
      if (direction === "prev") return Math.max(1, prev - 1);
      return Math.min(totalPages, prev + 1);
    });
  };

  return (
    <section id="collection">
      <div className="collection-group">
        <div className="filters">
          <div className="type-row">
            {typeFilters.map(filter => {
              const isActive = filter.key === activeType;
              const disabled = filter.count === 0;
              return (
                <span
                  key={filter.key}
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  className={[
                    "type-item",
                    isActive ? "active" : "",
                    disabled ? "disabled" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  data-filter="type"
                  data-key={filter.key}
                  aria-pressed={isActive}
                  onClick={() => handleTypeChange(filter.key, disabled)}
                  onKeyDown={event => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleTypeChange(filter.key, disabled);
                    }
                  }}
                >
                  <span className="type-label">{filter.label}</span>
                  <span className="type-count">{filter.count}</span>
                </span>
              );
            })}
          </div>
          <div className="divider" />
          <div className="filter-row">
            {[
              { key: "all", label: "All" },
              { key: "consuming", label: "Currently Consuming" },
              { key: "completed", label: "Completed" },
              { key: "plan", label: "Plan to Watch" },
            ].map(filter => {
              const key = filter.key as StatusFilterKey;
              const isActive = key === activeStatus;
              const count = statusCounts[key] ?? 0;
              const disabled = count === 0;
              return (
                <button
                  type="button"
                  key={filter.key}
                  className={[
                    "filter-pill",
                    isActive ? "active" : "",
                    disabled ? "disabled" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  data-filter="status"
                  data-key={filter.key}
                  aria-pressed={isActive}
                  disabled={disabled}
                  onClick={() => handleStatusChange(key, disabled)}
                >
                  {filter.label} <span className="pill-count">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {items.length > 0 ? (
          <>
            <p className="muted" id="visible-meta">
              Showing <span id="visible-count">{filteredItems.length}</span> of{" "}
              {items.length} entries
            </p>
            <ul className="collection-grid" id="collection-grid">
              {visibleItems.map(item => (
                <li
                  key={`${item.id}-${item.kind}`}
                  className="collection-card"
                  data-item
                  data-type={item.typeCategory}
                  data-status={item.statusCategory}
                >
                  <a href={item.url} target="_blank" rel="noreferrer">
                    <div className="thumb">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="placeholder" aria-hidden="true">
                          <span>?</span>
                        </div>
                      )}
                      <span className="type-chip">{item.typeCategory}</span>
                      {typeof item.score === "number" && item.score > 0 && (
                        <span className="score-chip">{item.score}</span>
                      )}
                      <div className="title-overlay">
                        <div className="title-text">{item.title}</div>
                      </div>
                      {item.tags?.length ? (
                        <div className="tags-overlay" title={item.tags.join(", ")}>
                          <div className="tags-text">{item.tags.join(", ")}</div>
                        </div>
                      ) : null}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            {totalPages > 1 ? (
              <div className="pager">
                <button
                  type="button"
                  className="pager-btn"
                  data-page="prev"
                  aria-label="Previous page"
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <span className="pager-meta" id="pager-meta">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  className="pager-btn"
                  data-page="next"
                  aria-label="Next page"
                  onClick={() => handlePageChange("next")}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <p className="muted">Nothing to show right now.</p>
        )}
      </div>
    </section>
  );
}
