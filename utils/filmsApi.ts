import "server-only";
import { formatDuration, getDurationSeconds } from "@/utils/formatDuration";
import { CURATED_FILMS } from "@/constants/films";
import type { FilmCardData, FilmDetails } from "@/types/film";
import { FILM_API_ENDPOINT } from "@/constants/api";

export async function getFilms(): Promise<FilmCardData[]> {
  const videos = await getFilm(CURATED_FILMS.map((film) => film.id));

  return CURATED_FILMS.flatMap((film) => {
    const video = videos.find((item) => item.id === film.id);

    if (!video) return [];

    return [{
      id: film.id,
      country: film.country,
      theme: film.theme,
      year: video.snippet.publishedAt.slice(0, 4),
      duration: formatDuration(video.contentDetails.duration),
      durationSeconds: getDurationSeconds(video.contentDetails.duration),
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail:
        video.snippet.thumbnails.medium?.url ??
        video.snippet.thumbnails.default.url,
    }];
  });
}

export async function getFilm(ids: string[]): Promise<FilmDetails[]> {
  if (ids.length === 0) {
    return [];
  }

  const key = process.env.YOUTUBE_API_KEY;

  if (!key) {
    throw new Error("YOUTUBE_API_KEY is missing from .env.local.");
  }

  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics,status",
    id: ids.join(","),
    key,
  });

  const response = await fetch(`${FILM_API_ENDPOINT}?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch films from YouTube.");
  }

  const data: { items: FilmDetails[] } = await response.json();
  return data.items;
}
