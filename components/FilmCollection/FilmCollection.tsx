"use client";

import { useState } from "react";
import SearchField from "@/components/SearchField/SearchField";
import FilmFilters from "@/components/FilmFilters/FilmFilters";
import FilmGrid from "@/components/FilmGrid/FilmGrid";
import { filterFilms } from "@/lib/filterFilms";
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
  const countries = [...new Set(films.map((film) => film.country))];
  const visibleFilms = filterFilms(films, filters);
  const hasFilters = Object.values(filters).some(Boolean);

  function updateFilter(name: keyof FilmFilterValues, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="film-collection">
      <SearchField value={filters.query} onChange={(value) => updateFilter("query", value)} />
      <FilmFilters countries={countries} filters={filters} onChange={updateFilter} />
      <div className="film-collection-results">
        <p role="status">
          {visibleFilms.length} of {films.length} films in this curated collection
        </p>
        {hasFilters && (
          <button type="button" onClick={() => setFilters(emptyFilters)}>Reset filters</button>
        )}
      </div>
      {visibleFilms.length > 0 ? (
        <FilmGrid films={visibleFilms} />
      ) : (
        <p className="film-collection-empty">No films match. Try another search or reset the filters.</p>
      )}
    </div>
  );
}
