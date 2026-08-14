import "dotenv/config";
import express from "express";
import cors from "cors";

import { getMetadata } from "./src/metadata.js";
import { getStreams } from "./src/streams.js";
import { getEpisodes } from "./src/episodes.js";
import { mergeExternalMetadata } from "./src/externalMetadata.js";

const app = express();

const PORT = process.env.PORT || 7070;

/*
 * ============================================================
 * LOG DE PETICIONES DE NUVIO
 * ============================================================
 */

app.use((req, res, next) => {
  console.log("Nuvio pidió:", req.method, req.originalUrl);
  next();
});

app.use(cors());


/*
 * ============================================================
 * MANIFEST
 * ============================================================
 *
 * Cada recurso declara explícitamente el tipo que maneja.
 *
 * META:
 *   series + super-sentai-
 *
 * STREAM:
 *   series + super-sentai-
 *
 * Los episodios están dentro de meta.videos.
 * No se declara "episode" como tipo independiente.
 *
 * ============================================================
 */

app.get("/manifest.json", (req, res) => {
  return res.json({
    id: "org.super-sentai.nuvio",
    version: "1.0.0",

    name: "Super Sentai",

    description:
      "Series y episodios de Super Sentai para Nuvio",

    resources: [
      {
        name: "catalog",
        types: ["series"]
      },

      {
        name: "meta",
        types: ["series"],
        idPrefixes: ["super-sentai-"]
      },

      {
        name: "stream",
        types: ["series"],
        idPrefixes: ["super-sentai-"]
      }
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


/*
 * ============================================================
 * CATALOG
 * ============================================================
 */

app.get("/catalog/:type/:id.json", async (req, res) => {
  try {
    const { type, id } = req.params;

    console.log(
      "CATALOG PEDIDO:",
      type,
      id
    );

    if (
      type !== "series" ||
      id !== "super-sentai"
    ) {
      return res.json({
        metas: []
      });
    }

    const metadata = await getMetadata();

    const catalogMeta = {
      id: metadata.id,
      type: "series",
      name: metadata.name,

      poster: metadata.poster,
      background: metadata.background,

      description: metadata.description,

      genres: metadata.genres,

      year: metadata.year,

      releaseInfo: metadata.releaseInfo
    };

    console.log(
      "CATALOG ENVIADO:",
      JSON.stringify({
        id: catalogMeta.id,
        type: catalogMeta.type,
        name: catalogMeta.name
      })
    );

    return res.json({
      metas: [
        catalogMeta
      ]
    });

  } catch (error) {
    console.error(
      "ERROR CATALOG:",
      error
    );

    return res.status(500).json({
      metas: []
    });
  }
});


/*
 * ============================================================
 * META
 * ============================================================
 */

app.get("/meta/:type/:id.json", async (req, res) => {
  try {
    const { type, id } = req.params;

    console.log(
      "META PEDIDA:",
      type,
      id
    );

    /*
     * Solo aceptamos metadata de series.
     */

    if (type !== "series") {
      return res.status(404).json({
        meta: null
      });
    }

    /*
     * Solo nuestra serie.
     */

    if (
      id !== "70787" &&
      id !== "super-sentai-flashman"
    ) {
      return res.status(404).json({
        meta: null
      });
    }

    /*
     * Obtenemos nuestra metadata completa.
     */

    const metadata = await getMetadata();


    /*
     * ========================================================
     * VIDEOS
     * ========================================================
     *
     * IMPORTANTE:
     *
     * El ID de cada video es:
     *
     * 70787:1:1
     * 70787:1:2
     * ...
     *
     * Ese mismo ID será utilizado posteriormente
     * para solicitar el stream correspondiente.
     *
     * ========================================================
     */

    /*
     * ========================================================
     * EPISODIOS
     * ========================================================
     *
     * TMDB proporciona la información del episodio:
     *
     * - título
     * - descripción
     * - fecha
     * - thumbnail
     * - duración
     * - rating
     *
     * Pero NO usamos el ID TMDB para reproducir.
     *
     * Cada episodio recibe nuestro ID interno:
     *
     * 70787:1:1
     * 70787:1:2
     * ...
     *
     * De esta manera Nuvio puede mostrar la información de
     * TMDB mientras /stream continúa resolviendo Google Drive.
     * ========================================================
     */

    let tmdbEpisodes = [];

    try {
      tmdbEpisodes = await getEpisodes(
        "super-sentai-flashman"
      );

      console.log(
        "EPISODIOS TMDB OBTENIDOS:",
        tmdbEpisodes.length
      );
    } catch (error) {
      console.error(
        "ERROR OBTENIENDO EPISODIOS TMDB:",
        error.message
      );
    }

    const videos = tmdbEpisodes.map(
      (episode, index) => {

        const episodeNumber =
          Number(episode.episode) ||
          index + 1;

        return {
          id:
            `super-sentai-flashman:1:${episodeNumber}`,

          title:
            episode.title ||
            `Episodio ${episodeNumber}`,

          name:
            episode.name ||
            episode.title ||
            `Episodio ${episodeNumber}`,

          season: 1,

          episode:
            episodeNumber,

          released:
            episode.released ||
            null,

          thumbnail:
            episode.thumbnail ||
            metadata.background ||
            metadata.poster,

          overview:
            episode.overview ||
            episode.description ||
            "",

          description:
            episode.description ||
            episode.overview ||
            "",

          runtime:
            episode.runtime ||
            30,

          rating:
            episode.rating ||
            null,

          votes:
            episode.votes ||
            0,

          imdbRating:
            episode.imdbRating ||
            episode.rating ||
            null
        };
      }
    );

    /*
     * Construimos la metadata final.
     *
     * Conservamos toda la información de la serie
     * generada en metadata.js.
     *
     * Solo sustituimos videos por la versión
     * compatible con el flujo de Nuvio/Stremio.
     */

    /*
     * ========================================================
     * METADATA FINAL
     * ========================================================
     *
     * Nuvio recibe nuestra metadata directamente.
     *
     * El ID público de la serie es 70787.
     *
     * La reproducción continúa utilizando nuestros IDs
     * internos super-sentai-flashman:1:X.
     * ========================================================
     */

    /*
     * Conservamos nuestros videos personalizados.
     */

    const finalMeta = {
      ...metadata,

      /*
       * El ID que Nuvio pidió debe coincidir con el ID público.
       */
      id: "70787",

      /*
       * Nuestros episodios conservan IDs internos para Drive.
       */
      videos,

      /*
       * ========================================================
       * MEDIA PERSONALIZADO DEL ADDON
       * ========================================================
       *
       * Estos dos campos son deliberadamente los ÚLTIMOS.
       *
       * No permitimos que ninguna metadata externa sustituya:
       *
       * - nuestro background
       * - nuestro trailer de YouTube
       *
       * metadata.js sigue siendo la fuente manual de estos datos.
       * ========================================================
       */

      background:
        metadata.background,

      trailerYtIds:
        Array.isArray(metadata.trailerYtIds)
          ? metadata.trailerYtIds
          : []
    };


    console.log(
      "META ENVIADA:",
      JSON.stringify({
        id:
          finalMeta.id,

        type:
          finalMeta.type,

        name:
          finalMeta.name,

        videos:
          finalMeta.videos.length,

        firstEpisode:
          finalMeta.videos[0]?.id,

        lastEpisode:
          finalMeta.videos[
            finalMeta.videos.length - 1
          ]?.id
      })
    );


    return res.json({
      meta: finalMeta
    });

  } catch (error) {

    console.error(
      "ERROR META:",
      error
    );

    return res.status(500).json({
      error: error.message,
      meta: null
    });
  }
});


/*
 * ============================================================
 * STREAM
 * ============================================================
 *
 * Nuvio/Stremio debe solicitar:
 *
 * /stream/series/70787:1:1.json
 *
 * /stream/series/70787:1:2.json
 *
 * etc.
 *
 * getStreams() recibe ese ID completo y lo resuelve
 * contra Google Drive.
 *
 * ============================================================
 */

app.get("/stream/:type/:id.json", async (req, res) => {
  try {

    const { type, id } =
      req.params;

    console.log(
      "STREAM PEDIDO:",
      type,
      id
    );


    /*
     * El recurso stream está declarado para series.
     */

    if (type !== "series") {

      console.log(
        "STREAM RECHAZADO - tipo:",
        type
      );

      return res.json({
        streams: []
      });
    }


    /*
     * Validamos que sea uno de nuestros IDs.
     */

    if (
      !id.startsWith(
        "super-sentai-flashman:"
      )
    ) {

      console.log(
        "STREAM RECHAZADO - ID:",
        id
      );

      return res.json({
        streams: []
      });
    }


    /*
     * Resolver episodio → Google Drive.
     */

    const streams =
      await getStreams(id);


    console.log(
      "STREAM ENVIADO:",
      JSON.stringify({
        id,
        streams: streams.length
      })
    );


    return res.json({
      streams
    });

  } catch (error) {

    console.error(
      "ERROR STREAM:",
      error
    );

    return res.status(500).json({
      error: error.message,
      streams: []
    });
  }
});


/*
 * ============================================================
 * INICIO DEL SERVIDOR
 * ============================================================
 */

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `Super Sentai Addon ejecutándose en http://127.0.0.1:${PORT}`
    );

  }
);
