const POSTER =
  "https://image.tmdb.org/t/p/original/mKoZUWBPMRa7sFBWMPuusTBBmS1.jpg";

const BACKGROUND =
  "https://imgbs.com/uploads/flashman-a8f83054.jpg";

const TRAILER =
  "https://youtu.be/uJ57aEFkm8M?si=jmeRxSXil61g6Eb3";

const FLASHMAN_DESCRIPTIONS = [
  "Cinco jóvenes que dejaron la Tierra regresan después de 20 años al descubrir que el Imperio Mess la está invadiendo.",
  "Los Flashman deben cumplir su misión de proteger la Tierra cuando Mess crea una criatura para alterar sus genes.",
  "Jin, atormentado por recuerdos de su secuestro, se obsesiona con detener a un cazador alienígena que ha llegado a la Tierra.",
  "Un Guerrero Bestia hace que Dai vea todo al revés, así que Mag decide entrenar especialmente a Green Flash.",
  "Sara y Lou luchan solas en Nagoya contra un Guerrero Bestia que hace que las máquinas cobren vida.",
  "Jin intenta reparar desesperadamente su Flash Hawk mientras las motocicletas se vuelven clave para detener a un Guerrero Bestia.",
  "Ante un Guerrero Bestia capaz de esconderse como un camaleón, Bun idea una estrategia para ayudar al equipo a descubrir a su enemigo.",
  "El plan de Mess para atrapar a los Flashman en otra dimensión se ve alterado por un científico que quiere viajar 20 años al pasado.",
  "Los Flashman ayudan al Dr. Tokimura a completar su máquina del tiempo mientras Nefel intenta apoderarse de su fuente de energía.",
  "El enamoramiento de Dai por una florista lo lleva a una trampa preparada por Ley Nefel.",
  "Un Guerrero Bestia recién creado se encariña con Lou y comienza a verla como su madre.",
  "Ley Wanda atormenta a los Flashman con un aumento repentino de poder y lleva a Jin al límite al revelar un trauma de su pasado.",
  "Mess crea un monstruo capaz de copiar perfectamente la mente y las habilidades de combate de Jin.",
  "Bun intenta hacerse amigo de una chica problemática mientras Nefel prepara una trampa contra los Flashman.",
  "Sir Cowler, líder de los Cazadores Alienígenas, llega a la Tierra para ayudar a Mess a enfrentarse a los Flashman.",
  "Con Flash King fuera de combate, Cowler usa a Zukonda para encoger humanos y recolectar muestras, incluyendo a Sara.",
  "Jin intenta rescatar un autobús lleno de niños de un Guerrero Bestia explosivo cuando aparece un misterioso alienígena.",
  "El pasado y la misión de Ley Baraki son revelados cuando Keflen envía a Cowler para eliminar un error del pasado de Mess.",
  "Baraki es obligado a regresar con Mess y ayudar a detener a los Flashman, aunque intenta darles una última advertencia.",
  "Una niña psíquica salva a Dai de un Guerrero Bestia y hace que él crea que ella es su hermana menor.",
  "Sara es misteriosamente rescatada de un Guerrero Bestia de dos cabezas por un hombre que cree que ella es su hermana.",
  "Los Flashman responden a una señal de auxilio de un ave fénix espacial que se esconde de Mess en la isla Namegawa.",
  "Sara y Lou consiguen el cuerno de un Guerrero Bestia capaz de conceder todos sus deseos.",
  "Las tranquilas vacaciones de verano de Bun se convierten en una pesadilla cuando Cowler crea horrores en la playa.",
  "Jin queda atrapado en un enfrentamiento con Wanda mientras investiga a un Guerrero Bestia cuyo poder aumenta constantemente.",
  "Lou y una madre investigadora intentan descubrir el secreto de un delicioso platillo de calabaza preparado en un restaurante de Mess.",
  "Dai entrena con un boxeador aspirante cuyos fuertes genes llaman la atención de Keflen.",
  "Keflen mejora a Leh Gals con un nuevo poder de fuego para demostrar que su creación todavía es necesaria para Mess.",
  "Los Flashman enfrentan simultáneamente una nueva forma de Wanda, la aparición de su punto débil y un accidente del Dr. Tokimura.",
  "Los Flashman sufren aterradoras ilusiones de su secuestro de hace 20 años causadas por la nueva forma de Nefel.",
  "Los Flashman pierden repentinamente la capacidad de transformarse y recurren al Dr. Tokimura para descubrir la causa.",
  "El intento de Mag por fortalecer los prismas de los Flashman deja al equipo sin poderes cuando estos se rompen durante una batalla.",
  "Jin intenta ayudar a un niño a recuperar la confianza en su padre, un campeón de judo que acaba de perder una pelea.",
  "Bun desaparece después de ser envenenado y arrojado a unos rápidos, donde una mujer solitaria que perdió a su hijo lo encuentra.",
  "Sara y Lou deben trabajar juntas para aprender una pieza de piano que será clave para detener a un Guerrero Bestia.",
  "Un niño cae en una trampa de Mess que promete riquezas para poder comprar un violín para la chica que le gusta.",
  "Un Guerrero Bestia que absorbe fantasmas infantiles provoca otro encuentro entre Dai y la misteriosa niña psíquica.",
  "Cowler usa a su Guerrero Bestia más poderoso para controlar mentalmente a los Flashman y ponerlos contra Jin.",
  "Sara queda atormentada por Nefel, quien utiliza a un Guerrero Bestia para descubrir sus sentimientos sobre ser una chica normal de la Tierra.",
  "Jin es capturado y encerrado en una base de Mess donde mantienen prisioneras a personas para convertirlas en Guerreros Bestia.",
  "Un Guerrero Bestia convierte a Dai nuevamente en niño y los Flashman recurren a Setsuko Tokimura para protegerlo.",
  "Siguiendo una pista sobre su secuestro, Sara investiga datos de ovnis de hace 20 años mientras los Flashman enfrentan a un Guerrero Bestia electrónico.",
  "Cowler se enfrenta finalmente a Keflen y Mess cuando los Cazadores Alienígenas son atacados, mientras Bo Gardan llega para ayudarlo.",
  "Keflen secuestra a los Cazadores Alienígenas restantes para crear un poderoso Guerrero Bestia usando los genes de Ra Deus.",
  "Los Flashman descubren más sobre el peligroso Fenómeno Anti-Flash mientras intentan salvar al Dr. Tokimura de Cowler.",
  "Las terribles consecuencias del Fenómeno Anti-Flash comienzan a aparecer mientras los Flashman siguen buscando a Cowler para salvar al Dr. Tokimura.",
  "Ley Wanda utiliza su mejora Deus para vengarse de Jin, mientras Cowler y Keflen descubren la verdad sobre Ra Deus.",
  "La transformación de Bo Gardan en un Guerrero Bestia Deus obliga a Cowler a lanzar un ataque total contra el propio Ra Deus.",
  "Finalmente se revela la identidad del hijo secuestrado de Tokimura, mientras Keflen enfrenta la furia de un Ra Deus revivido.",
  "¡El tiempo de los Flashman se acaba! ¿Podrán destruir lo que queda de Mess antes de que el Fenómeno Anti-Flash los consuma?"
];

