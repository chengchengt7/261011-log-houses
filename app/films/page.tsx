import FilmGrid from "@/components/FilmGrid/FilmGrid";
import { getFilms } from "@/lib/films";

export default async function FilmsPage() {
  const films = await getFilms().catch(() => null);

  return (
    <section>
      <h1>The film collection</h1>
      <p>Explore our curated collection of 15 films about log houses.</p>
      {films === null ? (
        <p role="alert">Unable to load films. Please try again later.</p>
      ) : films.length === 0 ? (
        <p>No films are available right now.</p>
      ) : (
        <FilmGrid films={films} />
      )}
    </section>
  );
}
