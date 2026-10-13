import Link from "next/link";
import Image from "next/image";
import BookmarkIcon from "@/components/BookmarkIcon/BookmarkIcon";
import type { FilmCardData } from "@/types/film";
import "./FilmCard.css";

type FilmCardProps = {
  film: FilmCardData;
  isSaved: boolean;
  onToggleSaved: () => void;
};

export default function FilmCard({ film, isSaved, onToggleSaved }: FilmCardProps) {
  return (
    <div className="film-card-container">
      <Link href={`/films/film/${film.id}`} className="film-card-link" aria-label={film.title}>
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
      </Link>
      <button
        type="button"
        className="bookmark"
        aria-pressed={isSaved}
        aria-label={`${isSaved ? "Remove from" : "Add to"} watchlist: ${film.title}`}
        onClick={onToggleSaved}
      >
        <BookmarkIcon filled={isSaved} className="bookmark-icon" />
      </button>
    </div>
  );
}
