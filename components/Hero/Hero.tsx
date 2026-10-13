"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { FilmCardData } from "@/types/film";
import "./Hero.css";

type HeroProps = {
  films: FilmCardData[];
};

export default function Hero({ films }: HeroProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || films.length < 2) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = setInterval(() => {
      if (!motion.matches) setActive((current) => (current + 1) % films.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [paused, films.length]);

  return (
    <section className="hero">
      <div className="hero-background" aria-hidden="true">
        {films.map((film, index) => (
          <Image
            key={film.id}
            src={film.thumbnail}
            alt=""
            fill
            sizes="100vw"
            unoptimized
            loading={index === 0 ? "eager" : "lazy"}
            className={`hero-image${index === active % films.length ? " hero-image-active" : ""}`}
          />
        ))}
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">· LOG HOUSE FILMS — A WORLD OF TRADITION</p>
        <h1>Log Houses<br /><span className="hero-h1">Across the World</span></h1>
        <p className="hero-des">
          From Norwegian <span className="ita">laft</span> and Finnish <span className="ita">hirsitalo</span> to Russian <span className="ita">izba</span>, Chinese <span className="ita">木刻楞</span>, and North American <span className="ita">log cabins</span>. Discover how different cultures build homes from logs, exploring the craftsmanship behind their construction and the ways of life shaped by forests and the wilderness.
        </p>
        <a className="hero-explore" href="#collection">Explore the collection ↓</a>
      </div>
      {films.length > 1 && (
        <button
          type="button"
          className="hero-pause"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Resume slideshow" : "Pause slideshow"}
        </button>
      )}
    </section>
  );
}
