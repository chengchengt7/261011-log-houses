import { CURATED_FILMS } from "@/constants/films";
import Link from "next/link";
import "./page.css";

export default function AboutPage() {
  const countryCount = new Set(CURATED_FILMS.map((film) => film.country)).size;
  return (
    <article className="about-page">
      <section>
        <h1>About the collection</h1>
        <p>
          Log Houses Across the World brings together {CURATED_FILMS.length} selected films from
          {" "}{countryCount} countries. Explore how people build with logs, pass on
          traditional skills, and make a home close to nature.
        </p>
      </section>

      <section>
        <h2>Who it is for</h2>
        <p>
          This collection is for anyone curious about craftsmanship,
          architecture, cultural heritage, and life in the forest. You do not
          need building experience. Follow the work of different makers and
          discover the everyday lives shaped by their homes.
        </p>
      </section>

      <section>
        <h2>Sources and selection</h2>
        <p>
          Film titles, descriptions, thumbnails, durations, and publication
          dates come from the YouTube Data API. The detail pages also show
          channel information, view counts, and uploader tags when available.
          Videos play through YouTube, and each detail page links to the
          original video.
        </p>
        <p>
          The selection is curated. Country labels and the themes “The craft”
          and “Life inside” are assigned manually. The year shown is the YouTube
          publication year, which can differ from the year a film was made.
          Videos may become unavailable if their uploaders remove them or change
          their settings.
        </p>
        <a href="https://developers.google.com/youtube/v3/docs/videos">
          Read about the YouTube Data API ↗
        </a>
      </section>

      <section>
        <h2>Created by</h2>
        <p>
          Created by Chengcheng as a student project using Next.js and
          TypeScript. The project explores how a small film collection can make
          traditional building knowledge and different ways of life easier to
          discover.
        </p>
      </section>

      <Link href="/films">Explore the films →</Link>
    </article>
  );
}
