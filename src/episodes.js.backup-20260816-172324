import {
  extractDriveEpisodes
} from "./drive.js";


/*
============================================================
EPISODES.JS

Fuente REAL:

Google Drive

NO se escriben manualmente los 50 episodios.

drive.js descubre:

episode
filename
fileId

============================================================
*/


export async function getEpisodes() {

  const driveEpisodes =
    await extractDriveEpisodes();


  return driveEpisodes
    .sort(
      (a, b) =>
        a.episode - b.episode
    )
    .map(
      (video) => ({

        id:
          `70787:1:${video.episode}`,

        title:
          `Episodio ${video.episode}`,

        season:
          1,

        episode:
          video.episode,

        overview:
          `Choushinsei Flashman — Episodio ${video.episode}`,

        thumbnail:
          "https://image.tmdb.org/t/p/original/wyGFaD0V2bU2Q5uEtJDStZSRoG2.jpg"

      })
    );

}


export async function getEpisode(
  season,
  episode
) {

  if (
    Number(season) !== 1
  ) {

    return null;

  }


  const episodes =
    await getEpisodes();


  return (
    episodes.find(
      (x) =>
        x.episode ===
        Number(episode)
    ) || null
  );

}
