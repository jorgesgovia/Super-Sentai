import express from "express";
import cors from "cors";

import {
  getMetadata
} from "./src/metadata.js";

import {
  getEpisodes,
  getEpisode
} from "./src/episodes.js";

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
        true,

      episodes:
        "separate"

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
        "Super Sentai Addon",

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

NO episodios aquí.

============================================================
*/

app.get(
  "/catalog/:type/:id.json",
  async (req, res) => {

    try {

      const metadata =
        await getMetadata();


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

Mantenemos exactamente la estructura que actualmente
permite:

✓ detectar serie
✓ Red
✓ Producción
✓ background
✓ IMDb rating

Agregamos:

✓ poster
✓ logo
✓ trailer

NO videos[].

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
        " META"
      );

      console.log(
        "======================================"
      );

      console.log(
        "REQUESTED:",
        req.params.id
      );

      console.log(
        "TMDB:",
        metadata.id
      );

      console.log(
        "IMDb rating:",
        metadata.imdbRating
      );

      console.log(
        "Background:",
        metadata.background
      );

      console.log(
        "Poster:",
        metadata.poster
      );

      console.log(
        "Logo:",
        metadata.logo
      );

      console.log(
        "Trailer:",
        metadata.trailer
      );

      console.log(
        "VIDEOS:",
        "NO"
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
            metadata.background,

          poster:
            metadata.poster,

          logo:
            metadata.logo,

          trailer:
            metadata.trailer

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
EPISODES — ENDPOINT SEPARADO
============================================================

IMPORTANTE:

Este endpoint NO se declara como resource del manifest.

Por lo tanto NO debería alterar la interfaz actual de Nuvio.

Lo utilizamos para comprobar y depurar nuestra estructura
episódica independientemente de metadata.

============================================================
*/

app.get(
  "/episodes/:type/:id.json",
  async (req, res) => {

    try {

      const id =
        req.params.id;


      console.log("");
      console.log(
        "======================================"
      );

      console.log(
        " EPISODES ENDPOINT"
      );

      console.log(
        "======================================"
      );

      console.log(
        "TYPE:",
        req.params.type
      );

      console.log(
        "ID:",
        id
      );


      /*
       * Serie completa
       */

      if (
        id === "70787"
      ) {

        const episodes =
          getEpisodes();


        console.log(
          "EPISODES:",
          episodes.length
        );


        return res.json({

          episodes

        });

      }


      /*
       * Episodio individual
       *
       * 70787:1:23
       */

      const match =
        id.match(
          /^70787:(\d+):(\d+)$/
        );


      if (match) {

        const episode =
          getEpisode(
            Number(match[1]),
            Number(match[2])
          );


        return res.json({

          episodes:
            episode
              ? [episode]
              : []

        });

      }


      return res.json({

        episodes: []

      });


    } catch (error) {

      console.error(
        "EPISODES ERROR:",
        error
      );


      res.json({

        episodes: []

      });

    }

  }
);


/*
============================================================
STREAM
============================================================

NO MODIFICAMOS streams.js.

Aceptamos:

70787:1:N

y:

tt0090407:1:N

El segundo únicamente como compatibilidad.

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
          "IMDb COMPATIBILITY"
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
      " EXPERIMENTO 17"
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
      "POSTER: ENABLED"
    );

    console.log(
      "LOGO: ENABLED"
    );

    console.log(
      "TRAILER: ENABLED"
    );

    console.log(
      "EPISODES: SEPARATE FILE"
    );

    console.log(
      "EPISODES IN META: NO"
    );

    console.log(
      "STREAMS: GOOGLE DRIVE"
    );

    console.log(
      "======================================"

    );

  }
);
