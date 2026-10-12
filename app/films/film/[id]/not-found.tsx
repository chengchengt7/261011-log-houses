import Link from "next/link";
import "./page.css";

export default function FilmNotFound() {
  return (
    <section className="film-detail">
      <h1>Film not found</h1>
      <p>This video may be private, removed, or the link may be incorrect.</p>
      <Link href="/films">Back to films</Link>
    </section>
  );
}
