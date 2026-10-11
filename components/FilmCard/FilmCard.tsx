import Image from "next/image";
import type { Film } from "@/types/film";
import "./FilmCard.css";

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
  return (
    <article className="film-card">
      <div className="film-card-image">
        <Image
          src={film.thumbnail}
          alt=""
          width={320}
          height={180}
          unoptimized
        />
        <span className="film-card-duration" aria-label={`Duration: ${film.duration}`}>
          {film.duration}
        </span>
      </div>
      <p className="film-card-meta">{film.country} · {film.year}</p>
      <h2>{film.title}</h2>
      <span className="film-card-tag">{film.theme}</span>
    </article>
  );
}
