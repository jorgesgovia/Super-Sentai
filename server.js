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

app.get("/manifest.json", (req, res) => {
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
          type: "series",
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
    console.log(" META");
    console.log("======================================");
    console.log("Requested:", req.params.id);
    console.log("Returning:", metadata.name);
    console.log("Videos:", metadata.videos.length);

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );

    res.setHeader(
      "Pragma",
      "no-cache"
    );

    res.setHeader(
      "Expires",
      "0"
    );

    res.json({
      meta: {
        id: metadata.id,
        type: "series",
        name: metadata.name,

        imdb_id: metadata.imdb_id,

        year: metadata.year,
        releaseInfo: metadata.releaseInfo,
        released: metadata.released,

        genres: metadata.genres,

        description: metadata.description,

        network: metadata.network,
        productionCompany: metadata.productionCompany,

        poster: metadata.poster,
        background: metadata.background,

        videos: metadata.videos
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
    console.log(" STREAM");
    console.log("======================================");
    console.log("Type:", req.params.type);
    console.log("ID:", requestedId);

    if (requestedId === "70787") {

      console.log("SERIES STREAM REQUEST");

      const allStreams = [];

      for (let episode = 1; episode <= 50; episode++) {

        const episodeId = `70787:1:${episode}`;

        try {

          const streams = await getStreams(episodeId);

          if (
            Array.isArray(streams) &&
            streams.length > 0
          ) {

            for (const stream of streams) {

              allStreams.push({
                ...stream,

                title:
                  stream.title ||
                  `Episodio ${episode}`,

                name:
                  stream.name ||
                  `Episodio ${episode}`,

                season: 1,

                episode: episode,

                episodeId: episodeId
              });

            }

          }

        } catch (episodeError) {

          console.error(
            "Episode error:",
            episodeId,
            episodeError
          );

        }

      }

      console.log(
        "TOTAL STREAMS:",
        allStreams.length
      );

      return res.json({
        streams: allStreams
      });
    }

    const streams = await getStreams(requestedId);

    res.json({
      streams: Array.isArray(streams)
        ? streams
        : []
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
  console.log(" SERIES: Choushinsei Flashman");
  console.log(" ID: 70787");
  console.log(" IMDb: tt0090407");
  console.log(" EPISODES: 50");
  console.log(" NETWORK: TV Asahi");
  console.log(" PRODUCTION: Toei Company");
  console.log(" STREAMS: Google Drive");
  console.log("======================================");

});
