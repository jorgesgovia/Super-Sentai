const TOTAL_EPISODES = 50;

function createEpisode(number) {
  return {
    id: `70787:1:${number}`,

    title: `Episodio ${number}`,

    season: 1,

    episode: number,

    overview:
      `Choushinsei Flashman — Episodio ${number}. Los Flashman continúan enfrentando al Imperio Mess y protegiendo la Tierra.`,

    released: "1986-03-01"
  };
}

function createEpisodes() {
  return Array.from(
    { length: TOTAL_EPISODES },
    (_, index) => createEpisode(index + 1)
  );
}

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
     * NO TOCAR.
     *
     * Esta estructura ya comprobamos que hace que
     * Nuvio permita seleccionar Red y Producción.
     */

    network: "TV Asahi",

    productionCompany: "Toei Company",

    description:
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987.",

    /*
     * ======================================================
     * EPISODIOS
     * ======================================================
     *
     * IMPORTANTE:
     *
     * Esta vez son objetos Video estándar.
     *
     * NO:
     * type
     * seriesId
     * networks
     * productionCompanies
     *
     */

    videos: createEpisodes()
  };
}

export async function buildMetadata() {
  return getMetadata();
}
