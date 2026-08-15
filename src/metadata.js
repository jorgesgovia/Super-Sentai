const TOTAL_EPISODES = 50;

function createEpisode(number) {
  return {
    id: `70787:1:${number}`,

    type: "video",

    title: `Episodio ${number}`,

    season: 1,

    episode: number,

    overview:
      `Choushinsei Flashman — Episodio ${number}. Los Flashman continúan enfrentando al Imperio Mess y protegiendo la Tierra.`,

    released:
      `1986-01-${String(Math.min(number, 28)).padStart(2, "0")}`
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

    /*
     * LLAVE IMDb
     */
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
     * IMPORTANTE:
     * EXACTAMENTE COMO EN LA VERSIÓN
     * QUE HACÍA NAVEGABLE NUVIO.
     */
    network: "TV Asahi",

    productionCompany: "Toei Company",

    description:
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987.",

    /*
     * EPISODIOS
     */
    videos: createEpisodes()
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

    type: "video",

    name:
      `Episodio ${episode}`,

    title:
      `Episodio ${episode}`,

    series:
      "Choushinsei Flashman",

    seriesId:
      "70787",

    imdb_id:
      "tt0090407",

    season: 1,

    episode,

    overview:
      video.overview,

    released:
      video.released
  };
}

export async function buildMetadata() {
  return getMetadata();
}
