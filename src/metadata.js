const TOTAL_EPISODES = 50;

function createEpisode(number) {
  return {
    id: `70787:1:${number}`,

    type: "episode",

    title: `Episodio ${number}`,
    name: `Episodio ${number}`,

    series: "Choushinsei Flashman",
    seriesId: "70787",

    season: 1,
    episode: number,

    overview:
      `Choushinsei Flashman — Episodio ${number}. Los Flashman continúan enfrentando al Imperio Mess y protegiendo la Tierra de sus amenazas.`,

    released:
      `1986-01-${String(Math.min(number, 28)).padStart(2, "0")}`,

    thumbnail:
      "https://images.metahub.space/poster/tt0090407/medium.jpg"
  };
}

function createEpisodes() {
  return Array.from(
    { length: TOTAL_EPISODES },
    (_, index) => createEpisode(index + 1)
  );
}

export async function getMetadata() {

  const videos = createEpisodes();

  return {

    id: "70787",

    type: "series",

    name: "Choushinsei Flashman",

    /*
     * LLAVE IMDb
     */
    imdb_id: "tt0090407",

    /*
     * METADATA GENERAL
     */
    year: 1986,

    releaseInfo: "1986-1987",

    released: "1986-03-01",

    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    /*
     * NETWORK
     *
     * Se mantienen las propiedades que utilizamos
     * durante el experimento de Network.
     */
    network: "TV Asahi",

    originalNetwork: "TV Asahi",

    original_network: "TV Asahi",

    networks: [
      "TV Asahi"
    ],

    originalNetworks: [
      "TV Asahi"
    ],

    original_networks: [
      "TV Asahi"
    ],

    /*
     * PRODUCTION
     */
    productionCompany: "Toei Company",

    production_company: "Toei Company",

    productionCompanies: [
      "Toei Company"
    ],

    production_companies: [
      "Toei Company"
    ],

    production: "Toei Company",

    /*
     * DESCRIPCIÓN
     */
    description:
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987.",

    /*
     * EPISODIOS
     */
    videos

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

    id: video.id,

    type: "episode",

    name: video.title,

    title: video.title,

    series: "Choushinsei Flashman",

    seriesId: "70787",

    imdb_id: "tt0090407",

    season: 1,

    episode,

    overview: video.overview,

    released: video.released,

    thumbnail: video.thumbnail,

    /*
     * También dejamos disponibles
     * Network y Production en el episodio.
     */
    network: "TV Asahi",

    productionCompany: "Toei Company"

  };
}

export async function buildMetadata() {
  return getMetadata();
}
