export type FilmCardData = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  country: string;
  theme: "The craft" | "Life inside";
  year: string;
};

export type FilmDetails = {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    tags?: string[];
    thumbnails: {
      default: { url: string };
      medium?: { url: string };
    };
  };
  contentDetails: { duration: string };
  statistics?: { viewCount?: string };
  status: { embeddable: boolean };
};
