/*
============================================================
SUPER SENTAI ADDON
EXPERIMENTO 14

IMPORTANTE:

NO generamos videos[].
NO generamos episodios.
NO fabricamos títulos de episodios.

La idea es que Nuvio/Cinemeta/IMDb/TMDB haga
el enriquecimiento de la serie utilizando:

    tt0090407

Nuestro addon solamente conserva la metadata mínima
necesaria para identificar la serie y las propiedades
que ya comprobamos que Nuvio puede navegar.
============================================================
*/

export async function getMetadata() {

  return {

    /*
     * ======================================================
     * LLAVE IMDb
     * ======================================================
     *
     * Esta es la prueba importante.
     *
     * Anteriormente comprobamos que utilizar el IMDb ID
     * hacía que Nuvio reconociera/enriqueciera la serie.
     */

    id:
      "tt0090407",

    type:
      "series",

    name:
      "Choushinsei Flashman",

    imdb_id:
      "tt0090407",

    /*
     * ======================================================
     * METADATA QUE YA SABEMOS QUE NUVIO PUEDE NAVEGAR
     * ======================================================
     */

    network:
      "TV Asahi",

    productionCompany:
      "Toei Company"

  };

}

export async function buildMetadata() {

  return getMetadata();

}
