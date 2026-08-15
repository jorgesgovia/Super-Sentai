const TOTAL_EPISODES = 50;

function episodeId(number) {
  return `70787:1:${number}`;
}

function createEpisode(number) {
  return {
    id: episodeId(number),

    title: `Episodio ${number}`,

    name: `Episodio ${number}`,

    season: 1,

    episode: number,

    overview:
      `Choushinsei Flashman - Episodio ${number}. Los Flashman continúan enfrentando al Imperio Mess y protegiendo la Tierra de sus amenazas.`,

    released: `1986-01-${String(Math.min(number, 28)).padStart(2, "0")}`,

    thumbnail:
      "https://images.metahub.space/poster/tt0090407/medium.jpg"
  };
}

function createVideos() {
  const videos = [];

  for (let i = 1; i <= TOTAL_EPISODES; i++) {
    videos.push(createEpisode(i));
  }

  return videos;
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

    network: "TV Asahi",

    productionCompany: "Toei Company",

    description:
      "Choushinsei Flashman es una serie japonesa de Super Sentai producida por Toei Company y transmitida por TV Asahi entre 1986 y 1987.",

    videos: createVideos()
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

    thumbnail: video.thumbnail
  };
}

export async function buildMetadata() {
  return getMetadata();
}
