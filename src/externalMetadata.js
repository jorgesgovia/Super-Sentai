/*
 * SUPER SENTAI ADDON
 *
 * METADATA 100% MANUAL
 *
 * Esta capa NO consulta:
 * - IMDb
 * - TMDB
 * - Cinemeta
 *
 * No convierte IDs.
 * No enriquece automáticamente.
 * No reemplaza metadata manual.
 */

export async function mergeExternalMetadata(meta, imdbId) {
  console.log("[externalMetadata] ENRIQUECIMIENTO EXTERNO DESACTIVADO");
  console.log("[externalMetadata] Se conserva exclusivamente metadata manual.");
  return meta;
}
