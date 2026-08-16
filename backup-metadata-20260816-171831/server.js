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
        "drive"

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

Metadata actual:

✓ TMDB
✓ IMDb rating
✓ background
✓ poster
✓ logo
✓ trailer

Y AHORA:

✓ videos desde Drive

IMPORTANTE:

Los episodios NO se construyen en metadata.js.

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
        "TMDB:",
        metadata.id
      );

      console.log(
        "Network:",
        "EXTERNAL"
      );

      console.log(
        "Production:",
        "EXTERNAL"
      );


      /*
       * Obtener episodios directamente desde Drive
       */

      let videos = [];


      try {

        videos =
          await getEpisodes();


        console.log(
          "VIDEOS EN META:",
          videos.length
        );


      } catch (episodeError) {

        console.error(
          "EPISODE DISCOVERY ERROR:",
          episodeError
        );

        videos = [];

      }


      /*
       * Metadata base
       */

      const meta = {

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

      };


      /*
       * ====================================================
       * EPISODIOS
       * ====================================================
       *
       * Solo agregamos videos si Drive realmente encontró
       * episodios.
       *
       * Así evitamos enviar una lista vacía.
       *
       * ====================================================
       */

      if (
        videos.length > 0
      ) {

        meta.videos =
          videos;

      }


      res.json({

        meta

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
EPISODES ENDPOINT
============================================================

Se conserva para pruebas.

Nuvio no necesariamente lo consume.

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


      if (
        id === "70787"
      ) {

        const episodes =
          await getEpisodes();


        console.log(
          "EPISODES:",
          episodes.length
        );


        return res.json({

          episodes

        });

      }


      const match =
        id.match(
          /^70787:(\d+):(\d+)$/
        );


      if (match) {

        const episode =
          await getEpisode(
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

Aquí recuperamos la lógica del experimento:

"fallback series streams through episode ids"

Cuando Nuvio pide:

/stream/series/70787.json

generamos:

70787:1:1
70787:1:2
70787:1:3
...

y consultamos cada episodio.

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
        "Requested ID:",
        requestedId
      );


      /*
       * ====================================================
       * FALLBACK DE SERIE
       * ====================================================
       */

      if (
        req.params.type === "series" &&
        requestedId === "70787"
      ) {

        console.log(
          "SERIES REQUEST DETECTED"
        );

        console.log(
          "Buscando streams de los episodios reales de Drive..."
        );


        const episodes =
          await getEpisodes();


        console.log(
          "EPISODIOS DRIVE:",
          episodes.length
        );


        const streams = [];


        for (
          const episode
          of episodes
        ) {

          const episodeId =
            episode.id;


          console.log(
            "Consultando:",
            episodeId
          );


          const result =
            await getStreams(
              episodeId
            );


          if (
            Array.isArray(result) &&
            result.length > 0
          ) {

            console.log(
              "ENCONTRADOS:",
              episodeId,
              result.length
            );


            for (
              const stream
              of result
            ) {

              streams.push({

                ...stream,

                title:
                  `Episodio ${episode.episode} • Google Drive`,

                name:
                  "Google Drive"

              });

            }

          } else {

            console.log(
              "SIN STREAM:",
              episodeId
            );

          }

        }


        console.log(
          "TOTAL STREAMS:",
          streams.length
        );


        return res.json({

          streams

        });

      }


      /*
       * ====================================================
       * EPISODIO INDIVIDUAL
       * ====================================================
       */

      let internalId =
        requestedId;


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
      " EXPERIMENTO 18"
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
      "EPISODES: DRIVE"
    );

    console.log(
      "SERIES STREAM FALLBACK: ENABLED"
    );

    console.log(
      "STREAM SOURCE: GOOGLE DRIVE"
    );

    console.log(
      "======================================"

    );

  }
);
