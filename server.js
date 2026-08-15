import express from "express";
import cors from "cors";

import {
  getMetadata
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
META
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
        " META SERIES — EXPERIMENTO 13"
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
        "IMDb:",
        metadata.imdb_id
      );

      console.log(
        "Videos:",
        metadata.videos.length
      );

      console.log(
        "Video 1:",
        metadata.videos[0].id
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
META FALLBACK
============================================================
*/

app.get(
  "/meta/:type/:id.json",
  async (req, res) => {

    try {

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

ACEPTAMOS DOS FORMATOS:

70787:1:N

tt0090407:1:N

Y AMBOS TERMINAN EN EL MISMO
STREAM DE GOOGLE DRIVE.
============================================================
*/

app.get(
  "/stream/:type/:id.json",
  async (req, res) => {

    try {

      let requestedId =
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
        "TYPE:",
        req.params.type
      );

      console.log(
        "REQUESTED:",
        requestedId
      );


      /*
       * ====================================================
       * IMDb episode ID
       * ====================================================
       */

      const imdbMatch =
        requestedId.match(
          /^tt0090407:1:(\d+)$/
        );

      if (imdbMatch) {

        const episode =
          Number(
            imdbMatch[1]
          );

        const driveId =
          `70787:1:${episode}`;

        console.log(
          "IMDb EPISODE:",
          requestedId
        );

        console.log(
          "DRIVE ID:",
          driveId
        );

        requestedId =
          driveId;

      }


      /*
       * ====================================================
       * DRIVE EPISODE ID
       * ====================================================
       */

      if (
        /^70787:1:\d+$/.test(
          requestedId
        )
      ) {

        const streams =
          await getStreams(
            requestedId
          );

        console.log(
          "STREAMS:",
          Array.isArray(streams)
            ? streams.length
            : 0
        );

        return res.json({

          streams:
            Array.isArray(streams)
              ? streams
              : []

        });

      }


      /*
       * ====================================================
       * SERIE
       * ====================================================
       */

      const streams =
        await getStreams(
          requestedId
        );

      res.json({

        streams:
          Array.isArray(streams)
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
      " EXPERIMENTO 13"
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
      " EPISODES: IMDb IDs"
    );

    console.log(
      " STREAMS: Google Drive"
    );

    console.log(
      "======================================"

    );

  }
);
