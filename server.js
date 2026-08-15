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
        "ok",

      metadataProvider:
        "external",

      source:
        "TMDB",

      tmdbId:
        "70787"

    });

  }
);


/*
============================================================
MANIFEST
============================================================

IMPORTANTE:

Sí mantenemos CATALOG + META.

Si eliminamos estos recursos, Nuvio puede no descubrir
la serie mediante nuestro addon.

Pero NO ponemos videos[].

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
        "Super Sentai stream provider using external metadata",

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

El catálogo solamente descubre la serie.

NO metadata enriquecida.

NO videos[].

============================================================
*/

app.get(
  "/catalog/:type/:id.json",
  async (req, res) => {

    try {

      const metadata =
        await getMetadata();


      console.log("");
      console.log(
        "======================================"
      );

      console.log(
        " CATALOG"
      );

      console.log(
        "======================================"
      );

      console.log(
        "TMDB:",
        metadata.id
      );


      res.json({

        metas: [

          {

            id:
              metadata.id,

            type:
              metadata.type,

            name:
              metadata.name

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

Esta es la parte crítica.

Solo:

id
type
name

NO:

videos
network
production
poster
background
description
year
releaseInfo

La intención es que Nuvio pueda usar su metadata externa.

============================================================
*/

app.get(
  "/meta/:type/:id.json",
  async (req, res) => {

    try {

      const metadata =
        await getMetadata();


      console.log("");
      console.log(
        "======================================"
      );

      console.log(
        " META — EXTERNAL METADATA"
      );

      console.log(
        "======================================"
      );

      console.log(
        "REQUESTED:",
        req.params.id
      );

      console.log(
        "RETURNING TMDB:",
        metadata.id
      );

      console.log(
        "VIDEOS:",
        "NONE"
      );

      console.log(
        "CUSTOM METADATA:",
        "NONE"
      );


      res.json({

        meta: {

          id:
            metadata.id,

          type:
            metadata.type,

          name:
            metadata.name

        }

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
STREAM
============================================================

ACEPTAMOS:

70787:1:N

tt0090407:1:N

y otros formatos compatibles.

Nuvio puede utilizar TMDB o IMDb dependiendo de
su proveedor externo.

Nosotros no necesitamos saber cuál usa.

============================================================
*/

app.get(
  "/stream/:type/:id.json",
  async (req, res) => {

    try {

      const requestedId =
        req.params.id;


      let internalId =
        requestedId;


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
        requestedId
      );


      /*
       * ====================================================
       * TMDB
       *
       * 70787:1:23
       * ====================================================
       */

      const tmdbMatch =
        requestedId.match(
          /^70787:(\d+):(\d+)$/
        );


      if (tmdbMatch) {

        const season =
          Number(
            tmdbMatch[1]
          );

        const episode =
          Number(
            tmdbMatch[2]
          );


        internalId =
          `70787:${season}:${episode}`;


        console.log(
          "TMDB EPISODE"
        );

        console.log(
          "SEASON:",
          season
        );

        console.log(
          "EPISODE:",
          episode
        );

      }


      /*
       * ====================================================
       * IMDb
       *
       * tt0090407:1:23
       *
       * Solo lo aceptamos como compatibilidad.
       *
       * NO se utiliza para metadata.
       * ====================================================
       */

      const imdbMatch =
        requestedId.match(
          /^tt0090407:(\d+):(\d+)$/
        );


      if (imdbMatch) {

        const season =
          Number(
            imdbMatch[1]
          );

        const episode =
          Number(
            imdbMatch[2]
          );


        internalId =
          `70787:${season}:${episode}`;


        console.log(
          "EXTERNAL IMDb EPISODE DETECTED"
        );

        console.log(
          "CONVERTED TO:",
          internalId
        );

      }


      /*
       * ====================================================
       * LLAMADA A DRIVE
       * ====================================================
       */

      const streams =
        await getStreams(
          internalId
        );


      console.log(
        "STREAMS FOUND:",
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
      " EXPERIMENTO 15"
    );

    console.log(
      " STATUS: ONLINE"
    );

    console.log(
      "======================================"
    );

    console.log(
      "TMDB ID: 70787"
    );

    console.log(
      "IMDb METADATA: NO"
    );

    console.log(
      "CUSTOM METADATA: MINIMAL"
    );

    console.log(
      "VIDEOS: NONE"
    );

    console.log(
      "EPISODES: EXTERNAL"
    );

    console.log(
      "STREAM SOURCE: GOOGLE DRIVE"
    );

    console.log(
      "======================================"
    );

  }
);
