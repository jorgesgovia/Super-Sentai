import {
  extractDriveEpisodes,
  extractMaskmanEpisodes,
  getDriveStream,
  getMaskmanStream
} from "./drive.js";


export async function getStreams(episodeId) {

  try {

    const parts =
      String(episodeId).split(":");

    if (parts.length < 2) {
      return [];
    }

    const seriesId =
      parts[0];

    let season = 1;
    let episode;

    if (parts.length === 2) {

      episode =
        Number(parts[1]);

    } else {

      season =
        Number(parts[1]);

      episode =
        Number(parts[2]);
    }

    if (
      season !== 1 ||
      !Number.isInteger(episode) ||
      episode < 1
    ) {
      return [];
    }


    // ==========================================
    // FLASHMAN
    // ==========================================

    if (seriesId === "70787") {

      if (episode > 50) {
        return [];
      }

      const episodes =
        await extractDriveEpisodes("70787");

      const video =
        episodes.find(
          x => Number(x.episode) === episode
        );

      if (!video) {
        console.log(
          `No se encontró Flashman E${episode}`
        );
        return [];
      }

      const streamUrl =
        await getDriveStream(
          video.fileId
        );

      return [
        {
          name: "Google Drive",
          title:
            `Choushinsei Flashman E${episode} • Google Drive`,
          url: streamUrl,
          type: "video/mp4"
        }
      ];
    }


    // ==========================================
    // HIKARI SENTAI MASKMAN
    // ==========================================

    if (seriesId === "53129") {

      if (episode > 51) {
        return [];
      }

      const episodes =
        await extractMaskmanEpisodes();

      const video =
        episodes.find(
          x => Number(x.episode) === episode
        );

      if (!video) {
        console.log(
          `No se encontró Maskman E${episode}`
        );
        return [];
      }

      const streamUrl =
        await getMaskmanStream(
          video.fileId
        );

      return [
        {
          name: "Google Drive",
          title:
            `Hikari Sentai Maskman E${episode} • Google Drive`,
          url: streamUrl,
          type: "video/mp4"
        }
      ];
    }


    return [];

  } catch (error) {

    console.error(
      `Error obteniendo stream para ${episodeId}:`,
      error.message
    );

    return [];
  }
}
