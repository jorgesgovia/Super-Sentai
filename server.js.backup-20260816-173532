import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 7070;

const SERIES_ID = "70787";
const IMDB_ID = "tt0090407";
const TMDB_ID = "70787";

const POSTER =
  "https://image.tmdb.org/t/p/original/wyGFaD0V2bU2Q5uEtJDStZSRoG2.jpg";

const BACKGROUND =
  "https://image.tmdb.org/t/p/original/rOR8GXwBrvQ03zLC9o4Jp5NwZzC.jpg";

const TRAILER =
  "https://www.youtube.com/watch?v=Q_oVf3qpwIk";

const SERIES_NAME = "Choushinsei Flashman";

const DESCRIPTION =
  "Cinco jóvenes japoneses que fueron secuestrados de la Tierra cuando eran niños regresan después de veinte años como los Flashman para enfrentarse al Imperio Mess y proteger la Tierra.";

const GENRES = [
  "Action",
  "Adventure",
  "Science Fiction"
];

const CAST = [
  { name: "Touta Tarumi", character: "Jin / Red Flash" },
  { name: "Yasuhiro Ishiwata", character: "Bun / Blue Flash" },
  { name: "Kihachiro Uemura", character: "Dai / Green Flash" },
  { name: "Mayumi Yoshida", character: "Sara / Yellow Flash" },
  { name: "Yoko Nakamura", character: "Lou / Pink Flash" }
];

const DIRECTORS = [
  "Minoru Yamada"
];

const WRITERS = [
  "Hirohisa Soda"
];

const PRODUCTION_COMPANIES = [
  "Toei Company",
  "TV Asahi",
  "Toei Advertising"
];

/*
============================================================
DESCRIPCIONES DE LOS 50 EPISODIOS
============================================================
*/

const EPISODE_DESCRIPTIONS = [
  "Cinco jóvenes que dejaron la Tierra regresan después de veinte años al descubrir que el Imperio Mess está invadiendo su planeta natal.",
  "Los Flashman deben cumplir su misión de proteger la Tierra cuando Mess crea una criatura capaz de alterar sus genes.",
  "Jin, atormentado por recuerdos de su secuestro, se obsesiona con detener a un peligroso cazador alienígena que ha llegado a la Tierra.",
  "Un Guerrero Bestia hace que Dai vea todo al revés, mientras Mag intenta ayudar a Green Flash a superar sus dificultades.",
  "Sara y Lou deben luchar solas en Nagoya contra un Guerrero Bestia capaz de hacer que las máquinas cobren vida.",
  "Jin intenta reparar desesperadamente su Flash Hawk mientras las motocicletas se convierten en la clave para derrotar a un Guerrero Bestia.",
  "Ante un Guerrero Bestia capaz de esconderse como un camaleón, Bun idea una estrategia para ayudar al equipo a descubrir a su enemigo.",
  "El plan de Mess para atrapar a los Flashman en otra dimensión se complica cuando aparece un científico que quiere viajar veinte años al pasado.",
  "Los Flashman ayudan al Dr. Tokimura a completar su máquina del tiempo mientras Nefel intenta apoderarse de su fuente de energía.",
  "El enamoramiento de Dai por una florista lo lleva directamente a una trampa preparada por Ley Nefel.",
  "Un Guerrero Bestia recién creado se encariña con Lou y comienza a verla como si fuera su madre.",
  "Ley Wanda atormenta a los Flashman con un aumento repentino de poder y lleva a Jin al límite al revelar un trauma de su pasado.",
  "Mess crea un monstruo capaz de copiar perfectamente la mente y las habilidades de combate de Jin.",
  "Bun intenta hacerse amigo de una chica problemática mientras Nefel prepara una nueva trampa contra los Flashman.",
  "Sir Cowler, líder de los Cazadores Alienígenas, llega a la Tierra para ayudar a Mess a enfrentarse a los Flashman.",
  "Los Flashman deben enfrentarse a un nuevo Guerrero Bestia mientras Cowler continúa estudiando sus debilidades.",
  "Sara se encuentra con una niña que le recuerda su propio pasado y decide protegerla de las fuerzas de Mess.",
  "Dai queda atrapado en una situación peligrosa cuando Mess utiliza una criatura capaz de manipular los sentidos.",
  "Jin y Bun descubren información importante sobre los experimentos genéticos realizados por Mess.",
  "Los Flashman intentan impedir que un Guerrero Bestia utilice la energía de una instalación científica.",
  "Lou descubre que una criatura de Mess tiene sentimientos y comienza a cuestionar la verdadera naturaleza de sus enemigos.",
  "Cowler continúa persiguiendo a los Flashman mientras el equipo intenta descubrir sus planes.",
  "Un nuevo Guerrero Bestia pone en peligro una ciudad entera y obliga a los Flashman a utilizar una nueva estrategia.",
  "Dai intenta demostrar que puede derrotar solo a un enemigo que parece imposible de vencer.",
  "Los Flashman descubren nuevas pistas sobre sus verdaderos padres y sobre el motivo de su secuestro.",
  "Mess desarrolla un nuevo experimento genético destinado específicamente a derrotar a los Flashman.",
  "Jin comienza a recordar detalles de su infancia que habían quedado ocultos durante veinte años.",
  "Los Flashman deben proteger a un grupo de científicos que posee información crucial sobre Mess.",
  "Sara y Lou se infiltran en una instalación enemiga para descubrir qué está preparando Mess.",
  "Bun se enfrenta a un Guerrero Bestia que utiliza ilusiones para confundir al equipo.",
  "Dai debe superar sus dudas cuando los Flashman son separados durante una misión.",
  "Jin descubre una nueva pista relacionada con su familia y decide investigar aunque sea peligroso.",
  "Cowler prepara una nueva ofensiva contra los Flashman utilizando un Guerrero Bestia especialmente poderoso.",
  "Los Flashman luchan contra un enemigo que puede absorber diferentes formas de energía.",
  "Lou descubre información que podría cambiar la manera en que el equipo entiende su propio pasado.",
  "Mess intenta utilizar tecnología terrestre para aumentar el poder de sus Guerreros Bestia.",
  "Bun y Dai quedan atrapados mientras investigan una instalación secreta.",
  "Sara intenta proteger a una persona que se ha convertido en objetivo de Mess.",
  "Jin y los demás Flashman descubren nuevas pruebas sobre sus orígenes.",
  "Cowler intensifica su persecución mientras Mess prepara una nueva criatura.",
  "Los Flashman deben detener un plan de Mess antes de que afecte a miles de personas.",
  "Una nueva batalla obliga al equipo a combinar todas sus fuerzas para derrotar a un poderoso Guerrero Bestia.",
  "Los Flashman descubren que el tiempo que pueden permanecer en la Tierra está llegando a su límite.",
  "Jin debe tomar una difícil decisión relacionada con su pasado y su futuro.",
  "Mess lanza una de sus ofensivas más peligrosas contra los Flashman.",
  "El equipo se prepara para su enfrentamiento definitivo contra las fuerzas de Mess.",
  "Los Flashman descubren finalmente información decisiva sobre sus verdaderos orígenes.",
  "El enfrentamiento final contra Mess se acerca y los cinco Flashman deben luchar unidos.",
  "La batalla definitiva pone a prueba todo lo que los Flashman han aprendido durante su misión.",
  "Los Flashman afrontan las consecuencias de su lucha contra Mess mientras su destino queda finalmente decidido."
];

