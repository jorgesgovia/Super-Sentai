import express from "express";
import cors from "cors";

import {
  getMetadata,
  getEpisodes,
  getEpisode
} from "./src/metadata.js";

import {
  getStreams
} from "./src/streams.js";

const app =
  express();

app.use(
  cors()
);

app.use(
  express.json()
);

const PORT =
  process.env.PORT || 7070;

const ADDON_ID =
  "org.super-sentai.addon";

const ADDON_NAME =
  "Super Sentai Addon";

function noCache(res) {

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

}

/*
============================================================
ROOT
============================================================
*/

app.get(
  "/",
  (req, res) => {

    res.json({

      addon:
        ADDON_NAME,

      status:
        "ok"

    });

  }
);

/*
============================================================
MANIFEST
============================================================
*/

app.get(
  "/manifest.json",
  (req, res) => {

    res.json({

      id:
        ADDON_ID,

      version:
        "1.0.0",

      name:
        ADDON_NAME,

      description:
        "Super Sentai Addon para Nuvio",

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
          type:
            "series",

          id:
            "super-sentai",

          name:
            "Super Sentai"

        }

      ]

    });

  }
);

/*
============================================================
CATALOG
============================================================
*/

app.get(
  "/catalog/:type/:id.json",
  async (req, res) => {

    try {

      const metadata =
        await getMetadata();

      noCache(res);

      /*
       * SIN videos[].
       */

      res.json({

        metas: [

          {
            id:
              metadata.id,

            type:
              metadata.type,

            name:
              metadata.name,

            poster:
              metadata.poster,

            background:
              metadata.background,

            description:
              metadata.description,

            genres:
              metadata.genres,

            year:
              metadata.year,

            releaseInfo:
              metadata.releaseInfo,

            released:
              metadata.released,

            imdb_id:
              metadata.imdb_id,

            network:
              metadata.network,

            productionCompany:
              metadata.productionCompany
          }

        ]

      });

    } catch (error) {

      console.error(
        "CATALOG ERROR:",
        error
      );

      res.status(500).json({
        metas: []
      });

    }

  }
);

/*
============================================================
META SERIES
============================================================

ESTA ES LA RESPUESTA CRÍTICA.

NO VIDEOS.

NO EPISODES.

SOLO METADATA DE SERIE.

Esto debe mantener navegables:

TV Asahi
Toei Company
============================================================
*/

app.get(
  "/meta/series/:id.json",
  async (req, res) => {

    try {

      const metadata =
        await getMetadata();

      noCache(res);

      console.log("");
      console.log(
        "======================================"
      );

      console.log(
        " META SERIES"
      );

      console.log(
        "======================================"
      );

      console.log(
        "ID:",
        req.params.id
      );

      console.log(
        "Network:",
        metadata.network
      );

      console.log(
        "Production:",
        metadata.productionCompany
      );

      console.log(
        "VIDEOS EN META:",
        "NO"
      );

      res.json({

        meta:
          metadata

      });

    } catch (error) {

      console.error(
        "META ERROR:",
        error
      );

      res.status(500).json({

        meta: {}

      });

    }

  }
);

/*
============================================================
NUEVO RECURSO SEPARADO DE EPISODIOS
============================================================

IMPORTANTE:

Los episodios NO están dentro de /meta/series/70787.json.

Los ponemos en una respuesta independiente.

============================================================
*/

app.get(
  "/meta/series/:id/episodes.json",
  async (req, res) => {

    try {

      const episodes =
        await getEpisodes();

      noCache(res);

      console.log("");
      console.log(
        "======================================"
      );

      console.log(
        " EPISODES REQUEST"
      );

      console.log(
        "======================================"
      );

      console.log(
        "Series:",
        req.params.id
      );

      console.log(
        "Episodes:",
        episodes.length
      );

      res.json({

        episodes:
          episodes

      });

    } catch (error) {

      console.error(
        "EPISODES ERROR:",
        error
      );

      res.status(500).json({

        episodes: []

      });

    }

  }
);

/*
============================================================
EPISODIO INDIVIDUAL
============================================================
*/

app.get(
  "/meta/episode/:id.json",
  async (req, res) => {

    try {

      const match =
        String(
          req.params.id
        ).match(
          /^70787:1:(\d+)$/
        );

      if (!match) {

        return res.status(404).json({

          meta: {}

        });

      }

      const number =
        Number(match[1]);

      const episode =
        await getEpisode(
          number
        );

      if (!episode) {

        return res.status(404).json({

          meta: {}

        });

      }

      noCache(res);

      res.json({

        meta:
          episode

      });

    } catch (error) {

      console.error(
        "EPISODE META ERROR:",
        error
      );

      res.status(500).json({

        meta: {}

      });

    }

  }
);

/*
============================================================
META FALLBACK
============================================================
*/

app.get(
  "/meta/:type/:id.json",
  async (req, res) => {

    try {

      /*
       * Solo respondemos con la metadata limpia
       * de la serie.
       */

      const metadata =
        await getMetadata();

      noCache(res);

      res.json({

        meta:
          metadata

      });

    } catch (error) {

      console.error(
        "META FALLBACK ERROR:",
        error
      );

      res.status(500).json({

        meta: {}

      });

    }

  }
);

/*
============================================================
STREAM
============================================================
*/

app.get(
  "/stream/:type/:id.json",
  async (req, res) => {

    try {

      const requestedId =
        req.params.id;

      console.log("");
      console.log(
        "======================================"
      );

      console.log(
        " STREAM REQUEST"
      );

      console.log(
        "======================================"
      );

      console.log(
        "Type:",
        req.params.type
      );

      console.log(
        "ID:",
        requestedId
      );

      /*
       * EPISODIO
       */

      if (
        /^70787:1:\d+$/.test(
          requestedId
        )
      ) {

        console.log(
          "DRIVE EPISODE STREAM"
        );

        const streams =
          await getStreams(
            requestedId
          );

        return res.json({

          streams:
            Array.isArray(
              streams
            )
              ? streams
              : []

        });

      }

      /*
       * SERIE
       */

      if (
        requestedId ===
        "70787"
      ) {

        console.log(
          "SERIES STREAM REQUEST"
        );

        const streams =
          await getStreams(
            requestedId
          );

        return res.json({

          streams:
            Array.isArray(
              streams
            )
              ? streams
              : []

        });

      }

      /*
       * FALLBACK
       */

      const streams =
        await getStreams(
          requestedId
        );

      res.json({

        streams:
          Array.isArray(
            streams
          )
            ? streams
            : []

      });

    } catch (error) {

      console.error(
        "STREAM ERROR:",
        error
      );

      res.json({

        streams: []

      });

    }

  }
);

/*
============================================================
START
============================================================
*/

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log("");

    console.log(
      "======================================"
    );

    console.log(
      " Super Sentai Addon"
    );

    console.log(
      " EXPERIMENTO 12"
    );

    console.log(
      " STATUS: ONLINE"
    );

    console.log(
      " SERIES: Choushinsei Flashman"
    );

    console.log(
      " ID: 70787"
    );

    console.log(
      " IMDb: tt0090407"
    );

    console.log(
      " NETWORK: TV Asahi"
    );

    console.log(
      " PRODUCTION: Toei Company"
    );

    console.log(
      " EPISODES: SEPARADOS"
    );

    console.log(
      " STREAMS: GOOGLE DRIVE"
    );

    console.log(
      "======================================"

    );

  }
);
