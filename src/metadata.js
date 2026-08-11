import { getTmdbSeries } from "./tmdb.js";
import { getMdbListData } from "./mdblist.js";

function imageUrl(path) {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/original${path}`;
}

function formatReleaseInfo(tmdb) {
  if (!tmdb.first_air_date) return "";

  const year = tmdb.first_air_date.slice(0, 4);

  if (!tmdb.last_air_date) {
    return year;
  }

  const lastYear = tmdb.last_air_date.slice(0, 4);

  return year === lastYear ? year : `${year}-${lastYear}`;
}

export async function buildMetadata(series) {
  const tmdb = await getTmdbSeries(series.tmdbId);

  const imdbId = tmdb.external_ids?.imdb_id || null;
  const tvdbId = tmdb.external_ids?.tvdb_id || null;

  let mdblist = null;

  if (imdbId) {
    try {
      mdblist = await getMdbListData(imdbId);
    } catch (error) {
      console.warn("MDBList no disponible:", error.message);
    }
  }

  const ratingSources = [];

  if (mdblist?.ratings) {
    for (const rating of mdblist.ratings) {
      if (rating?.source && rating?.score != null) {
        ratingSources.push({
          source: rating.source,
          score: rating.score,
          votes: rating.votes ?? null
        });
      }
    }
  }

  const genres = Array.isArray(tmdb.genres)
    ? tmdb.genres.map((genre) => genre.name)
    : [];

  const cast = Array.isArray(tmdb.credits?.cast)
    ? tmdb.credits.cast
        .slice(0, 20)
        .map((person) => person.name)
    : [];

  return {
    id: series.id,
    type: "series",
    name: series.name || tmdb.name,
    originalName: tmdb.original_name || "",
    poster: imageUrl(tmdb.poster_path),
    background: imageUrl(tmdb.backdrop_path),
    description: tmdb.overview || mdblist?.description || "",
    year: tmdb.first_air_date
      ? Number(tmdb.first_air_date.slice(0, 4))
      : null,
    releaseInfo: formatReleaseInfo(tmdb),
    released: tmdb.first_air_date
      ? `${tmdb.first_air_date}T00:00:00.000Z`
      : null,
    status: tmdb.status || "",
    runtime: tmdb.episode_run_time?.[0] || null,
    country: tmdb.origin_country || [],
    language: tmdb.original_language || "",
    genres,
    cast,
    director: [],
    writer: [],
    imdb_id: imdbId,
    tvdb_id: tvdbId,
    moviedb_id: tmdb.id,

    imdbRating:
      mdblist?.ratings?.find((r) => r.source === "imdb")?.score ?? null,

    traktRating:
      mdblist?.ratings?.find((r) => r.source === "trakt")?.score ?? null,

    tmdbRating:
      mdblist?.ratings?.find((r) => r.source === "tmdb")?.score ??
      tmdb.vote_average ??
      null,

    popularities: {
      mdblistScore: mdblist?.score ?? null,
      mdblistAverage: mdblist?.score_average ?? null
    },

    ratingSources,

    links: [
      ...(imdbId
        ? [
            {
              name: "IMDb",
              category: "imdb",
              url: `https://www.imdb.com/title/${imdbId}/`
            }
          ]
        : []),

      {
        name: "TMDB",
        category: "tmdb",
        url: `https://www.themoviedb.org/tv/${tmdb.id}`
      }
    ],

    _tmdb: tmdb,
    _mdblist: mdblist
  };
}