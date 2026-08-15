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

      source:
        "TMDB",

      tmdbId:
        "70787",

      externalMetadata:
        true

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

Mantenemos solamente los campos necesarios para que
Nuvio siga detectando la serie.

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
        "ID:",
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

Aquí probamos únicamente:

IMDb rating
Background

NO videos[].

NO episodios.

NO network.

NO productionCompany.

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
        " META — RATING + BACKGROUND"
      );

      console.log(
        "======================================"
      );

      console.log(
        "REQUESTED:",
        req.params.id
      );

      console.log(
        "TMDB ID:",
        metadata.id
      );

      console.log(
        "IMDb RATING:",
        metadata.imdbRating
      );

      console.log(
        "BACKGROUND:",
        metadata.background
      );

      console.log(
        "VIDEOS:",
        "NONE"
      );

      console.log(
        "EPISODES:",
        "NONE"
      );


      res.json({

        meta: {

          id:
            metadata.id,

          type:
            metadata.type,

          name:
            metadata.name,

          imdbRating:
            metadata.imdbRating,

          background:
            metadata.background

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

NO MODIFICAMOS LA LÓGICA DE DRIVE.

TMDB:
70787:1:N

IMDb:
tt0090407:1:N

Ambos terminan en:

70787:1:N

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
        "REQUESTED:",
        requestedId
      );


      /*
       * TMDB
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
       * IMDb compatibility
       *
       * NO se utiliza para metadata.
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
          "IMDb EPISODE COMPATIBILITY"
        );

        console.log(
          "CONVERTED:",
          internalId
        );

      }


      /*
       * Drive
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
      " EXPERIMENTO 16"
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
      "IMDb RATING: 8.2"
    );

    console.log(
      "BACKGROUND: ENABLED"
    );

    console.log(
      "VIDEOS: NONE"
    );

    console.log(
      "EPISODES: EXTERNAL"
    );

    console.log(
      "STREAM: GOOGLE DRIVE"
    );

    console.log(
      "======================================"
    );

  }
);