const CAST = [
  { name: "Touta Tarumi", character: "Jin / Red Flash" },
  { name: "Yasuhiro Ishiwata", character: "Bun / Blue Flash" },
  { name: "Kihachiro Uemura", character: "Dai / Green Flash" },
  { name: "Youko Nakamura", character: "Sara / Yellow Flash" },
  { name: "Mayumi Yoshida", character: "Lou / Pink Flash" },
  { name: "Akira Ishihama", character: "Dr. Tokimura" },
  { name: "Tamie Kubota", character: "Setsuko Tokimura" },
  { name: "Unshô Ishizuka", character: "Great Emperor Ra Deus" },
  { name: "Kôji Shimizu", character: "Great Emperor Ra Deus" },
  { name: "Jôji Nakata", character: "Sir Cowler" },
  { name: "Yutaka Hirose", character: "Ley Wanda" },
  { name: "Sayoko Hagiwara", character: "Ley Nefel" },
  { name: "Hiroyuki Uchida", character: "Ley Galus" },
  { name: "Kiyoshi Kobayashi", character: "Voice / Narration" },
  { name: "Eiichi Onoda", character: "Narrator" },
  { name: "Kazuhiko Kishino", character: "Keflen" },
  { name: "Shigeru Saiki", character: "Baraki" },
  { name: "Koji Ochiai", character: "Cowler / additional roles" },
  { name: "Mitsuru Miyamoto", character: "Additional voice" },
  { name: "Masahiro Anzai", character: "Additional cast" },
  { name: "Takeshi Watabe", character: "Additional cast" },
  { name: "Miki Ito", character: "Additional cast" },
  { name: "Hiroshi Masuoka", character: "Additional cast" },
  { name: "Shinichi Ishihara", character: "Additional cast" },
  { name: "Yasuo Yamada", character: "Additional cast" },
  { name: "Toshio Furukawa", character: "Additional cast" },
  { name: "Chikao Otsuka", character: "Additional cast" },
  { name: "Tessho Genda", character: "Additional cast" },
  { name: "Kaneto Shiozawa", character: "Additional cast" },
  { name: "Issei Futamata", character: "Additional cast" },
  { name: "Jin Yamanoi", character: "Additional cast" }
];

