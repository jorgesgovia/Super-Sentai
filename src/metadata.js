export async function getMetadata() {
  return {
    id: "70787",
    type: "series",

    name: "Choushinsei Flashman",

    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    /*
     * IDENTIFICADORES REALES
     */

    imdb_id: "tt0090407",
    tmdb_id: "70787",

    /*
     * ========================================================
     * TMDB NETWORK
     * TV Asahi = TMDB 103
     * ========================================================
     */

    networks: [
      {
        id: 103,
        name: "TV Asahi"
      }
    ],

    /*
     * ========================================================
     * TMDB PRODUCTION COMPANY
     * Toei Company = TMDB 5822
     * ========================================================
     */

    productionCompanies: [
      {
        id: 5822,
        name: "Toei Company"
      }
    ]
  };
}

export async function buildMetadata() {
  return getMetadata();
}
