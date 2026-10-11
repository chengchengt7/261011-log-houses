import FilmGrid from "@/components/FilmGrid/FilmGrid";
import Hero from "@/components/Hero/Hero";
import { FILM_IDS } from "@/constants/api";


export default function Home() {
  const films = FILM_IDS.map((id, index) => ({
    id,
    title: `Film ${index + 1}`,
  }));

  return (
    <main>
      <Hero />
      <FilmGrid films={films} />
    </main>
  );
}
