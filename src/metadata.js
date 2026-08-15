/*
============================================================
SUPER SENTAI ADDON
EXPERIMENTO 15

OBJETIVO:

Dejar que Nuvio utilice su proveedor externo de metadata.

Nuestro addon solamente identifica la serie mediante
su TMDB TV ID real.

TMDB:
70787

NO:
- IMDb
- videos[]
- episodios
- sinopsis
- posters
- backgrounds
- temporadas manuales
- títulos de episodios
- network manual
- productionCompany manual

============================================================
*/

export async function getMetadata() {

  return {

    /*
     * Identificador TMDB REAL
     */

    id:
      "70787",

    type:
      "series",

    /*
     * Nombre mínimo para que el addon pueda ser
     * descubierto.
     */

    name:
      "Choushinsei Flashman"

  };

}


export async function buildMetadata() {

  return getMetadata();

}
