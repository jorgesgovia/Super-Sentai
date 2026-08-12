import { getTmdbSeries, getTmdbSeason } from "./tmdb.js";
import { getMdbListData } from "./mdblist.js";

const TMDB_ID = "70787";
const IMDB_ID = "tt0090407";
const TRAKT_ID = 1307;
const TVDB_ID = 330023;
const MDBLIST_ID = "1wr5i";

const POSTER =
  "https://image.tmdb.org/t/p/original/mKoZUWBPMRa7sFBWMPuusTBBmS1.jpg";

const BACKGROUND =
  "https://imgbs.com/uploads/flashman-a8f83054.jpg";

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


async function fetchJson(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

function first(...values) {
  return values.find(
    (v) => v !== undefined && v !== null && v !== ""
  );
}

export async function getMetadata() {

  // Fuentes complementarias de metadata
  const imdbData = await fetchJson(
    `https://v3.sg.media-imdb.com/suggestion/x/${IMDB_ID}.json`
  );

  const cinemetaData = await fetchJson(
    `https://v3-cinemeta.strem.io/meta/tv/${IMDB_ID}.json`
  );

  const traktData = await fetchJson(
    `https://api.trakt.tv/shows/${TRAKT_ID}?extended=full`
  );


  const [tmdb, mdblist, season] = await Promise.all([
    getTmdbSeries(TMDB_ID),
    getMdbListData(IMDB_ID).catch(() => null),
    getTmdbSeason(TMDB_ID, 1)
  ]);

  const tmdbEpisodes = season?.episodes || [];
  const tmdbCast = tmdb?.credits?.cast || [];
  const tmdbCrew = tmdb?.credits?.crew || [];

  const imdbRating =
    mdblist?.ratings?.find((r) => r.source === "imdb")?.value ?? null;

  const tmdbRating =
    typeof tmdb?.vote_average === "number"
      ? tmdb.vote_average
      : null;

  const cast = tmdbCast.slice(0, 20).map((person) => ({
    name: person.name,
    character: person.character,
    photo: person.profile_path
      ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
      : undefined
  }));

  const directors = tmdbCrew
    .filter((person) => person.job === "Director")
    .map((person) => person.name);

  const writers = tmdbCrew
    .filter(
      (person) =>
        person.department === "Writing" ||
        person.job === "Writer" ||
        person.job === "Screenplay"
    )
    .map((person) => person.name);

  const episodes = tmdbEpisodes.map((ep, index) => {
    const episodeNumber = ep.episode_number;
    const description =
      FLASHMAN_DESCRIPTIONS[episodeNumber - 1] ||
      ep.overview ||
      "";

    const videoId =
      "super-sentai-flashman:1:" + episodeNumber;

    return {
      id: videoId,

      title:
        ep.name ||
        "Episodio " + episodeNumber,

      season: 1,

      episode: episodeNumber,

      number: episodeNumber,

      released: ep.air_date
        ? ep.air_date + "T00:00:00.000Z"
        : undefined,

      overview: description,

      description: description,

      runtime:
        ep.runtime ||
        tmdb?.episode_run_time?.[0] ||
        20,

      thumbnail: ep.still_path
        ? "https://image.tmdb.org/t/p/w780" + ep.still_path
        : undefined,

      rating:
        typeof ep.vote_average === "number" &&
        ep.vote_average > 0
          ? ep.vote_average
          : undefined,

      votes:
        typeof ep.vote_count === "number"
          ? ep.vote_count
          : undefined,

      behaviorHints: {
        defaultVideoId: videoId
      }
    };
  });

  
const mergedCast = [
  ...(cast || []),

  ...(cinemetaData?.meta?.cast || []).map((p) => ({
    name: p.name,
    character: p.character || "",
    profile: p.profilePath || p.profile || null
  })),

  ...(traktData?.people?.cast || []).map((p) => ({
    name: p.person?.name,
    character:
      Array.isArray(p.character)
        ? p.character.map((c) => c.name).join(", ")
        : "",
    profile: null
  }))
].filter(
  (person, index, self) =>
    person.name &&
    self.findIndex((x) => x.name === person.name) === index
);

const mergedDirectors = [
  ...(directors || []),
  ...(cinemetaData?.meta?.director || []),
  ...(traktData?.people?.crew?.directing || [])
    .map((p) => p.person?.name)
].filter(Boolean);

const mergedWriters = [
  ...(writers || []),
  ...(cinemetaData?.meta?.writer || []),
  ...(traktData?.people?.crew?.writing || [])
    .map((p) => p.person?.name)
].filter(Boolean);

const meta = {
    id: "super-sentai-flashman",

    type: "series",

    name:
      tmdb?.name ||
      mdblist?.title ||
      "Choushinsei Flashman",

    originalName:
      tmdb?.original_name ||
      "Choushinsei Flashman",

    originalTitle:
      tmdb?.original_name ||
      "Choushinsei Flashman",

    poster: POSTER,

    background: BACKGROUND,

    description:
      tmdb?.overview ||
      mdblist?.description ||
      "Choushinsei Flashman",

    tagline:
      tmdb?.tagline ||
      mdblist?.tagline ||
      undefined,

    year:
      Number(tmdb?.first_air_date?.slice(0, 4)) ||
      mdblist?.year ||
      1986,

    released:
      tmdb?.first_air_date ||
      mdblist?.released ||
      "1986-03-01",

    releaseInfo:
      tmdb?.first_air_date?.slice(0, 4) ||
      String(mdblist?.year || 1986),

    runtime:
      tmdb?.episode_run_time?.[0] ||
      mdblist?.runtime ||
      20,

    status:
      tmdb?.status ||
      mdblist?.status ||
      "Ended",

    genres:
      tmdb?.genres?.map((genre) => genre.name) ||
      mdblist?.genres?.map((genre) => genre.title) ||
      [
        "Action",
        "Adventure",
        "Drama",
        "Family",
        "Science Fiction"
      ],

    country:
      tmdb?.origin_country?.length
        ? tmdb.origin_country
        : ["JP"],

    language:
      tmdb?.original_language ||
      mdblist?.language ||
      "ja",

    spokenLanguage:
      mdblist?.spoken_language ||
      tmdb?.original_language ||
      "ja",

    certification:
      mdblist?.certification ||
      undefined,

    rating: tmdbRating,

    imdbRating,

    votes:
      typeof tmdb?.vote_count === "number"
        ? tmdb.vote_count
        : undefined,

    imdb_id: IMDB_ID,

    imdbId: IMDB_ID,

    tmdb_id: Number(TMDB_ID),

    tmdbId: Number(TMDB_ID),

    moviedb_id: Number(TMDB_ID),

    tvdb_id: TVDB_ID,

    tvdbId: TVDB_ID,

    trakt_id: TRAKT_ID,

    traktId: TRAKT_ID,

    mdblist_id: MDBLIST_ID,

    mdblistId: MDBLIST_ID,

    ids: {
      imdb: IMDB_ID,
      tmdb: Number(TMDB_ID),
      tvdb: TVDB_ID,
      trakt: TRAKT_ID,
      mdblist: MDBLIST_ID
    },

    network:
      tmdb?.networks?.[0]?.name ||
      mdblist?.network ||
      "tv asahi",

    productionCompanies:
      tmdb?.production_companies?.map((company) => company.name) ||
      mdblist?.production_companies?.map((company) => company.name) ||
      [],

    production_companies:
      tmdb?.production_companies?.map((company) => company.name) ||
      mdblist?.production_companies?.map((company) => company.name) ||
      [],

    cast,

    actors: cast,

    characters: cast
      .map((person) => person.character)
      .filter(Boolean),

    director: directors,

    directors,

    writer: writers,

    writers,

    links: [
      {
        name: "IMDb",
        category: "imdb",
        url: `https://www.imdb.com/title/${IMDB_ID}/`
      },
      {
        name: "TMDB",
        category: "tmdb",
        url: `https://www.themoviedb.org/tv/${TMDB_ID}`
      },
      {
        name: "Trakt",
        category: "trakt",
        url: `https://trakt.tv/shows/${TRAKT_ID}`
      },
      {
        name: "TVDB",
        category: "tvdb",
        url: `https://thetvdb.com/series/choushinsei-flashman`
      },
      {
        name: "MDBList",
        category: "mdblist",
        url: `https://mdblist.com/show/${MDBLIST_ID}`
      }
    ],

    
genre:
  first(
    tmdb?.genres?.map((g) => g.name),
    cinemetaData?.meta?.genres,
    mdblist?.genres
  ) || [],

genres:
  first(
    tmdb?.genres?.map((g) => g.name),
    cinemetaData?.meta?.genres,
    mdblist?.genres
  ) || [],

country:
  tmdb?.origin_country ||
  cinemetaData?.meta?.country ||
  ["JP"],

language:
  first(
    tmdb?.original_language,
    cinemetaData?.meta?.language,
    "ja"
  ),

spokenLanguage:
  first(
    tmdb?.spoken_languages?.[0]?.iso_639_1,
    cinemetaData?.meta?.language,
    "ja"
  ),

runtime:
  first(
    tmdb?.episode_run_time?.[0],
    cinemetaData?.meta?.runtime,
    mdblist?.runtime,
    20
  ),

rating:
  first(
    tmdbRating,
    imdbRating,
    cinemetaData?.meta?.imdbRating
  ),

imdbRating:
  first(
    imdbRating,
    cinemetaData?.meta?.imdbRating,
    tmdbRating
  ),

imdbVotes:
  first(
    cinemetaData?.meta?.imdbVotes,
    imdbData?.d?.[0]?.v
  ),

network:
  first(
    tmdb?.networks?.[0]?.name,
    cinemetaData?.meta?.network,
    mdblist?.network
  ),

productionCompanies:
  tmdb?.production_companies?.map((x) => x.name) ||
  cinemetaData?.meta?.productionCompanies ||
  mdblist?.production_companies ||
  [],

production_companies:
  tmdb?.production_companies?.map((x) => x.name) ||
  cinemetaData?.meta?.productionCompanies ||
  mdblist?.production_companies ||
  [],

logo:
  cinemetaData?.meta?.logo ||
  (
    tmdb?.logo_path
      ? `https://image.tmdb.org/t/p/original${tmdb.logo_path}`
      : undefined
  ),

tagline:
  first(
    tmdb?.tagline,
    cinemetaData?.meta?.tagline,
    mdblist?.tagline
  ),

videos: episodes,

    trailers: [
      "https://youtu.be/uJ57aEFkm8M?si=jmeRxSXil61g6Eb3"
    ],

    trailerStreams: [
      "https://youtu.be/uJ57aEFkm8M?si=jmeRxSXil61g6Eb3"
    ],

    behaviorHints: {
      defaultVideoId: "super-sentai-flashman:1:1"
    }
  };

  return meta;
}

export async function buildMetadata() {
  return await getMetadata();
}
