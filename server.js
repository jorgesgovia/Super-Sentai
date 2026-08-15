import express from "express";
import cors from "cors";

import {
  getMetadata
} from "./src/metadata.js";

import {
  getStreams
} from "./src/streams.js";

const app = express();

app.use(cors());
app.use(express.json());

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

app.get("/", (req, res) => {
  res.json({
    addon: ADDON_NAME,
    status: "ok"
  });
});

/*
============================================================
MANIFEST
============================================================
*/

app.get("/manifest.json", (req, res) => {

  res.json({

    id: ADDON_ID,

    version: "1.0.0",

    name: ADDON_NAME,

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

            /*
             * CONSERVAMOS LOS STRINGS.
             */

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
        " META SERIES — EXPERIMENTO 11"
      );

      console.log(
        "======================================"
      );

      console.log(
        "Requested:",
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
        "Videos:",
        metadata.videos.length
      );

      console.log(
        "First video:",
        JSON.stringify(
          metadata.videos[0],
          null,
          2
        )
      );

      /*
       * ENTREGAMOS LA META COMPLETA.
       *
       * videos[] es la ÚNICA estructura especial
       * añadida para los episodios.
       */

      res.json({
        meta: metadata
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
        meta: metadata
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
       * ====================================================
       * EPISODIO
       * ====================================================
       *
       * Nuvio/Stremio debe enviar:
       *
       * 70787:1:1
       * 70787:1:2
       * ...
       */

      if (
        /^70787:1:\d+$/.test(
          requestedId
        )
      ) {

        console.log(
          "EPISODE STREAM"
        );

        const streams =
          await getStreams(
            requestedId
          );

        console.log(
          "Streams:",
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
       *
       * Conservamos también esta posibilidad para que
       * el botón Reproducir de la ficha no se quede vacío.
       */

      if (
        requestedId === "70787"
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
            Array.isArray(streams)
              ? streams
              : []

        });

      }

      /*
       * ====================================================
       * FALLBACK
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
      " EXPERIMENTO 11"
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
      " EPISODES: 50"
    );

    console.log(
      " STREAMS: Google Drive"
    );

    console.log(
      "======================================"

    );

  }
);
