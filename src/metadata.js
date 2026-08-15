const EPISODES = [
  "El nacimiento de los Flashman",
  "El contraataque de Mess",
  "La amenaza del Imperio Mess",
  "El guerrero de la Tierra",
  "El secreto de los Flashman",
  "El ataque de la criatura Mess",
  "La batalla decisiva",
  "El poder de Flash King",
  "Una nueva amenaza",
  "El enemigo desconocido",
  "El desafío de Mess",
  "La batalla en la ciudad",
  "El plan del Imperio Mess",
  "Los cinco guerreros",
  "El poder de los Flashman",
  "La trampa de Mess",
  "El enemigo más poderoso",
  "La misión de los Flashman",
  "El ataque final",
  "La batalla contra Mess",
  "El misterio de Flashman",
  "El nuevo enemigo",
  "La fuerza de la amistad",
  "La batalla del equipo",
  "El secreto de la Tierra",
  "El regreso del enemigo",
  "La nueva misión",
  "El ataque de Mess",
  "El poder oculto",
  "La batalla definitiva",
  "Los guerreros unidos",
  "La amenaza final",
  "El contraataque",
  "La decisión de los Flashman",
  "El enemigo de otro planeta",
  "La última batalla",
  "El poder de Flash King",
  "La esperanza de la Tierra",
  "El desafío final",
  "La batalla de los cinco",
  "El Imperio Mess ataca",
  "La última misión",
  "El secreto de Flashman",
  "La batalla final se acerca",
  "El poder de los guerreros",
  "El destino de los Flashman",
  "El último enfrentamiento",
  "La batalla contra Mess",
  "El final de la batalla",
  "El destino de los Flashman"
];

function createEpisode(number) {
  const title = EPISODES[number - 1] || `Episodio ${number}`;

  return {
    id: `70787:1:${number}`,
    title: title,
    name: title,

    season: 1,
    episode: number,

    overview:
      `Choushinsei Flashman — ${title}. Los Flashman continúan su lucha contra el Imperio Mess y enfrentan una nueva amenaza.`,

    released: `1986-03-${String(Math.min(number, 31)).padStart(2, "0")}`,

    thumbnail: "https://images.metahub.space/poster/tt0090407/medium.jpg"
  };
}

export async function getMetadata() {
  const videos = [];

  for (let i = 1; i <= 50; i++) {
    videos.push(createEpisode(i));
  }

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

    videos: videos
  };
}

export async function buildMetadata() {
  return getMetadata();
}
