import "server-only";
import { formatDuration } from "@/lib/formatDuration";
import { CURATED_FILMS } from "@/constants/films";
import type { Film } from "@/types/film";
import { FILM_API_ENDPOINT } from "@/constants/api";

type YouTubeVideo = {
  id: string;
  contentDetails: { duration: string };
  snippet: {
    title: string;
    publishedAt: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium?: { url: string };
    };
  };
};

export async function getFilms(): Promise<Film[]> {
  const key = process.env.YOUTUBE_API_KEY;

  if (!key) {
    throw new Error("YOUTUBE_API_KEY is missing from .env.local.");
  }

  const params = new URLSearchParams({
    part: "snippet,contentDetails",
    id: CURATED_FILMS.map((film) => film.id).join(","),
    key,
  });

  const response = await fetch(`${FILM_API_ENDPOINT}?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch films from YouTube.");
  }

  const data: { items: YouTubeVideo[] } = await response.json();

  return CURATED_FILMS.flatMap((film) => {
    const video = data.items.find((item) => item.id === film.id);

    if (!video) return [];

    return [{
      id: film.id,
      country: film.country,
      theme: film.theme,
      year: video.snippet.publishedAt.slice(0, 4),
      duration: formatDuration(video.contentDetails.duration),
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail:
        video.snippet.thumbnails.medium?.url ??
        video.snippet.thumbnails.default.url,
    }];
  });
}
