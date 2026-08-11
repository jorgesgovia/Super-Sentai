export async function getCinemetaMetadata(imdbId) {
  if (!imdbId) return null;

  try {
    const url = `https://v3-cinemeta.strem.io/meta/tv/${imdbId}.json`;

    const response = await fetch(url);

    if (!response.ok) return null;

    const data = await response.json();

    return data?.meta || null;
  } catch {
    return null;
  }
}

export async function getImdbMetadata(imdbId) {
  if (!imdbId) return null;

  try {
    const url =
      `https://api.graphql.imdb.com/` +
      `?query=query%20%7Btitle(id%3A%22${imdbId}%22)%7B` +
      `id%20titleText%7Btext%7D` +
      `ratingsSummary%7BaggregateRating%20voteCount%7D` +
      `credits(first%3A50)%7Bedges%7Bnode%7Bname%7Bid%20nameText%7Btext%7D%7D%20...%20on%20NameCredit%7Bcategory%7Bid%7D%20characters%7Bname%7D%7D%7D%7D%7D%7D` +
      `%7D%7D`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) return null;

    const data = await response.json();

    return data?.data?.title || null;
  } catch {
    return null;
  }
}

export async function mergeExternalMetadata(meta, imdbId) {
  const [cinemeta, imdb] = await Promise.all([
    getCinemetaMetadata(imdbId),
    getImdbMetadata(imdbId)
  ]);

  if (!cinemeta && !imdb) {
    return meta;
  }

  const cinemetaCast = Array.isArray(cinemeta?.cast)
    ? cinemeta.cast
    : [];

  const cinemetaGenres = Array.isArray(cinemeta?.genres)
    ? cinemeta.genres
    : [];

  const cinemetaDirectors = Array.isArray(cinemeta?.director)
    ? cinemeta.director
    : Array.isArray(cinemeta?.directors)
      ? cinemeta.directors
      : [];

  const cinemetaWriters = Array.isArray(cinemeta?.writer)
    ? cinemeta.writer
    : Array.isArray(cinemeta?.writers)
      ? cinemeta.writers
      : [];

  const imdbRating =
    imdb?.ratingsSummary?.aggregateRating ??
    cinemeta?.imdbRating ??
    cinemeta?.rating ??
    meta.imdbRating ??
    meta.rating;

  const imdbVotes =
    imdb?.ratingsSummary?.voteCount ??
    cinemeta?.imdbVotes ??
    cinemeta?.votes ??
    meta.votes;

  const mergedCast = [
    ...(Array.isArray(meta.cast) ? meta.cast : []),
    ...cinemetaCast
  ];

  const uniqueCast = mergedCast.filter(
    (person, index, array) => {
      const name =
        typeof person === "string"
          ? person
          : person?.name;

      return (
        name &&
        index ===
          array.findIndex((p) => {
            const other =
              typeof p === "string"
                ? p
                : p?.name;

            return other === name;
          })
      );
    }
  );

  return {
    ...meta,

    name:
      meta.name ||
      cinemeta?.name,

    originalName:
      meta.originalName ||
      cinemeta?.originalName,

    originalTitle:
      meta.originalTitle ||
      cinemeta?.originalName,

    description:
      meta.description ||
      cinemeta?.description ||
      cinemeta?.overview,

    overview:
      meta.overview ||
      cinemeta?.overview ||
      cinemeta?.description,

    tagline:
      meta.tagline ||
      cinemeta?.tagline,

    poster:
      meta.poster ||
      cinemeta?.poster,

    background:
      meta.background ||
      cinemeta?.background,

    logo:
      meta.logo ||
      cinemeta?.logo,

    genres: [
      ...new Set([
        ...(Array.isArray(meta.genres) ? meta.genres : []),
        ...cinemetaGenres
      ])
    ],

    cast: uniqueCast,

    actors: uniqueCast,

    directors: [
      ...new Set([
        ...(Array.isArray(meta.directors) ? meta.directors : []),
        ...cinemetaDirectors
      ])
    ],

    director: [
      ...new Set([
        ...(Array.isArray(meta.directors) ? meta.directors : []),
        ...cinemetaDirectors
      ])
    ],

    writers: [
      ...new Set([
        ...(Array.isArray(meta.writers) ? meta.writers : []),
        ...cinemetaWriters
      ])
    ],

    writer: [
      ...new Set([
        ...(Array.isArray(meta.writers) ? meta.writers : []),
        ...cinemetaWriters
      ])
    ],

    productionCompanies:
      meta.productionCompanies?.length
        ? meta.productionCompanies
        : cinemeta?.productionCompanies || [],

    production_companies:
      meta.production_companies?.length
        ? meta.production_companies
        : cinemeta?.productionCompanies || [],

    network:
      meta.network ||
      cinemeta?.network,

    imdbRating,

    rating:
      meta.rating ||
      imdbRating,

    votes:
      imdbVotes ||
      meta.votes,

    imdb_id:
      meta.imdb_id ||
      imdbId,

    imdbId:
      meta.imdbId ||
      imdbId,

    ids: {
      ...(meta.ids || {}),
      imdb: imdbId
    },

    links: [
      ...(Array.isArray(meta.links) ? meta.links : []),

      {
        name: "IMDb",
        category: "imdb",
        url: `https://www.imdb.com/title/${imdbId}/`
      },

      {
        name: "Cinemeta",
        category: "cinemeta",
        url: `https://v3-cinemeta.strem.io/meta/tv/${imdbId}.json`
      }
    ]
  };
}
