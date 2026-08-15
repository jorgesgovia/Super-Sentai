import express from "express";
import cors from "cors";

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

      tmdb_id:
        "70787"

    });

  }
);


/*
============================================================
MANIFEST
============================================================

El addon NO ofrece metadata.

El identificador del contenido es TMDB:

70787

La función principal es STREAM.

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
        "Super Sentai stream provider",

      resources: [
        "stream"
      ],

      types: [
        "series"
      ]

    });

  }
);


/*
============================================================
STREAM
============================================================

TMDB:

70787:1:1
70787:1:2
70787:1:3
...

Estos IDs se pasan directamente a streams.js.

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
        "TYPE:",
        req.params.type
      );

      console.log(
        "ID:",
        requestedId
      );


      /*
       * ====================================================
       * TMDB EPISODE
       * ====================================================
       */

      const tmdbEpisode =
        requestedId.match(
          /^70787:(\d+):(\d+)$/
        );


      if (tmdbEpisode) {

        const season =
          Number(
            tmdbEpisode[1]
          );

        const episode =
          Number(
            tmdbEpisode[2]
          );


        console.log(
          "TMDB SERIES ID:",
          "70787"
        );

        console.log(
          "SEASON:",
          season
        );

        console.log(
          "EPISODE:",
          episode
        );


        /*
         * El identificador ya coincide con
         * el sistema interno de Drive.
         */

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
      " TMDB ONLY"
    );

    console.log(
      " STATUS: ONLINE"
    );

    console.log(
      " TMDB ID: 70787"
    );

    console.log(
      " IMDb: NONE"
    );

    console.log(
      " CUSTOM METADATA: NONE"
    );

    console.log(
      " VIDEOS: NONE"
    );

    console.log(
      " EPISODES: NUVIO/TMDB"
    );

    console.log(
      " STREAMS: GOOGLE DRIVE"
    );

    console.log(
      "======================================"

    );

  }
);
