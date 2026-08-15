import express from "express";
import cors from "cors";
import { getMetadata } from "./src/metadata.js";
import { getStreams } from "./src/streams.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7070;

const ADDON_ID = "org.super-sentai.addon";
const ADDON_NAME = "Super Sentai Addon";

app.get("/", (req, res) => {
  res.json({
    addon: ADDON_NAME,
    status: "ok"
  });
});

app.get("/manifest.json", async (req, res) => {
  res.json({
    id: ADDON_ID,
    version: "1.0.0",
    name: ADDON_NAME,
    description: "Super Sentai Addon para Nuvio",
    resources: [
      "catalog",
      "meta",
      "stream"
    ],
    types: [
      "series"
    ],
    catalogs: [
      {
        type: "series",
        id: "super-sentai",
        name: "Super Sentai"
      }
    ]
  });
});

app.get("/catalog/:type/:id.json", async (req, res) => {
  try {
    const metadata = await getMetadata();

    res.json({
      metas: [
        {
          id: metadata.id,
          type: metadata.type,
          name: metadata.name,
          poster: metadata.poster,
          background: metadata.background,
          description: metadata.description,
          genres: metadata.genres,
          year: metadata.year,
          releaseInfo: metadata.releaseInfo,
          released: metadata.released,
          imdb_id: metadata.imdb_id,
          network: metadata.network,
          productionCompany: metadata.productionCompany
        }
      ]
    });
  } catch (error) {
    console.error("CATALOG ERROR:", error);

    res.status(500).json({
      metas: []
    });
  }
});

app.get("/meta/:type/:id.json", async (req, res) => {
  try {
    const metadata = await getMetadata();

    console.log("");
    console.log("======================================");
    console.log(" META REQUEST");
    console.log("======================================");
    console.log("Requested ID:", req.params.id);
    console.log("Series ID:", metadata.id);
    console.log("Episodes:", metadata.videos.length);
    console.log("Network:", metadata.network);
    console.log("Production:", metadata.productionCompany);

    res.json({
      meta: {
        ...metadata
      }
    });
  } catch (error) {
    console.error("META ERROR:", error);

    res.status(500).json({
      meta: {}
    });
  }
});

app.get("/stream/:type/:id.json", async (req, res) => {
  try {
    const requestedId = req.params.id;

    console.log("");
    console.log("======================================");
    console.log(" STREAM REQUEST");
    console.log("======================================");
    console.log("Type:", req.params.type);
    console.log("Requested ID:", requestedId);

    /*
     * ==========================================================
     * EPISODIO INDIVIDUAL
     * ==========================================================
     */

    if (requestedId.startsWith("70787:1:")) {
      console.log("Individual episode request");

      const streams = await getStreams(requestedId);

      console.log(
        "Episode streams:",
        Array.isArray(streams) ? streams.length : 0
      );

      return res.json({
        streams: Array.isArray(streams) ? streams : []
      });
    }

    /*
     * ==========================================================
     * SERIE COMPLETA
     *
     * Nuvio está solicitando:
     *
     * /stream/series/70787.json
     *
     * En lugar de devolver [] intentamos consultar
     * cada episodio mediante streams.js.
     * ==========================================================
     */

    if (requestedId === "70787") {
      console.log("SERIES REQUEST DETECTED");
      console.log("Buscando streams de los 50 episodios...");

      const allStreams = [];

      for (let episode = 1; episode <= 50; episode++) {
        const episodeId = `70787:1:${episode}`;

        try {
          console.log("Consultando:", episodeId);

          const streams = await getStreams(episodeId);

          if (Array.isArray(streams) && streams.length > 0) {
            console.log(
              "ENCONTRADOS:",
              episodeId,
              streams.length
            );

            for (const stream of streams) {
              allStreams.push({
                ...stream,
                name:
                  stream.name ||
                  `Choushinsei Flashman - Episodio ${episode}`,
                title:
                  stream.title ||
                  `Episodio ${episode}`,
                episode: episode,
                season: 1,
                episodeId
              });
            }
          } else {
            console.log(
              "SIN STREAM:",
              episodeId
            );
          }
        } catch (episodeError) {
          console.error(
            "ERROR EN",
            episodeId,
            episodeError
          );
        }
      }

      console.log("");
      console.log("======================================");
      console.log(" RESULTADO SERIES");
      console.log("Streams encontrados:", allStreams.length);
      console.log("======================================");

      return res.json({
        streams: allStreams
      });
    }

    /*
     * ==========================================================
     * CUALQUIER OTRO ID
     * ==========================================================
     */

    console.log("ID desconocido:", requestedId);

    const streams = await getStreams(requestedId);

    return res.json({
      streams: Array.isArray(streams) ? streams : []
    });

  } catch (error) {
    console.error("STREAM ERROR:", error);

    res.json({
      streams: []
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("======================================");
  console.log(" Super Sentai Addon");
  console.log(" STATUS: ONLINE");
  console.log(" PORT:", PORT);
  console.log(" SERIES ID: 70787");
  console.log(" EPISODES: 50");
  console.log(" NETWORK: TV Asahi");
  console.log(" PRODUCTION: Toei Company");
  console.log(" IMDb: tt0090407");
  console.log(" STREAM ENGINE: src/streams.js");
  console.log("======================================");
});
