import { SERIES } from "./series.js";
import { getTmdbSeries } from "./tmdb.js";

export async function getEpisodes(seriesId) {
  const series = SERIES.find((item) => item.id === seriesId);

  if (!series) {
    throw new Error(`Serie no encontrada: ${seriesId}`);
  }

  const tmdb = await getTmdbSeries(series.tmdbId);

  // Obtener reparto principal de la serie
  const creditsUrl =
    `https://api.themoviedb.org/3/tv/${series.tmdbId}/credits` +
    `?api_key=${process.env.TMDB_API_KEY}` +
    `&language=es-MX`;

  const creditsResponse = await fetch(creditsUrl);

  let cast = [];

  if (creditsResponse.ok) {
    const credits = await creditsResponse.json();

    cast = (credits.cast || []).slice(0, 20).map((person) => ({
      name: person.name,
      character: person.character || "",
      profile: person.profile_path
        ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
        : null
    }));
  }

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
      // Si no existe sinopsis en español, pedirla en inglés
      let overview = episode.overview || "";

      if (!overview) {
        const fallbackUrl =
          `https://api.themoviedb.org/3/tv/${series.tmdbId}/season/` +
          `${season.season_number}/episode/${episode.episode_number}` +
          `?api_key=${process.env.TMDB_API_KEY}` +
          `&language=en-US`;

        const fallbackResponse = await fetch(fallbackUrl);

        if (fallbackResponse.ok) {
          const fallbackEpisode = await fallbackResponse.json();
          overview = fallbackEpisode.overview || "";
        }
      }

      const directors = (episode.crew || [])
        .filter((person) => person.job === "Director")
        .map((person) => person.name);

      const writers = (episode.crew || [])
        .filter(
          (person) =>
            person.job === "Writer" ||
            person.job === "Screenplay" ||
            person.job === "Story"
        )
        .map((person) => person.name);

      const thumbnail = episode.still_path
        ? `https://image.tmdb.org/t/p/original${episode.still_path}`
        : "";

      episodes.push({
        id: `${series.id}:${season.season_number}:${episode.episode_number}`,
        type: "episode",
        seriesId: series.id,

        season: season.season_number,
        episode: episode.episode_number,

        name:
          episode.name ||
          `Episodio ${episode.episode_number}`,

        title:
          episode.name ||
          `Episodio ${episode.episode_number}`,

        overview,
        description: overview,

        released: episode.air_date
          ? `${episode.air_date}T00:00:00.000Z`
          : null,

        thumbnail,
        background: thumbnail,

        runtime: episode.runtime || null,

        rating: episode.vote_average || null,
        votes: episode.vote_count || 0,
        imdbRating: episode.vote_average || null,

        directors,
        writers,

        actors: cast.map((person) => person.name),
        cast,

        videos: []
      });
    }
  }

  return episodes;
}