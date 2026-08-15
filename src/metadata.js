const TOTAL_EPISODES = 50;

const IMDB_ID = "tt0090407";

function createEpisode(number) {

  return {

    /*
     * IMPORTANTE:
     *
     * Nuvio/Stremio reconoce naturalmente este patrón
     * para episodios de series.
     */

    id:
      `${IMDB_ID}:1:${number}`,

    title:
      `Episodio ${number}`,

    season:
      1,

    episode:
      number,

    overview:
      `Choushinsei Flashman — Episodio ${number}. Los Flashman continúan enfrentando al Imperio Mess y protegiendo la Tierra.`,

    released:
      "1986-03-01"

  };

}

function createEpisodes() {

  return Array.from(
    {
      length: TOTAL_EPISODES
    },
    (_, index) =>
      createEpisode(index + 1)
  );

}

export async function getMetadata() {

  return {

    /*
     * ======================================================
     * SERIE
     * ======================================================
     */

    id:
      "70787",

    type:
      "series",

    name:
      "Choushinsei Flashman",

    /*
     * LLAVE IMDb
     */

    imdb_id:
      IMDB_ID,

    year:
      1986,

    releaseInfo:
      "1986-1987",

    released:
      "1986-03-01",

    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    /*
     * ======================================================
     * NO TOCAR
     * ======================================================
     *
     * Sabemos que así Nuvio los hace navegables.
     */

    network:
      "TV Asahi",

    productionCompany:
      "Toei Company",

    description:
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987.",

    /*
     * ======================================================
     * EPISODIOS
     * ======================================================
     */

    videos:
      createEpisodes()

  };

}

export async function buildMetadata() {

  return getMetadata();

}
