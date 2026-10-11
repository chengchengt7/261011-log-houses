import FilmGrid from "@/components/FilmGrid/FilmGrid";
import Hero from "@/components/Hero/Hero";
import { getFilms } from "@/lib/films";

export default async function Home() {
  const films = await getFilms().catch(() => null);

  return (
    <>
      <Hero />
      {films === null ? (
        <p role="alert">Unable to load films. Please try again later.</p>
      ) : films.length === 0 ? (
        <p>No films are available right now.</p>
      ) : (
        <FilmGrid films={films} />
      )}
    </>
  );
}
