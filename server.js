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

IMPORTANTE:

El catálogo tampoco genera episodios.

Solo presenta la serie.

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

MUY IMPORTANTE:

NO videos[]
NO episodios
NO season/episode manuales

La respuesta queda limpia para que Nuvio pueda
hacer su propio enriquecimiento.

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
        " META SERIES — EXPERIMENTO 14"
      );

      console.log(
        "======================================"
      );

      console.log(
        "Requested:",
        req.params.id
      );

      console.log(
        "Returning ID:",
        metadata.id
      );

      console.log(
        "IMDb:",
        metadata.imdb_id
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
        "VIDEOS:",
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
META FALLBACK
============================================================

También mantenemos la ruta genérica porque algunos clientes
pueden solicitar:

/meta/series/tt0090407.json

o mediante otra combinación de parámetros.

============================================================
*/

app.get(
  "/meta/:type/:id.json",
  async (req, res) => {

    try {

      const metadata =
        await getMetadata();

      noCache(res);

      console.log("");
      console.log(
        "META FALLBACK"
      );

      console.log(
        "TYPE:",
        req.params.type
      );

      console.log(
        "ID:",
        req.params.id
      );

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
STREAM BRIDGE
============================================================

Nuvio puede pedir:

tt0090407:1:1
tt0090407:1:2
tt0090407:1:3
...

Pero tu sistema actual de Drive utiliza:

70787:1:1
70787:1:2
70787:1:3
...

Por eso hacemos una traducción INTERNA.

Nuvio nunca necesita saber que usamos 70787 internamente.

============================================================
*/

app.get(
  "/stream/:type/:id.json",
  async (req, res) => {

    try {

      const originalId =
        req.params.id;

      let internalId =
        originalId;


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
        "REQUESTED ID:",
        originalId
      );


      /*
       * ====================================================
       * IMDb → Drive
       * ====================================================
       */

      const imdbEpisode =
        originalId.match(
          /^tt0090407:(\d+):(\d+)$/
        );


      if (imdbEpisode) {

        const season =
          Number(
            imdbEpisode[1]
          );

        const episode =
          Number(
            imdbEpisode[2]
          );


        /*
         * Actualmente nuestros archivos están
         * identificados internamente como:

         * 70787:temporada:episodio
         */

        internalId =
          `70787:${season}:${episode}`;


        console.log(
          "IMDb ID DETECTADO"
        );

        console.log(
          "SEASON:",
          season
        );

        console.log(
          "EPISODE:",
          episode
        );

        console.log(
          "INTERNAL DRIVE ID:",
          internalId
        );

      }


      /*
       * ====================================================
       * TAMBIÉN ACEPTAMOS EL ID ANTIGUO
       * ====================================================
       */

      if (
        /^70787:\d+:\d+$/.test(
          originalId
        )
      ) {

        internalId =
          originalId;

        console.log(
          "LEGACY DRIVE ID DETECTADO"
        );

      }


      /*
       * ====================================================
       * LLAMADA A TU STREAMS.JS
       * ====================================================
       */

      const streams =
        await getStreams(
          internalId
        );


      console.log(
        "STREAMS ENCONTRADOS:",
        Array.isArray(streams)
          ? streams.length
          : 0
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
SERVER
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
      " EXPERIMENTO 14"
    );

    console.log(
      " STATUS: ONLINE"
    );

    console.log(
      " SERIES: Choushinsei Flashman"
    );

    console.log(
      " IMDb: tt0090407"
    );

    console.log(
      " INTERNAL ID: 70787"
    );

    console.log(
      " NETWORK: TV Asahi"
    );

    console.log(
      " PRODUCTION: Toei Company"
    );

    console.log(
      " VIDEOS EN META: NO"
    );

    console.log(
      " EPISODES: EXTERNOS"
    );

    console.log(
      " STREAM BRIDGE: IMDb → Drive"
    );

    console.log(
      "======================================"

    );

  }
);
