const TOTAL_EPISODES = 50;

/*
============================================================
ENTIDADES REALES DE TMDB
============================================================

TV Asahi
TMDB Network ID: 103

Toei Company
TMDB Company ID: 5822
============================================================
*/

const TV_ASAHI = {
  id: 103,
  name: "TV Asahi",
  logoPath: null,
  originCountry: "JP"
};

const TOEI_COMPANY = {
  id: 5822,
  name: "Toei Company",
  logoPath: null,
  originCountry: "JP"
};

function createEpisode(number) {

  return {

    id:
      `70787:1:${number}`,

    type:
      "video",

    title:
      `Episodio ${number}`,

    name:
      `Episodio ${number}`,

    season:
      1,

    episode:
      number,

    overview:
      `Choushinsei Flashman — Episodio ${number}. Los Flashman continúan enfrentando al Imperio Mess y protegiendo la Tierra.`,

    released:
      `1986-01-${String(
        Math.min(number, 28)
      ).padStart(2, "0")}`

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
    ========================================================
    IDENTIDAD
    ========================================================
    */

    id:
      "70787",

    type:
      "series",

    name:
      "Choushinsei Flashman",

    /*
    LLAVE IMDb
    */

    imdb_id:
      "tt0090407",

    /*
    ========================================================
    DATOS GENERALES
    ========================================================
    */

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

    description:
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987.",

    /*
    ========================================================
    🔥 NUVIO — NETWORK
    ========================================================

    NO es un string.

    Es la estructura Network que utiliza Nuvio.
    */

    networks: [
      TV_ASAHI
    ],

    /*
    ========================================================
    🔥 NUVIO — PRODUCTION COMPANY
    ========================================================

    NO es un string.

    Es la estructura ProductionCompany que utiliza Nuvio.
    */

    productionCompanies: [
      TOEI_COMPANY
    ],

    /*
    ========================================================
    COMPATIBILIDAD
    ========================================================

    Conservamos también los nombres simples por si otra
    capa del addon los utiliza.
    */

    network:
      "TV Asahi",

    productionCompany:
      "Toei Company",

    /*
    ========================================================
    EPISODIOS
    ========================================================
    */

    videos:
      createEpisodes()

  };

}

export async function getEpisodeMetadata(number) {

  const episode =
    Number(number);

  if (
    !Number.isInteger(episode) ||
    episode < 1 ||
    episode > TOTAL_EPISODES
  ) {

    return null;

  }

  const video =
    createEpisode(episode);

  return {

    id:
      video.id,

    type:
      "video",

    name:
      video.name,

    title:
      video.title,

    series:
      "Choushinsei Flashman",

    seriesId:
      "70787",

    imdb_id:
      "tt0090407",

    season:
      1,

    episode:
      episode,

    overview:
      video.overview,

    released:
      video.released,

    /*
     * Dejamos disponibles las entidades también
     * en el episodio.
     */

    networks: [
      TV_ASAHI
    ],

    productionCompanies: [
      TOEI_COMPANY
    ]

  };

}

export async function buildMetadata() {

  return getMetadata();

}
