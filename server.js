import "dotenv/config";
import express from "express";
import { manifest } from "./src/manifest.js";
import { getCatalog } from "./src/catalog.js";
import { getEpisodes } from "./src/episodes.js";
import { SERIES } from "./src/series.js";
import { getStreams } from "./src/streams.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const PORT = Number(process.env.PORT || 7070);

app.get("/manifest.json", (req, res) => {
  res.json(manifest);
});

app.get("/catalog/:type/:id.json", async (req, res) => {
  try {
    const { type, id } = req.params;

    if (type !== "series" || id !== "super-sentai") {
      return res.json({
        metas: []
      });
    }

    const metas = await getCatalog();

    res.json({
      metas
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

app.get("/meta/:type/:id.json", async (req, res) => {
  try {
    const { type, id } = req.params;

    if (type !== "series") {
      return res.status(404).json({
        error: "Tipo no soportado"
      });
    }

    const series = SERIES.find((item) => item.id === id);

    if (!series) {
      return res.status(404).json({
        error: "Serie no encontrada"
      });
    }

    const episodes = await getEpisodes(id);

    const catalog = await getCatalog();

    const metadata = catalog.find(
      (item) => item.id === id
    );

    if (!metadata) {
      return res.status(404).json({
        error: "Metadata no encontrada"
      });
    }

    res.json({
      meta: {
        ...metadata,

        videos: episodes.map((episode) => ({
          ...episode,
          title: episode.name
        }))
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

app.get("/stream/:type/:id.json", async (req, res) => {
  try {
    const { type, id } = req.params;

    if (type !== "series") {
      return res.json({
        streams: []
      });
    }

    const streams = await getStreams(id);

    res.json({
      streams
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      streams: [],
      error: error.message
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Super Sentai Addon ejecutándose en http://0.0.0.0:${PORT}`
  );
});