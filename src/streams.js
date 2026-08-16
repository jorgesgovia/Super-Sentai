import {
  extractDriveEpisodes,
  getDriveStream
} from "./drive.js";

export async function getStreams(episodeId) {
  try {
    /*
     * Nuvio puede enviar:
     *
     *   70787:1
     *   70787:2
     *
     * o un ID con temporada:
     *
     *   70787:1:1
     *   70787:1:2
     *
     * Aceptamos ambos formatos.
     */

    const parts = String(episodeId).split(":");

    if (parts.length < 2) {
      return [];
    }

    let season = 1;
    let episode;

    if (parts.length === 2) {
      // 70787:1
      episode = Number(parts[1]);
    } else {
      // 70787:1:1
      season = Number(parts[1]);
      episode = Number(parts[2]);
    }

    if (!Number.isInteger(episode) || episode < 1) {
      return [];
    }

    if (season !== 1) {
      return [];
    }

    const episodes = await extractDriveEpisodes();

    const video = episodes.find(
      (x) => Number(x.episode) === episode
    );

    if (!video) {
      console.log(`No se encontró episodio ${episode} en Google Drive.`);
      return [];
    }

    console.log(
      `Stream episodio ${episode}: fileId=${video.fileId}`
    );

    const streamUrl = await getDriveStream(video.fileId);

    if (!streamUrl) {
      console.log(
        `No se pudo obtener URL de Google Drive para episodio ${episode}.`
      );
      return [];
    }

    return [
      {
        name: "Google Drive",
        title: `Episodio ${episode} • Google Drive`,
        url: streamUrl,
        type: "video/mp4"
      }
    ];

  } catch (error) {
    console.error(
      `Error obteniendo stream para ${episodeId}:`,
      error.message
    );

    return [];
  }
}