/*
============================================================
UTILIDADES
============================================================
*/

function clean(value) {
  return value === undefined || value === null ? "" : value;
}

function youtubeId(url) {
  if (!url) return null;

  const match = String(url).match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/
  );

  return match ? match[1] : null;
}

/*
============================================================
METADATA COMPLETA
============================================================
*/

function buildSeriesMeta() {
  return {
    id: SERIES_ID,
    type: "series",

    name: SERIES_NAME,

    poster: POSTER,
    background: BACKGROUND,

    description: DESCRIPTION,

    year: 1986,

    releaseInfo: "1986-1987",

    released: "1986-03-01",

    runtime: "25m",

    genres: GENRES,

    imdbRating: 8.2,

    imdb_id: IMDB_ID,

    tmdb_id: TMDB_ID,

    directors: DIRECTORS,

    writers: WRITERS,

    cast: CAST,

    productionCompanies: PRODUCTION_COMPANIES,

    trailers: [
      {
        source: youtubeId(TRAILER),
        type: "Trailer",
        name: "Tráiler"
      }
    ],

    videos: Array.from(
      { length: 50 },
      (_, index) => ({
        id: `${SERIES_ID}:${index + 1}`,
        title: `Episodio ${index + 1}`,
        season: 1,
        number: index + 1,
        overview:
          EPISODE_DESCRIPTIONS[index] ||
          `Episodio ${index + 1} de ${SERIES_NAME}.`,
        thumbnail: POSTER,
        released: `1986-${String(
          Math.min(12, Math.floor(index / 4) + 3)
        ).padStart(2, "0")}-01`
      })
    )
  };
}

/*
============================================================
EPISODIOS
============================================================
*/

