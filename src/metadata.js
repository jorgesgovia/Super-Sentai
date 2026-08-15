/*
============================================================
SUPER SENTAI ADDON
EXPERIMENTO 16

TMDB ID:
70787

METADATA EXTERNA:
ACTIVA

PRUEBA:
- IMDb rating manual
- Background manual

NO:
- videos[]
- episodios manuales
- network manual
- productionCompany manual
- poster manual
- description manual
============================================================
*/

export async function getMetadata() {

  return {

    /*
     * Identificador TMDB real
     */
    id: "70787",

    type: "series",

    name: "Choushinsei Flashman",

    /*
     * PRUEBA 1
     * IMDb rating manual
     */
    imdbRating: 8.2,

    /*
     * PRUEBA 2
     * Background manual
     */
    background:
      "https://imgbs.com/uploads/flashman-a8f83054.jpg"

  };

}


export async function buildMetadata() {

  return getMetadata();

}
