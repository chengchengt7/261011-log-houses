import FilmCard from "@/components/FilmCard/FilmCard";
import "./FilmGrid.css";

type FilmGridProps = {
  films: { id: string; title: string }[];
};

export default function FilmGrid({ films }: FilmGridProps) {
  return (
    <ul className="film-grid">
      {films.map((film) => (
        <li key={film.id}>
          <FilmCard title={film.title} />
        </li>
      ))}
    </ul>
  );
}
