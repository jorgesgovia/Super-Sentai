import express from "express";
import cors from "cors";

import {
  getMetadata,
  getEpisodeMetadata
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

function parseEpisodeId(id) {

  const match =
    String(id).match(
      /^70787:1:(\d+)$/
    );

  if (!match) {

    return null;

  }

  return Number(
    match[1]
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

            /*
             * 🔥 ENTIDADES NUVIO
             */

            networks:
              metadata.networks,

            productionCompanies:
              metadata.productionCompanies,

            /*
             * Compatibilidad
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
        " META SERIES"
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
        JSON.stringify(
          metadata.networks
        )
      );

      console.log(
        "Production:",
        JSON.stringify(
          metadata.productionCompanies
        )
      );

      console.log(
        "Episodes:",
        metadata.videos.length
      );

      /*
       * 🔥 MUY IMPORTANTE:
       *
       * No reconstruimos la metadata.
       *
       * Entregamos el objeto completo para que Nuvio
       * reciba networks + productionCompanies + videos.
       */

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
META EPISODE
============================================================
*/

app.get(
  "/meta/episode/:id.json",
  async (req, res) => {

    try {

      const number =
        parseEpisodeId(
          req.params.id
        );

      if (!number) {

        return res.status(
          404
        ).json({

          meta: {}

        });

      }

      const metadata =
        await getEpisodeMetadata(
          number
        );

      noCache(res);

      res.json({

        meta:
          metadata

      });

    } catch (error) {

      console.error(
        "META EPISODE ERROR:",
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
        "Type:",
        req.params.type
      );

      console.log(
        "ID:",
        requestedId
      );

      console.log(
        "======================================"
      );

      /*
      ======================================================
      EPISODIO
      ======================================================
      */

      if (
        requestedId.startsWith(
          "70787:1:"
        )
      ) {

        const streams =
          await getStreams(
            requestedId
          );

        return res.json({

          streams:
            Array.isArray(
              streams
            )
              ? streams
              : []

        });

      }

      /*
      ======================================================
      SERIE
      ======================================================
      */

      if (
        requestedId ===
        "70787"
      ) {

        const allStreams = [];

        for (
          let episode = 1;
          episode <= 50;
          episode++
        ) {

          const episodeId =
            `70787:1:${episode}`;

          try {

            const streams =
              await getStreams(
                episodeId
              );

            if (
              Array.isArray(
                streams
              ) &&
              streams.length > 0
            ) {

              for (
                const stream of streams
              ) {

                allStreams.push({

                  ...stream,

                  title:
                    stream.title ||
                    `Episodio ${episode}`,

                  name:
                    stream.name ||
                    `Episodio ${episode}`,

                  season:
                    1,

                  episode:
                    episode,

                  episodeId:
                    episodeId

                });

              }

            }

          } catch (error) {

            console.error(
              "Episode stream error:",
              episodeId,
              error
            );

          }

        }

        console.log(
          "TOTAL DRIVE STREAMS:",
          allStreams.length
        );

        return res.json({

          streams:
            allStreams

        });

      }

      /*
      ======================================================
      FALLBACK
      ======================================================
      */

      const streams =
        await getStreams(
          requestedId
        );

      res.json({

        streams:
          Array.isArray(
            streams
          )
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
      " NETWORK ID: 103"
    );

    console.log(
      " NETWORK: TV Asahi"
    );

    console.log(
      " PRODUCTION ID: 5822"
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
