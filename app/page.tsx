import FilmCollection from "@/components/FilmCollection/FilmCollection";
import Hero from "@/components/Hero/Hero";
import { getFilms } from "@/utils/filmsApi";

export default async function Home() {
  const films = await getFilms().catch(() => null);

  return (
    <>
      <Hero films={films ?? []} />
      {films === null ? (
        <p role="alert">Unable to load films. Please try again later.</p>
      ) : films.length === 0 ? (
        <p>No films are available right now.</p>
      ) : (
        <section id="collection" aria-label="Film collection">
          <FilmCollection films={films} />
        </section>
      )}
      
    </>
  );
}
