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

    console.log("===== META REQUEST =====");
    console.log("Requested:", req.params.id);
    console.log("Returning:", metadata.name);
    console.log("Episodes:", metadata.videos?.length || 0);

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

    console.log("===== STREAM REQUEST =====");
    console.log("Type:", req.params.type);
    console.log("Requested ID:", requestedId);

    const streams = await getStreams(requestedId);

    console.log(
      "Streams returned:",
      Array.isArray(streams) ? streams.length : 0
    );

    res.json({
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
  console.log("======================================");
  console.log(" Super Sentai Addon");
  console.log(" PORT:", PORT);
  console.log(" STATUS: ONLINE");
  console.log(" EPISODES: 50");
  console.log(" STREAMS: src/streams.js");
  console.log("======================================");
});
