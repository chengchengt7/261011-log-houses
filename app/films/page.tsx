import FilmGrid from "@/components/FilmGrid/FilmGrid";
import { FILM_IDS } from "@/constants/api";

export default function FilmsPage() {
  const films = FILM_IDS.map((id, index) => ({
    id,
    title: `Film ${index + 1}`,
  }));

  return (
    <section>
      <h1>The film collection</h1>
      <p>15 selected films about log houses. Film details are coming next.</p>
      <FilmGrid films={films} />
    </section>
  );
}
