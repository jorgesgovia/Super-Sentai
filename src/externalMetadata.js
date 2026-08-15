/*
 * SUPER SENTAI ADDON
 * METADATA MANUAL
 *
 * No consulta IMDb.
 * No consulta TMDB.
 * No consulta Cinemeta.
 * No enriquecimiento externo.
 */

export async function mergeExternalMetadata(meta, imdbId) {
  return {
    ...meta,

    id: meta?.id || "super-sentai-flashman",
    type: meta?.type || "series",
    name: meta?.name || "Choushinsei Flashman",

    poster: meta?.poster,
    background: meta?.background,

    description: meta?.description,
    overview: meta?.overview,

    year: meta?.year,
    releaseInfo: meta?.releaseInfo,
    releaseYear: meta?.releaseYear,
    released: meta?.released,

    genres: meta?.genres || [],
    genre: meta?.genre || meta?.genres || [],

    tagline: meta?.tagline,

    runtime: meta?.runtime,
    duration: meta?.duration,

    status: meta?.status,

    rating: meta?.rating,
    imdbRating: meta?.imdbRating,

    ratings: meta?.ratings || [],

    tmdb: meta?.tmdb,
    tmdbRating: meta?.tmdbRating,
    tmdbScore: meta?.tmdbScore,
    tmdb_score: meta?.tmdb_score,

    language: meta?.language,
    originalLanguage: meta?.originalLanguage,

    spokenLanguages: meta?.spokenLanguages || [],
    spokenLanguage: meta?.spokenLanguage,
    languages: meta?.languages || [],

    country: meta?.country,

    trailerYtIds:
      Array.isArray(meta?.trailerYtIds)
        ? meta.trailerYtIds
        : [],

    certificate: meta?.certificate,
    certification: meta?.certification,
    ageRating: meta?.ageRating,

    cast:
      Array.isArray(meta?.cast)
        ? meta.cast
        : [],

    actors:
      Array.isArray(meta?.actors)
        ? meta.actors
        : meta?.cast || [],

    director:
      Array.isArray(meta?.director)
        ? meta.director
        : [],

    directors:
      Array.isArray(meta?.directors)
        ? meta.directors
        : meta?.director || [],

    writer:
      Array.isArray(meta?.writer)
        ? meta.writer
        : [],

    writers:
      Array.isArray(meta?.writers)
        ? meta.writers
        : meta?.writer || [],

    productionCompanies:
      Array.isArray(meta?.productionCompanies)
        ? meta.productionCompanies
        : [],

    production_companies:
      Array.isArray(meta?.production_companies)
        ? meta.production_companies
        : meta?.productionCompanies || [],

    network:
      meta?.network,

    networks:
      Array.isArray(meta?.networks)
        ? meta.networks
        : [],

    links:
      Array.isArray(meta?.links)
        ? meta.links
        : []
  };
}
