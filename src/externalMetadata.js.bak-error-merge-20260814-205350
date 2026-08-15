/*
 * EXPERIMENTO DE METADATA MÍNIMA PARA NUVIO
 *
 * La metadata externa queda deliberadamente mínima.
 * No queremos que otra fuente agregue, fusione o sobrescriba
 * Red / Producción durante esta prueba.
 */

export async function getExternalMetadata() {
  return {
    id: "tt0090407",
    type: "series",

    name: "Choushinsei Flashman",
    originalName: "超新星フラッシュマン",

    imdb_id: "tt0090407",
    tmdb_id: "70787",

    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    network: "tv asahi",

    networks: [
      {
        name: "tv asahi",
        tmdbId: 103,
        logo:
          "https://image.tmdb.org/t/p/w185/j3xAzk1SYQQwrQOD7acdSz675Wa.png"
      }
    ],

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

export async function buildExternalMetadata() {
  return getExternalMetadata();
}
