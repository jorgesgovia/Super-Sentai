import express from "express";
import cors from "cors";

import {
  getMetadata
} from "./src/metadata.js";

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

VOLVEMOS AL ESTADO ORIGINAL:

SOLAMENTE SERIES.

NO:
episode
videos
episode metadata
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

            /*
             * EXACTAMENTE COMO LOS QUEREMOS.
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

SIN videos[].

SIN rutas especiales de episodios.

ESTO NOS PERMITE COMPROBAR SI LOS EPISODIOS
SON LOS QUE ESTÁN INTERFIRIENDO.
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
        " META SERIES — EXPERIMENTO 10"
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
        "Episodes:",
        "DESHABILITADOS PARA LA PRUEBA"
      );

      res.json({

        meta:
          metadata

      });

    } catch (error) {

      console.error(
        "META SERIES ERROR:",
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
IMPORTANTE
============================================================

NO CREAMOS:

/meta/episode/...

NO CREAMOS:

videos[]

NO DECLARAMOS:

episode

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
      " EXPERIMENTO 10"
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
      " EPISODIOS: DESHABILITADOS"
    );

    console.log(
      " STREAMS: DESHABILITADOS PARA LA PRUEBA"
    );

    console.log(
      "======================================"
    );

  }
);
