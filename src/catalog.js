import { SERIES } from "./series.js";
import { buildMetadata } from "./metadata.js";

export async function getCatalog() {
  const metas = [];

  for (const series of SERIES) {
    try {
      const metadata = await buildMetadata(series);

      metas.push({
        id: metadata.id,
        type: "series",
        name: metadata.name,
        poster: metadata.poster,
        background: metadata.background,
        description: metadata.description,
        releaseInfo: metadata.releaseInfo,
        imdbRating: metadata.imdbRating,
        tmdbRating: metadata.tmdbRating,

        imdb_id: metadata.imdb_id,
        imdbId: metadata.imdbId,

        tmdb_id: metadata.tmdb_id,
        tmdbId: metadata.tmdbId,
        moviedb_id: metadata.moviedb_id,

        tvdb_id: metadata.tvdb_id,
        tvdbId: metadata.tvdbId,

        trakt_id: metadata.trakt_id,
        traktId: metadata.traktId,

        mdblist_id: metadata.mdblist_id,
        mdblistId: metadata.mdblistId,

        ids: metadata.ids
      });
    } catch (error) {
      console.error(
        `Error creando metadata para ${series.name}:`,
        error.message
      );
    }
  }

  return metas;
}
