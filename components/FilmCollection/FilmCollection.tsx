"use client";

import { useEffect, useState } from "react";
import SearchField from "@/components/SearchField/SearchField";
import FilmFilters from "@/components/FilmFilters/FilmFilters";
import FilmGrid from "@/components/FilmGrid/FilmGrid";
import { filterFilms } from "@/utils/filterFilms";
import type { FilmCardData, FilmFilterValues } from "@/types/film";
import "./FilmCollection.css";

const emptyFilters: FilmFilterValues = {
  query: "",
  country: "",
  duration: "",
  theme: "",
};

export default function FilmCollection({ films }: { films: FilmCardData[] }) {
  const [filters, setFilters] = useState(emptyFilters);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [watchlistOnly, setWatchlistOnly] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("log-houses-watchlist") ?? "[]");
      if (Array.isArray(saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Restore saved IDs from browser storage after hydration.
        setSavedIds(saved.filter((id) => typeof id === "string"));
      }
    } catch {
      // Start with an empty watchlist if browser storage is unavailable.
    }
  }, []);

  function toggleSaved(id: string) {
    const next = savedIds.includes(id)
      ? savedIds.filter((savedId) => savedId !== id)
      : [...savedIds, id];
    setSavedIds(next);
    try {
      localStorage.setItem("log-houses-watchlist", JSON.stringify(next));
    } catch {
      // Saving still works for this visit if browser storage is unavailable.
    }
  }
  const countries = [...new Set(films.map((film) => film.country))];
  const visibleFilms = filterFilms(films, filters).filter(
    (film) => !watchlistOnly || savedIds.includes(film.id),
  );
  const hasFilters = watchlistOnly || Object.values(filters).some(Boolean);

  function updateFilter(name: keyof FilmFilterValues, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="film-collection">
      <SearchField value={filters.query} onChange={(value) => updateFilter("query", value)} />
      <FilmFilters
        countries={countries}
        filters={filters}
        onChange={updateFilter}
        watchlistOnly={watchlistOnly}
        onWatchlistChange={() => setWatchlistOnly(!watchlistOnly)}
      />
      <div className="film-collection-results">
        <p role="status">
          {visibleFilms.length} of {films.length} films in this curated collection
        </p>
        {hasFilters && (
          <button type="button" onClick={() => { setFilters(emptyFilters); setWatchlistOnly(false); }}>Reset filters</button>
        )}
      </div>
      {visibleFilms.length > 0 ? (
        <FilmGrid films={visibleFilms} savedIds={savedIds} onToggleSaved={toggleSaved} />
      ) : (
        <p className="film-collection-empty">
          {watchlistOnly && savedIds.length === 0
            ? "Your watchlist is empty. Save films using the bookmark on each card."
            : "No films match. Try another search or reset the filters."}
        </p>
      )}
    </div>
  );
}
