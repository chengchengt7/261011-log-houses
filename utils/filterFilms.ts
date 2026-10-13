import type { FilmCardData, FilmFilterValues } from "@/types/film";

export function filterFilms(films: FilmCardData[], filters: FilmFilterValues) {
  const words = filters.query.trim().toLowerCase().split(" ").filter(Boolean);

  return films.filter((film) => {
    const text = `${film.title} ${film.description} ${film.country} ${film.theme}`.toLowerCase();
    const matchesSearch = words.every((word) => text.includes(word));
    const matchesCountry = !filters.country || film.country === filters.country;
    const matchesTheme = !filters.theme || film.theme === filters.theme;
    const matchesDuration =
      !filters.duration ||
      (filters.duration === "short" && film.durationSeconds > 0 && film.durationSeconds < 1800) ||
      (filters.duration === "long" && film.durationSeconds >= 1800);

    return matchesSearch && matchesCountry && matchesTheme && matchesDuration;
  });
}
