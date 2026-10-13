import type { FilmCardData } from "@/types/film";
import FilmCard from "@/components/FilmCard/FilmCard";
import "./FilmGrid.css";

type FilmGridProps = {
  films: FilmCardData[];
  savedIds: string[];
  onToggleSaved: (id: string) => void;
};

export default function FilmGrid({ films, savedIds, onToggleSaved }: FilmGridProps) {
  return (
    <ul className="film-grid">
      {films.map((film) => (
        <li key={film.id}>
          <FilmCard
            film={film}
            isSaved={savedIds.includes(film.id)}
            onToggleSaved={() => onToggleSaved(film.id)}
          />
        </li>
      ))}
    </ul>
  );
}
