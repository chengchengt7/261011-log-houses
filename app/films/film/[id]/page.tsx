import Link from "next/link";
import { notFound } from "next/navigation";
import { getYouTubeVideos } from "@/utils/filmsApi";
import { formatDuration } from "@/utils/formatDuration";
import "./page.css";

export default async function FilmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [film] = await getYouTubeVideos([id]);
  if (!film) notFound();

  return (
    <article className="film-detail">
      <Link href="/films">← Back to films</Link>
      <h1>{film.snippet.title}</h1>
      <p>
        By <a href={`https://www.youtube.com/channel/${film.snippet.channelId}`}>
          {film.snippet.channelTitle}
        </a>
      </p>

      {film.status.embeddable ? (
        <iframe
          className="film-detail-player"
          src={`https://www.youtube.com/embed/${film.id}`}
          title={`Watch ${film.snippet.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <p>This video is available to watch on YouTube.</p>
      )}
      <a href={`https://www.youtube.com/watch?v=${film.id}`}>
        Watch on YouTube ↗
      </a>

      <dl className="film-detail-facts">
        <div>
          <dt>Published on YouTube</dt>
          <dd><time dateTime={film.snippet.publishedAt}>
            {film.snippet.publishedAt.slice(0, 10)}
          </time></dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{formatDuration(film.contentDetails.duration)}</dd>
        </div>
        {film.statistics?.viewCount !== undefined && (
          <div>
            <dt>Views</dt>
            <dd>{Number(film.statistics.viewCount).toLocaleString("en-US")}</dd>
          </div>
        )}
      </dl>

      <section>
        <h2>From the creator</h2>
        <p className="film-detail-description">
          {film.snippet.description || "The creator has not provided a description."}
        </p>
      </section>

      {!!film.snippet.tags?.length && (
        <section>
          <h2>Video tags</h2>
          <ul className="film-detail-tags">
            {film.snippet.tags.map((tag, index) => <li key={`${tag}-${index}`}>{tag}</li>)}
          </ul>
        </section>
      )}
    </article>
  );
}
