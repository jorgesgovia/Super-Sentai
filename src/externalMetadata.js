import "dotenv/config";

const TMDB_API_KEY =
  process.env.TMDB_API_KEY ||
  process.env.TMDB_ACCESS_TOKEN ||
  "";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE = "https://image.tmdb.org/t/p/original";

const FLASHMAN_TMDB_ID = 70787;
const FLASHMAN_IMDB_ID = "tt0090407";

const CACHE = new Map();
const CACHE_TTL = 1000 * 60 * 60 * 6;

function cacheGet(key) {
  const item = CACHE.get(key);

  if (!item) return null;

  if (Date.now() - item.time > CACHE_TTL) {
    CACHE.delete(key);
    return null;
  }

  return item.value;
}

function cacheSet(key, value) {
  CACHE.set(key, {
    time: Date.now(),
    value
  });

  return value;
}

async function tmdb(path, params = {}) {
  if (!TMDB_API_KEY) {
    throw new Error(
      "TMDB_API_KEY no está configurada en .env"
    );
  }

  const url = new URL(TMDB_BASE + path);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(
      `TMDB ${response.status}: ${await response.text()}`
    );
  }

  return response.json();
}

async function cachedTMDB(path, params = {}) {
  const key =
    path +
    "?" +
    new URLSearchParams(params).toString();

  const cached = cacheGet(key);

  if (cached) {
    return cached;
  }

  const data = await tmdb(path, params);

  return cacheSet(key, data);
}

function image(path) {
  if (!path) return undefined;

  if (path.startsWith("http")) {
    return path;
  }

  return TMDB_IMAGE + path;
}

