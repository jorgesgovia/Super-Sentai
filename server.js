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
        "ok"

    });

  }
);


/*
============================================================
MANIFEST
============================================================

La única función del addon es proporcionar streams.

No declaramos catalog ni meta.

La metadata debe venir de Nuvio/Cinemeta.

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

Aceptamos:

tt0090407:1:1
tt0090407:1:2
tt0090407:1:3
...

y también el identificador interno:

70787:1:1
70787:1:2
70787:1:3

Nuvio utiliza IMDb.

Nuestro Drive utiliza 70787.

El servidor hace la traducción.

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
       * ====================================================
       * IMDb → Drive
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
          "IMDb SERIES DETECTED"
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
          "DRIVE ID:",
          internalId
        );

      }


      /*
       * ====================================================
       * ID INTERNO ANTIGUO
       * ====================================================
       */

      if (
        /^70787:\d+:\d+$/.test(
          requestedId
        )
      ) {

        internalId =
          requestedId;

      }


      /*
       * ====================================================
       * STREAMS.JS
       * ====================================================
       */

      const streams =
        await getStreams(
          internalId
        );


      console.log(
        "STREAMS:",
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
      " STREAM ONLY"
    );

    console.log(
      " STATUS: ONLINE"
    );

    console.log(
      " IMDb: tt0090407"
    );

    console.log(
      " INTERNAL: 70787"
    );

    console.log(
      " METADATA: NUVIO"
    );

    console.log(
      " EPISODES: NUVIO"
    );

    console.log(
      " STREAMS: GOOGLE DRIVE"
    );

    console.log(
      "======================================"

    );

  }
);
