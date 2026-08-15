/*
 * SUPER SENTAI ADDON
 *
 * STREAM ONLY
 *
 * NO metadata personalizada.
 * NO videos[].
 * NO episodios.
 * NO posters.
 * NO backgrounds.
 * NO sinopsis.
 * NO network.
 * NO productionCompany.
 *
 * El identificador IMDb es la única referencia de contenido.
 */

export async function getMetadata() {

  return {
    id: "tt0090407",
    type: "series"
  };

}

export async function buildMetadata() {

  return getMetadata();

}
