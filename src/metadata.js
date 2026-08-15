/*
 * SUPER SENTAI ADDON
 *
 * TMDB ONLY
 *
 * NO IMDb
 * NO videos[]
 * NO episodios manuales
 * NO metadata personalizada
 * NO network
 * NO productionCompany
 * NO poster
 * NO background
 * NO description
 *
 * ÚNICO IDENTIFICADOR:
 *
 * TMDB TV ID = 70787
 */

export async function getMetadata() {

  return {
    id: "70787",
    type: "series"
  };

}

export async function buildMetadata() {

  return getMetadata();

}
