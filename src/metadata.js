export async function getMetadata() {
  return {
    id: "70787",

    type: "series",

    name: "Choushinsei Flashman",

    imdb_id: "tt0090407",

    year: 1986,

    releaseInfo: "1986-1987",

    released: "1986-03-01",

    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    /*
     * ESTOS SON LOS VALORES DEL ESTADO
     * QUE SÍ HACÍA NAVEGABLES RED Y PRODUCCIÓN.
     */

    network: "TV Asahi",

    productionCompany: "Toei Company",

    description:
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987."
  };
}

export async function buildMetadata() {
  return getMetadata();
}