function buildEpisodes() {
  return Array.from(
    { length: 50 },
    (_, index) => ({
      id: `${SERIES_ID}:${index + 1}`,
      title: `Episodio ${index + 1}`,
      season: 1,
      number: index + 1,
      overview:
        EPISODE_DESCRIPTIONS[index] ||
        `Episodio ${index + 1} de ${SERIES_NAME}.`,
      thumbnail: POSTER
    })
  );
}

/*
============================================================
STREAMS
============================================================
*/

async function getExistingStreams() {
  try {
    const module = await import("./src/streams.js");

    const possibleFunctions = [
      "getStreams",
      "getSeriesStreams",
      "streams",
      "getStream"
    ];

    for (const name of possibleFunctions) {
      if (typeof module[name] === "function") {
        return module[name];
      }
    }

    if (typeof module.default === "function") {
      return module.default;
    }
  } catch (error) {
    console.log("No se pudo cargar streams.js:", error.message);
  }

  return null;
}

async function resolveStreams(id) {
  const fn = await getExistingStreams();

  if (fn) {
    try {
      const result = await fn(id);

      if (Array.isArray(result)) {
        return result;
      }

      if (result && Array.isArray(result.streams)) {
        return result.streams;
      }
    } catch (error) {
      console.log("Error usando streams.js:", error.message);
    }
  }

  return [];
}

/*
============================================================
CORS
============================================================
*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/*
============================================================
HOME / HEALTH
============================================================
*/

app.get("/", (req, res) => {
  res.json({
    addon: "Super Sentai",
    status: "online",
    series: SERIES_NAME,
    id: SERIES_ID,
    imdb_id: IMDB_ID,
    tmdb_id: TMDB_ID
  });
});

/*
============================================================
MANIFEST
============================================================
*/

app.get("/manifest.json", (req, res) => {
  res.json({
    id: "org.super-sentai.nuvio",
    version: "1.3.0",
    name: "Super Sentai",
    description:
      "Choushinsei Flashman con metadata completa y episodios reproducibles.",

    resources: [
      {
        name: "catalog",
        types: ["series"]
      },
      {
        name: "meta",
        types: ["series"],
        idPrefixes: ["70787"]
      },
      {
        name: "stream",
        types: ["series"],
        idPrefixes: ["70787"]
      }
    ],

    types: ["series"],

    catalogs: [
      {
        type: "series",
        id: "super-sentai",
        name: "Super Sentai"
      }
    ]
  });
});

/*
============================================================
CATALOG
============================================================
*/

app.get("/catalog/series/super-sentai.json", (req, res) => {
  res.json({
    metas: [
      {
        id: SERIES_ID,
        type: "series",
        name: SERIES_NAME,
        poster: POSTER,
        background: BACKGROUND,
        description: DESCRIPTION
      }
    ]
  });
});

/*
============================================================
META
============================================================
*/

app.get("/meta/series/:id.json", (req, res) => {
  const requestedId = req.params.id;

  console.log("META REQUEST:", requestedId);

  if (
    requestedId !== SERIES_ID &&
    requestedId !== IMDB_ID &&
    requestedId !== "super-sentai-flashman"
  ) {
    return res.status(404).json({
      error: "Series not found",
      requestedId
    });
  }

  const meta = buildSeriesMeta();

  res.json({
    meta
  });
});

/*
También aceptamos la ruta sin .json por compatibilidad.
*/

app.get("/meta/series/:id", (req, res) => {
  const requestedId = req.params.id;

  console.log("META REQUEST:", requestedId);

  if (
    requestedId !== SERIES_ID &&
    requestedId !== IMDB_ID &&
    requestedId !== "super-sentai-flashman"
  ) {
    return res.status(404).json({
      error: "Series not found",
      requestedId
    });
  }

  res.json({
    meta: buildSeriesMeta()
  });
});

/*
============================================================
STREAM
============================================================
*/

app.get("/stream/series/:id.json", async (req, res) => {
  const requestedId = req.params.id;

  console.log("STREAM REQUEST:", requestedId);

  const streams = await resolveStreams(requestedId);

  res.json({
    streams
  });
});

app.get("/stream/series/:id", async (req, res) => {
  const requestedId = req.params.id;

  console.log("STREAM REQUEST:", requestedId);

  const streams = await resolveStreams(requestedId);

  res.json({
    streams
  });
});

/*
============================================================
INICIO
============================================================
*/

app.listen(PORT, () => {
  console.log("");
  console.log("======================================");
  console.log(" SUPER SENTAI ADDON");
  console.log("======================================");
  console.log(`Servidor: http://localhost:${PORT}`);
  console.log(`Serie: ${SERIES_NAME}`);
  console.log(`ID Nuvio: ${SERIES_ID}`);
  console.log(`IMDb: ${IMDB_ID}`);
  console.log(`TMDB: ${TMDB_ID}`);
  console.log("======================================");
  console.log("");
});
