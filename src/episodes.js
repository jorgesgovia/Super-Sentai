/*
============================================================
SUPER SENTAI ADDON
EPISODES.JS

ARCHIVO INDEPENDIENTE DE METADATA.

Aquí vive exclusivamente la información de episodios.

NO modifica metadata.js.
NO modifica streams.js.

TMDB:
70787

SERIE:
Choushinsei Flashman

============================================================
*/


const EPISODE_COUNT =
  50;


/*
============================================================
GENERADOR DE EPISODIOS
============================================================

De momento no inventamos títulos ni sinopsis.

El objetivo de este archivo es separar completamente
la estructura episódica de metadata.js.

Los datos reales pueden incorporarse después mediante
TMDB/Wikidata/u otra fuente.

============================================================
*/

export function getEpisodes() {

  const episodes = [];


  for (
    let episode = 1;
    episode <= EPISODE_COUNT;
    episode++
  ) {

    episodes.push({

      id:
        `70787:1:${episode}`,

      type:
        "series",

      name:
        `Choushinsei Flashman ${episode}`,

      season:
        1,

      episode:

        episode

    });

  }


  return episodes;

}


/*
============================================================
EPISODIO INDIVIDUAL
============================================================
*/

export function getEpisode(
  season,
  episode
) {

  const s =
    Number(season);

  const e =
    Number(episode);


  if (
    s !== 1 ||
    e < 1 ||
    e > EPISODE_COUNT
  ) {

    return null;

  }


  return {

    id:
      `70787:${s}:${e}`,

    type:
      "series",

    name:
      `Choushinsei Flashman ${e}`,

    season:
      s,

    episode:
      e

  };

}
