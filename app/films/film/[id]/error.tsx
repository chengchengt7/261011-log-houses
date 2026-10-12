"use client";

import Link from "next/link";
import "./page.css";

export default function FilmError({ reset }: { reset: () => void }) {
  return (
    <section className="film-detail">
      <h1>Unable to load this film</h1>
      <p role="alert">We could not reach the film information. Please try again.</p>
      <button onClick={() => reset()}>Try again</button>
      <Link href="/films">Back to films</Link>
    </section>
  );
}
