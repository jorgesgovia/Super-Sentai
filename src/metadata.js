export async function getMetadata() {
  const videos = [];

  for (let episode = 1; episode <= 50; episode++) {
    videos.push({
      id: `70787:1:${episode}`,
      title: `Episodio ${episode}`,
      name: `Episodio ${episode}`,
      season: 1,
      episode: episode,
      overview: `Choushinsei Flashman - Episodio ${episode}`,
      released: "1986-01-01"
    });
  }

  return {
    id: "70787",
    type: "series",

    imdb_id: "tt0090407",

    name: "Choushinsei Flashman",

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
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987.",

    videos
  };
}

export async function buildMetadata() {
  return getMetadata();
}
