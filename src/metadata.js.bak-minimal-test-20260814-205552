export async function getMetadata() {
  return {
    /*
     * IDENTIDAD
     *
     * Usamos IMDb como ID principal porque Nuvio
     * ya demostró reconocer Flashman con este ID.
     */
    id: "tt0090407",
    type: "series",

    /*
     * TÍTULO
     */
    name: "Choushinsei Flashman",
    originalName: "超新星フラッシュマン",

    /*
     * REFERENCIAS
     */
    imdb_id: "tt0090407",
    tmdb_id: "70787",

    /*
     * GÉNERO
     */
    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    /*
     * RED / NETWORK
     *
     * Probamos simultáneamente la forma simple
     * y la forma estructurada.
     */
    network: "tv asahi",

    networks: [
      {
        name: "tv asahi",
        tmdbId: 103,
        logo:
          "https://image.tmdb.org/t/p/w185/j3xAzk1SYQQwrQOD7acdSz675Wa.png"
      }
    ],

    /*
     * PRODUCCIÓN
     *
     * Estructura utilizada para probar si Nuvio
     * convierte la compañía en una sección navegable.
     */
    productionCompanies: [
      {
        name: "Toei Company",
        tmdbId: 5822,
        logo:
          "https://image.tmdb.org/t/p/w185/qyTbRgCyU9NLKvKaiQVbadtr7RY.png"
      }
    ]
  };
}

export async function buildMetadata() {
  return getMetadata();
}
