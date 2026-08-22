import {
  extractDriveEpisodes,
  getDriveStream,
  extractMaskmanEpisodes,
  getMaskmanStream
} from "./drive.js";

export async function getStreams(episodeId) {

  const match = episodeId.match(/:(\d+):(\d+)$/);

  if (!match) {
    return [];
  }

  const seriesId = episodeId.split(":")[0];

  const season = Number(match[1]);
  const episode = Number(match[2]);

  if (season !== 1) {
    return [];
  }

  // ==========================================================
  // FLASHMAN
  // ==========================================================

  if (seriesId === "70787") {

    const episodes =
      await extractDriveEpisodes();

    const video =
      episodes.find(
        (x) => x.episode === episode
      );

    if (!video) {
      return [];
    }

    const streamUrl =
      await getDriveStream(video.fileId);

    return [
      {
        name: "Google Drive",
        title:
          `Episodio ${episode} • Google Drive`,
        url: streamUrl,
        type: "video/mp4"
      }
    ];
  }

  // ==========================================================
  // HIKARI SENTAI MASKMAN
  // ==========================================================

  if (seriesId === "hikari-sentai-maskman") {

    const episodes =
      await extractMaskmanEpisodes();

    const video =
      episodes.find(
        (x) => x.episode === episode
      );

    if (!video) {
      return [];
    }

    const streamUrl =
      await getMaskmanStream(video.fileId);

    return [
      {
        name: "Google Drive",
        title:
          `Episodio ${episode} • Google Drive`,
        url: streamUrl,
        type: "video/mp4"
      }
    ];
  }

  return [];
}

