const TOTAL_EPISODES = 50;

const NETWORK = {
  id: "tv-asahi",
  name: "TV Asahi",
  type: "network"
};

const PRODUCTION = {
  id: "toei-company",
  name: "Toei Company",
  type: "production"
};

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
    (_, i) => createEpisode(i + 1)
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
     * ENTIDADES NAVEGABLES
     */

    network: NETWORK,

    productionCompany: PRODUCTION,

    /*
     * TAMBIÉN dejamos el nombre plano
     * para compatibilidad.
     */

    networkName: "TV Asahi",

    productionCompanyName: "Toei Company",

    description:
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987.",

    videos: createEpisodes()
  };
}

export async function getEpisodeMetadata(number) {
  const episode = Number(number);

  if (
    !Number.isInteger(episode) ||
    episode < 1 ||
    episode > TOTAL_EPISODES
  ) {
    return null;
  }

  const video = createEpisode(episode);

  return {
    ...video,

    network: NETWORK,
    productionCompany: PRODUCTION
  };
}

export async function buildMetadata() {
  return getMetadata();
}