function firstText(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

function cleanArray(value) {
  return Array.isArray(value)
    ? value.filter(Boolean)
    : [];
}

async function getEpisode(
  seasonNumber,
  episodeNumber
) {
  const base = await cachedTMDB(
    `/tv/${FLASHMAN_TMDB_ID}/season/${seasonNumber}/episode/${episodeNumber}`,
    {
      language: "es-MX",
      append_to_response:
        "credits,images,videos,external_ids"
    }
  );

  let spanish = base;

  if (!base.overview || !base.name) {
    try {
      spanish = await cachedTMDB(
        `/tv/${FLASHMAN_TMDB_ID}/season/${seasonNumber}/episode/${episodeNumber}`,
        {
          language: "es-ES",
          append_to_response:
            "credits,images,videos,external_ids"
        }
      );
    } catch {}
  }

  let english = base;

  if (!spanish.overview || !spanish.name) {
    try {
      english = await cachedTMDB(
        `/tv/${FLASHMAN_TMDB_ID}/season/${seasonNumber}/episode/${episodeNumber}`,
        {
          language: "en-US",
          append_to_response:
            "credits,videos,external_ids"
        }
      );
    } catch {}
  }

  const data = {
    ...english,
    ...base,
    name: firstText(
      spanish.name,
      base.name,
      english.name
    ),
    overview: firstText(
      spanish.overview,
      base.overview,
      english.overview
    )
  };

  return data;
}

async function getSeries() {
  return cachedTMDB(
    `/tv/${FLASHMAN_TMDB_ID}`,
    {
      language: "es-MX",
      append_to_response:
        "credits,aggregate_credits,external_ids,images,videos,content_ratings,translations"
    }
  );
}

function buildCast(series) {
  const cast =
    series?.aggregate_credits?.cast ||
    series?.credits?.cast ||
    [];

  return cast
    .slice(0, 40)
    .map(person => ({
      name: person.name,
      character:
        person.roles?.[0]?.character ||
        person.character ||
        "",
      photo: image(person.profile_path),
      imdb_id:
        person.external_ids?.imdb_id
    }));
}

function buildCrew(series) {
  const crew =
    series?.aggregate_credits?.crew ||
    series?.credits?.crew ||
    [];

  return crew
    .slice(0, 60)
    .map(person => ({
      name: person.name,
      job:
        person.jobs?.[0]?.job ||
        person.job ||
        "",
      department: person.department,
      photo: image(person.profile_path)
    }));
}

function buildVideos(series) {
  const videos =
    series?.videos?.results ||
    [];

  return videos
    .filter(video =>
      video.site === "YouTube"
    )
    .slice(0, 20)
    .map(video => ({
      id: video.key,
      title: video.name,
      name: video.name,
      site: video.site,
      type: video.type,
      official: video.official,
      url:
        `https://www.youtube.com/watch?v=${video.key}`
    }));
}

function buildGenres(series) {
  return cleanArray(
    series?.genres
  ).map(g => g.name);
}

function buildNetworks(series) {
  return cleanArray(
    series?.networks
  ).map(n => ({
    id: n.id,
    name: n.name,
    logo: image(n.logo_path),
    origin_country: n.origin_country
  }));
}

function buildCompanies(series) {
  return cleanArray(
    series?.production_companies
  ).map(c => ({
    id: c.id,
    name: c.name,
    logo: image(c.logo_path),
    origin_country: c.origin_country
  }));
}

function buildCountries(series) {
  return cleanArray(
    series?.origin_country
  );
}

function buildLanguages(series) {
  return cleanArray(
    series?.languages
  );
}

function buildSeriesMeta(series) {
  const external =
    series?.external_ids || {};

  return {
    id: FLASHMAN_IMDB_ID,

    type: "series",

    name:
      series.name ||
      "Choushinsei Flashman",

    originalName:
      series.original_name ||
      "超新星フラッシュマン",

    poster:
      image(series.poster_path),

    background:
      image(series.backdrop_path),

    logo:
      undefined,

    description:
      firstText(
        series.overview
      ),

    overview:
      firstText(
        series.overview
      ),

    year:
      series.first_air_date
        ? Number(
            series.first_air_date.slice(0, 4)
          )
        : 1986,

    releaseInfo:
      [
        series.first_air_date,
        series.last_air_date
      ]
        .filter(Boolean)
        .join(" - "),

    released:
      series.first_air_date,

    endDate:
      series.last_air_date,

    status:
      series.status,

    runtime:
      series.episode_run_time?.[0],

    genres:
      buildGenres(series),

    country:
      buildCountries(series),

    languages:
      buildLanguages(series),

    networks:
      buildNetworks(series),

    productionCompanies:
      buildCompanies(series),

    seasonCount:
      series.number_of_seasons,

    episodeCount:
      series.number_of_episodes,

    imdbRating:
      undefined,

    tmdbRating:
      series.vote_average,

    tmdbVotes:
      series.vote_count,

    rating:
      series.vote_average,

    votes:
      series.vote_count,

    imdb_id:
      external.imdb_id ||
      FLASHMAN_IMDB_ID,

    tmdb_id:
      String(FLASHMAN_TMDB_ID),

    tvdb_id:
      external.tvdb_id,

    wikidata_id:
      "Q1328971",

    cast:
      buildCast(series),

    crew:
      buildCrew(series),

    videos:
      buildVideos(series),

    trailer:
      series?.videos?.results
        ?.find(
          video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        )?.key,

    links: [
      {
        name: "IMDb",
        url:
          `https://www.imdb.com/title/${FLASHMAN_IMDB_ID}/`
      },
      {
        name: "TMDB",
        url:
          `https://www.themoviedb.org/tv/${FLASHMAN_TMDB_ID}`
      },
      {
        name: "Wikidata",
        url:
          "https://www.wikidata.org/wiki/Q1328971"
      }
    ]
  };
}

export async function getExternalMetadata(
  type,
  id
) {
  const isEpisode =
    type === "series" &&
    /^tt\d+:\d+:\d+$/.test(id);

  if (isEpisode) {
    const [
      ,
      ,
      season,
      episode
    ] =
      id.match(
        /^(tt\d+):(\d+):(\d+)$/
      ) || [];

    if (!season || !episode) {
      return null;
    }

    const episodeData =
      await getEpisode(
        Number(season),
        Number(episode)
      );

    const series =
      await getSeries();

    return {
      id,
      type: "series",

      name:
        episodeData.name ||
        `Episodio ${episode}`,

      title:
        episodeData.name ||
        `Episodio ${episode}`,

      episodeNumber:
        episodeData.episode_number,

      seasonNumber:
        episodeData.season_number,

      season:
        episodeData.season_number,

      number:
        episodeData.episode_number,

      overview:
        episodeData.overview || "",

      description:
        episodeData.overview || "",

      released:
        episodeData.air_date,

      releaseInfo:
        episodeData.air_date,

      year:
        episodeData.air_date
          ? Number(
              episodeData.air_date.slice(0, 4)
            )
          : undefined,

      runtime:
        episodeData.runtime,

      poster:
        image(
          episodeData.still_path
        ) ||
        image(series.poster_path),

      background:
        image(
          episodeData.still_path
        ) ||
        image(series.backdrop_path),

      still:
        image(
          episodeData.still_path
        ),

      rating:
        episodeData.vote_average,

      tmdbRating:
        episodeData.vote_average,

      tmdbVotes:
        episodeData.vote_count,

      votes:
        episodeData.vote_count,

      imdb_id:
        FLASHMAN_IMDB_ID,

      tmdb_id:
        String(FLASHMAN_TMDB_ID),

      seriesId:
        FLASHMAN_IMDB_ID,

      seriesName:
        series.name,

      genres:
        buildGenres(series),

      cast:
        cleanArray(
          episodeData.credits?.cast
        ).slice(0, 30).map(person => ({
          name: person.name,
          character: person.character,
          photo: image(person.profile_path)
        })),

      crew:
        cleanArray(
          episodeData.credits?.crew
        ).slice(0, 40).map(person => ({
          name: person.name,
          job: person.job,
          department: person.department,
          photo: image(person.profile_path)
        })),

      videos:
        cleanArray(
          episodeData.videos?.results
        ).filter(
          video =>
            video.site === "YouTube"
        ).map(video => ({
          id: video.key,
          name: video.name,
          type: video.type,
          site: video.site,
          url:
            `https://www.youtube.com/watch?v=${video.key}`
        })),

      links: [
        {
          name: "IMDb",
          url:
            `https://www.imdb.com/title/${FLASHMAN_IMDB_ID}/`
        },
        {
          name: "TMDB",
          url:
            `https://www.themoviedb.org/tv/${FLASHMAN_TMDB_ID}/season/${season}/episode/${episode}`
        }
      ]
    };
  }

  if (
    type === "series" &&
    (
      id === FLASHMAN_IMDB_ID ||
      id === String(FLASHMAN_TMDB_ID) ||
      id === "70787"
    )
  ) {
    const series =
      await getSeries();

    return buildSeriesMeta(
      series
    );
  }

  return null;
}

export {
  FLASHMAN_TMDB_ID,
  FLASHMAN_IMDB_ID
};
