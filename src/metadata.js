const TOTAL_EPISODES = 50;

function createEpisode(number) {
  return {
    id: `70787:1:${number}`,
    type: "video",
    name: `Episodio ${number}`,
    title: `Episodio ${number}`,
    season: 1,
    episode: number,
    overview:
      `Choushinsei Flashman — Episodio ${number}. Los Flashman continúan enfrentando al Imperio Mess y protegiendo la Tierra.`,
    released: "1986-03-01"
  };
}

export async function getMetadata() {
  /*
   * MUY IMPORTANTE:
   *
   * Aquí NO existe videos[].
   *
   * Esta respuesta debe permanecer limpia para que
   * Nuvio conserve Network y Production navegables.
   */

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

    network: "TV Asahi",

    productionCompany: "Toei Company",

    description:
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987."
  };
}

/*
 * Los episodios existen en una función SEPARADA.
 *
 * No forman parte de getMetadata().
 */

export async function getEpisodes() {
  return Array.from(
    { length: TOTAL_EPISODES },
    (_, index) =>
      createEpisode(index + 1)
  );
}

export async function getEpisode(number) {

  const episode =
    Number(number);

  if (
    !Number.isInteger(episode) ||
    episode < 1 ||
    episode > TOTAL_EPISODES
  ) {
    return null;
  }

  return createEpisode(episode);
}

export async function buildMetadata() {
  return getMetadata();
}
