import FilmCollection from "@/components/FilmCollection/FilmCollection";
import { getFilms } from "@/utils/filmsApi";

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
        <FilmCollection films={films} />
      )}
    </section>
  );
}
