/*
============================================================
SUPER SENTAI ADDON
EXPERIMENTO 17

IDENTIFICADOR:
TMDB TV ID 70787

METADATA EXTERNA:
ACTIVA

METADATA PERSONALIZADA:
- IMDb rating
- Background
- Poster
- Logo
- Trailer

EPISODIOS:
SEPARADOS EN episodes.js

IMPORTANTE:
NO videos[] EN ESTA RESPUESTA.
============================================================
*/

export async function getMetadata() {

  return {

    /*
     * TMDB
     */
    id:
      "70787",

    type:
      "series",

    name:
      "Choushinsei Flashman",

    /*
     * IMDb rating
     */
    imdbRating:
      8.2,

    /*
     * Background
     */
    background:
      "https://imgbs.com/uploads/flashman-a8f83054.jpg",

    /*
     * Poster
     */
    poster:
      "https://image.tmdb.org/t/p/original/wyGFaD0V2bU2Q5uEtJDStZSRoG2.jpg",

    /*
     * Logo
     */
    logo:
      "https://image.tmdb.org/t/p/original/7jASxo9DcEkuhCQhuJpgkmjoTgt.png",

    /*
     * Trailer
     *
     * Código de YouTube
     */
    trailer:
      "Q_oVf3qpwIk"

  };

}


export async function buildMetadata() {

  return getMetadata();

}
