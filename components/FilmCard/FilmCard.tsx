import "./FilmCard.css";

type FilmCardProps = {
  title: string;
};

export default function FilmCard({ title }: FilmCardProps) {
  return (
    <article className="film-card">
      <h2>{title}</h2>
      <p>Film details coming soon.</p>
    </article>
  );
}
