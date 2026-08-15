const episodeData = [
  {
    episode: 1,
    title: "Episodio 1",
    overview: "La Tierra se encuentra en peligro cuando una amenaza extraterrestre pone en marcha un nuevo plan de conquista. Un grupo de jóvenes deberá enfrentarse al enemigo y convertirse en los guerreros que defenderán el planeta."
  },
  {
    episode: 2,
    title: "Episodio 2",
    overview: "Los Flashman continúan su lucha contra el Imperio Mess y descubren que su enemigo prepara un nuevo ataque. El equipo deberá unir sus fuerzas para detenerlo."
  },
  {
    episode: 3,
    title: "Episodio 3",
    overview: "Una nueva amenaza obliga a los Flashman a poner a prueba sus habilidades mientras intentan proteger a la población de las fuerzas de Mess."
  },
  {
    episode: 4,
    title: "Episodio 4",
    overview: "Los Flashman se enfrentan a una nueva criatura de Mess y deberán encontrar una manera de derrotarla antes de que su poder cause una catástrofe."
  },
  {
    episode: 5,
    title: "Episodio 5",
    overview: "El equipo vuelve a entrar en acción cuando aparece una nueva amenaza. La misión pondrá a prueba la confianza y coordinación de los cinco guerreros."
  }
];

function createEpisode(episode) {
  const known = episodeData.find(item => item.episode === episode);

  return {
    id: `70787:1:${episode}`,

    type: "series",

    name: "Choushinsei Flashman",

    title: known?.title || `Episodio ${episode}`,

    season: 1,

    episode,

    number: episode,

    overview:
      known?.overview ||
      `Los Flashman continúan su lucha contra el Imperio Mess en el episodio ${episode} de Choushinsei Flashman.`,

    released: "1986-01-01"
  };
}

export async function getMetadata() {
  const videos = [];

  for (let episode = 1; episode <= 50; episode++) {
    videos.push(createEpisode(episode));
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