const DIRECTORS = [
  "Minoru Yamada"
];

const WRITERS = [
  "Hirohisa Soda"
];

const GENRES = [
  "Action",
  "Adventure",
  "Science Fiction"
];

const PRODUCTION_COMPANIES = [
  "Toei Company",
  "TV Asahi",
  "Toei Advertising"
];

function createEpisodes() {
  return FLASHMAN_DESCRIPTIONS.map((description, index) => {
    const episode = index + 1;

    return {
      id: `super-sentai-flashman:1:${episode}`,
      type: "episode",
      seriesId: "super-sentai-flashman",

      season: 1,
      episode,
      number: episode,

      name: `Episodio ${episode}`,
      title: `Episodio ${episode}`,

      overview: description,
      description,

      released: null,

      thumbnail: BACKGROUND,
      background: BACKGROUND,

      runtime: 30,

      rating: null,
      votes: 0,
      imdbRating: null,

      directors: [],
      writers: [],

      actors: CAST.map((person) => person.name),
      cast: CAST,

      videos: []
    };
  });
}

export async function getMetadata() {
  const episodes = createEpisodes();

  return {
    id: "super-sentai-flashman",
    type: "series",

    name: "Choushinsei Flashman",
    originalName: "Chôshinsei Furasshuman",
    originalTitle: "Chôshinsei Furasshuman",

    poster: POSTER,
    background: BACKGROUND,

    description:
      "In 1966, five children were abducted by the Alien Hunters of the Reconstructive Experiment Empire Mess. Rescued by the Flash alien race, they were raised and trained in the Flash Solar System before returning to Earth 20 years later as the Flashman team.",

    overview:
      "In 1966, five children were abducted by the Alien Hunters of the Reconstructive Experiment Empire Mess. Rescued by the Flash alien race, they were raised and trained in the Flash Solar System before returning to Earth 20 years later as the Flashman team.",

    tagline:
      "¡El tiempo de los Flashman se acaba!",

    year: 1986,
    released: "1986-03-01",
    releaseInfo: "1986",

    runtime: 30,

    status: "Ended",

    genres: GENRES,
    genre: GENRES,

    country: ["JP"],
    language: "ja",
    spokenLanguage: "ja",

    certification: "TV-PG",

    rating: 8.0,
    imdbRating: 8.0,
    imdbVotes: 282,

    votes: 282,

    imdb_id: "tt0090407",
    imdbId: "tt0090407",

    tmdb_id: 70787,
    tmdbId: 70787,
    moviedb_id: 70787,

    tvdb_id: 330023,
    tvdbId: 330023,

    trakt_id: 1307,
    traktId: 1307,

    mdblist_id: "1wr5i",
    mdblistId: "1wr5i",

    ids: {
      imdb: "tt0090407",
      tmdb: 70787,
      tvdb: 330023,
      trakt: 1307,
      mdblist: "1wr5i"
    },

    network: "tv asahi",

    productionCompanies: PRODUCTION_COMPANIES,
    production_companies: PRODUCTION_COMPANIES,

    cast: CAST,
    actors: CAST,

    characters: CAST
      .map((person) => person.character)
      .filter(Boolean),

    director: DIRECTORS,
    directors: DIRECTORS,

    writer: WRITERS,
    writers: WRITERS,

    logo: undefined,

    trailer: TRAILER,

    trailers: [
      TRAILER
    ],

    trailerStreams: [],

    videos: episodes,

    links: [
      {
        name: "IMDb",
        category: "imdb",
        url: "https://www.imdb.com/title/tt0090407/"
      },
      {
        name: "TMDB",
        category: "tmdb",
        url: "https://www.themoviedb.org/tv/70787"
      },
      {
        name: "Trakt",
        category: "trakt",
        url: "https://trakt.tv/shows/1307"
      },
      {
        name: "TVDB",
        category: "tvdb",
        url: "https://thetvdb.com/series/choushinsei-flashman"
      },
      {
        name: "MDBList",
        category: "mdblist",
        url: "https://mdblist.com/show/1wr5i"
      }
    ],

    behaviorHints: {
      defaultVideoId: "super-sentai-flashman:1:1"
    }
  };
}

export async function buildMetadata() {
  return getMetadata();
}
