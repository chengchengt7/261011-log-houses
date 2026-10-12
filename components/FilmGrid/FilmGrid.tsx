import type { FilmCardData } from "@/types/film";
import FilmCard from "@/components/FilmCard/FilmCard";
import "./FilmGrid.css";

type FilmGridProps = {
  films: FilmCardData[];
};

export default function FilmGrid({ films }: FilmGridProps) {
  return (
    <ul className="film-grid">
      {films.map((film) => (
        <li key={film.id}>
          <FilmCard film={film} />
        </li>
      ))}
    </ul>
  );
}
