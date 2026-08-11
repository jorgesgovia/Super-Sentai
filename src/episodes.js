import { SERIES } from "./series.js";
import { getTmdbSeries } from "./tmdb.js";

export async function getEpisodes(seriesId) {
  const series = SERIES.find((item) => item.id === seriesId);

  if (!series) {
    throw new Error(`Serie no encontrada: ${seriesId}`);
  }

  const tmdb = await getTmdbSeries(series.tmdbId);

  const episodes = [];

  for (const season of tmdb.seasons || []) {
    if (season.season_number === 0) {
      continue;
    }

    const seasonUrl =
      `https://api.themoviedb.org/3/tv/${series.tmdbId}/season/` +
      `${season.season_number}` +
      `?api_key=${process.env.TMDB_API_KEY}` +
      `&language=es-MX`;

    const response = await fetch(seasonUrl);

    if (!response.ok) {
      throw new Error(
        `TMDB respondió ${response.status} al obtener la temporada`
      );
    }

    const seasonData = await response.json();

    for (const episode of seasonData.episodes || []) {
      episodes.push({
        id: `${series.id}:${season.season_number}:${episode.episode_number}`,
        type: "episode",
        seriesId: series.id,
        season: season.season_number,
        episode: episode.episode_number,
        name: episode.name || `Episodio ${episode.episode_number}`,
        overview: episode.overview || "",
        released: episode.air_date
          ? `${episode.air_date}T00:00:00.000Z`
          : null,
        thumbnail: episode.still_path
          ? `https://image.tmdb.org/t/p/w780${episode.still_path}`
          : "",
        runtime: episode.runtime || null
      });
    }
  }

  return episodes;
}