# Log Houses Across the World

**Live site:** [log-houses.vercel.app](https://log-houses.vercel.app/)

A student project built with Next.js, React, and TypeScript. The site helps people interested in craftsmanship, architecture, cultural heritage, and life close to nature discover a curated collection of films about log houses.

## Features

- Homepage with a rotating film-thumbnail background and a pause control.
- Film collection with text search and filters for country, duration, and theme.
- Pagination using `FILMS_PER_PAGE` in `constants/films.ts` (currently 12).
- Bookmark buttons and a watchlist stored in the browser.
- Detail pages with an embedded video, description, channel, publication date, duration, view count, and available tags.
- About page explaining the audience, selection, data source, and creator.
- Loading, failed-request, missing-video, and no-results messages.

Search and filters apply to the selected collection, not all videos on YouTube.


## Installation and local setup

Use Node.js 20.9 or newer. From the project folder, install dependencies:

```bash
npm install
```

Create a project in Google Cloud, enable **YouTube Data API v3**, and create an API key. See the [YouTube API setup guide](https://developers.google.com/youtube/v3/getting-started).

Create `.env.local` in the project root:

```env
YOUTUBE_API_KEY=your_api_key_here
```

The key is used only on the server. Do not add a `NEXT_PUBLIC_` prefix or commit `.env.local`; environment files are ignored by Git. Visitors do not need their own key.

Start the development server:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). Restart the development server after changing the key.

To check the code and build the site:

```bash
npm run lint
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Vercel deployment

Open the project's **Settings → Environment Variables**. Add `YOUTUBE_API_KEY`, paste the key as its value, select **Production** (and **Preview** if needed), and save. Then redeploy from **Deployments**. The local `.env.local` file is not uploaded, and variable changes apply only to new deployments. See [Vercel's environment-variable guide](https://vercel.com/docs/environment-variables/managing-environment-variables).

If films fail to load, check the terminal locally or Vercel's server logs. API failures log the HTTP status and available error reasons, such as quota or permission problems, without logging the API key or request URL.

## Data source

The site uses the YouTube Data API v3 [videos endpoint](https://developers.google.com/youtube/v3/docs/videos/list):

```text
https://www.googleapis.com/youtube/v3/videos
```

`utils/filmsApi.ts` requests `snippet`, `contentDetails`, `statistics`, and `status`. It requests English metadata with `hl=en`, uses a localized title when available, and falls back to the original title. API responses are cached with a one-hour revalidation interval.

`constants/films.ts` stores the selected video IDs and manually assigned country and theme labels. Titles, descriptions, thumbnails, durations, publication dates, and other video details come from YouTube. The year displayed is the YouTube publication year, not necessarily the original production year.

Videos are played through YouTube's embedded player. Each detail page also links to the original video.

## Project structure

```text
app/          Pages, shared layout, and global styles
components/   Reusable interface components
constants/    API endpoint, page size, and curated film entries
types/        Shared TypeScript types
utils/        API requests, filtering, and duration helpers
public/       Static icons and other assets
```

To add a film, add its YouTube ID, country, and theme to `CURATED_FILMS` in `constants/films.ts`.


## Known limitations

- Videos can be removed, made private, restricted by country, or have embedding disabled by their uploaders.
- API requests can fail because of network issues, invalid configuration, or exhausted YouTube quota. Cached metadata may take up to an hour to refresh.
- English titles are only available when YouTube supplies localized metadata. Subtitle languages and automatic translation are controlled by YouTube. Auto-translation has been observed to fail in the embedded player even when it works on YouTube; use the **Watch on YouTube** link as a fallback.
- Bookmarks are saved in `localStorage` for the current browser and site address. They do not sync across browsers, devices, or open pages in real time. Clearing browser storage removes them. If storage is unavailable, bookmarking works only for the current visit.
- No sign-in, database, or editing of YouTube content is included.
