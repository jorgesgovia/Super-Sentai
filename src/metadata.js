import { getTmdbSeries, getTmdbSeason } from "./tmdb.js";
import { getMdbListData } from "./mdblist.js";

const TMDB_ID = "70787";
const IMDB_ID = "tt0090407";
const IMAGE = "https://image.tmdb.org/t/p/original";

export async function getMetadata() {
  const [tmdb, mdblist] = await Promise.all([
    getTmdbSeries(TMDB_ID),
    getMdbListData(IMDB_ID).catch(() => null)
  ]);

  const season = await getTmdbSeason(TMDB_ID, 1);

  const episodes = season.episodes.map((ep) => ({
    id: "super-sentai-flashman:1:" + ep.episode_number,
    title: ep.name || "Episodio " + ep.episode_number,
    season: 1,
    number: ep.episode_number,
    overview: ep.overview || "",
    released: ep.air_date || undefined,
    runtime: ep.runtime || tmdb.episode_run_time?.[0] || 20,
    thumbnail: ep.still_path
      ? IMAGE + ep.still_path
      : undefined,
    rating: ep.vote_average || undefined,
    behaviorHints: {
      defaultVideoId:
        "super-sentai-flashman:1:" + ep.episode_number
    }
  }));

  const cast = (tmdb.credits?.cast || []).slice(0, 10);

  return {
    id: "super-sentai-flashman",
    type: "series",
    name: tmdb.name || "Choushinsei Flashman",

    poster: tmdb.poster_path
      ? IMAGE + tmdb.poster_path
      : undefined,

    background: tmdb.backdrop_path
      ? IMAGE + tmdb.backdrop_path
      : undefined,

    description:
      tmdb.overview ||
      mdblist?.description ||
      "",

    year: Number(tmdb.first_air_date?.slice(0, 4)) || 1986,
    released: tmdb.first_air_date,
    runtime: tmdb.episode_run_time?.[0] || 20,
    status: tmdb.status,

    genres: tmdb.genres?.map((g) => g.name) || [],

    imdbRating:
      mdblist?.ratings?.find((r) => r.source === "imdb")?.value ||
      undefined,

    rating: tmdb.vote_average,
    votes: tmdb.vote_count,

    country: tmdb.origin_country?.[0] || "JP",
    language: tmdb.original_language || "ja",

    cast: cast.map((x) => x.name),
    characters: cast.map((x) => x.character),

    links: [
      {
        name: "IMDb",
        category: "imdb",
        url: "https://www.imdb.com/title/" + IMDB_ID + "/"
      },
      {
        name: "TMDB",
        category: "tmdb",
        url: "https://www.themoviedb.org/tv/" + TMDB_ID
      }
    ],

    videos: episodes,

    behaviorHints: {
      defaultVideoId: "super-sentai-flashman:1:1"
    }
  };
}


export async function buildMetadata() {
  return await getMetadata();
}
