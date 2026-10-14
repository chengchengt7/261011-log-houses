import "server-only";
import { formatDuration, getDurationSeconds } from "@/utils/formatDuration";
import { CURATED_FILMS } from "@/constants/films";
import type { FilmCardData, FilmDetails } from "@/types/film";
import { FILM_API_ENDPOINT } from "@/constants/api";

export async function getFilms(): Promise<FilmCardData[]> {
  const videos = await getYouTubeVideos(CURATED_FILMS.map((film) => film.id));

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
        video.snippet.thumbnails.maxres?.url ??
        video.snippet.thumbnails.high?.url ??
        video.snippet.thumbnails.default.url,
    }];
  });
}

export async function getYouTubeVideos(ids: string[]): Promise<FilmDetails[]> {
  if (ids.length === 0) {
    return [];
  }

  const key = process.env.YOUTUBE_API_KEY;

  if (!key) {
    console.error("YOUTUBE_API_KEY is not configured.");
    throw new Error("YOUTUBE_API_KEY is not configured.");
  }

  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics,status",
    hl: "en",
    id: ids.join(","),
    key,
  });

  const response = await fetch(`${FILM_API_ENDPOINT}?${params}`, {
    next: { revalidate: 3600 },
  }).catch(() => {
    console.error("YouTube API network request failed.");
    throw new Error("Unable to fetch films from YouTube.");
  });

  if (!response.ok) {
    const details: {
      error?: { status?: string; errors?: { reason?: string }[] };
    } | null = await response.json().catch(() => null);

    console.error("YouTube API request failed:", {
      status: response.status,
      error: details?.error?.status,
      reasons: details?.error?.errors?.map((error) => error.reason),
    });
    throw new Error("Unable to fetch films from YouTube.");
  }

  const data: { items: FilmDetails[] } = await response.json();
  return data.items.map((video) => ({
    ...video,
    snippet: {
      ...video.snippet,
      title: video.snippet.localized?.title ?? video.snippet.title,
    },
  }));
}
