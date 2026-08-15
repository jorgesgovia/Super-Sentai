/*
 * ============================================================
 * SUPER SENTAI ADDON
 *
 * METADATA 100% MANUAL
 *
 * Este archivo NO consulta:
 * - TMDB
 * - IMDb
 * - Cinemeta
 * - APIs externas
 *
 * Su única función es devolver intacta la metadata
 * creada por nuestro addon.
 *
 * Esto evita cualquier enriquecimiento automático.
 * ============================================================
 */

export async function mergeExternalMetadata(meta) {
  if (!meta || typeof meta !== "object") {
    return meta;
  }

  /*
   * No reemplazar:
   * - id
   * - videos
   * - episodios
   * - streams
   * - background
   * - poster
   * - synopsis
   *
   * No consultar ninguna fuente externa.
   */

  const merged = {
    ...meta,

    /*
     * Identidad
     */
    id: meta.id,

    type: meta.type || "series",

    name: meta.name,

    /*
     * Artwork manual
     */
    poster: meta.poster,
    background: meta.background,
    logo: meta.logo,

    /*
     * Descripción manual
     */
    description: meta.description,
    overview: meta.overview,
    tagline: meta.tagline,

    /*
     * Información manual
     */
    year: meta.year,
    releaseInfo: meta.releaseInfo,
    releaseYear: meta.releaseYear,
    released: meta.released,

    status: meta.status,

    runtime: meta.runtime,
    duration: meta.duration,

    /*
     * Géneros
     */
    genres: meta.genres,
    genre: meta.genre,

    /*
     * Ratings manuales
     */
    rating: meta.rating,
    imdbRating: meta.imdbRating,
    tmdbRating: meta.tmdbRating,
    tmdbScore: meta.tmdbScore,
    ratings: meta.ratings,

    /*
     * Clasificación
     */
    certificate: meta.certificate,
    certification: meta.certification,
    ageRating: meta.ageRating,

    /*
     * Idioma
     */
    language: meta.language,
    originalLanguage: meta.originalLanguage,
    spokenLanguage: meta.spokenLanguage,
    spokenLanguages: meta.spokenLanguages,
    languages: meta.languages,

    country: meta.country,

    /*
     * Network manual
     */
    network: meta.network,
    networks: meta.networks,

    /*
     * Producción manual
     */
    productionCompanies: meta.productionCompanies,
    production_companies: meta.production_companies,

    /*
     * Dirección / creación manual
     */
    director: meta.director,
    directors: meta.directors,
    creator: meta.creator,
    creators: meta.creators,

    /*
     * Escritores
     */
    writer: meta.writer,
    writers: meta.writers,

    /*
     * Reparto
     */
    cast: meta.cast,
    actors: meta.actors,

    /*
     * Trailer
     */
    trailerYtIds: meta.trailerYtIds,

    /*
     * Enlaces
     */
    links: meta.links,

    /*
     * MUY IMPORTANTE:
     *
     * Los videos que ya vienen de metadata/server
     * se conservan exactamente como llegaron.
     */
    videos: meta.videos
  };

  console.log(
    "[externalMetadata] MODO MANUAL — sin TMDB/Cinemeta"
  );

  console.log(
    "[externalMetadata] Network:",
    merged.network || "N/D"
  );

  console.log(
    "[externalMetadata] Productoras:",
    Array.isArray(merged.productionCompanies)
      ? merged.productionCompanies.length
      : 0
  );

  console.log(
    "[externalMetadata] Director:",
    Array.isArray(merged.director)
      ? merged.director.length
      : 0
  );

  console.log(
    "[externalMetadata] Reparto:",
    Array.isArray(merged.cast)
      ? merged.cast.length
      : 0
  );

  console.log(
    "[externalMetadata] Videos:",
    Array.isArray(merged.videos)
      ? merged.videos.length
      : 0
  );

  return merged;
}
