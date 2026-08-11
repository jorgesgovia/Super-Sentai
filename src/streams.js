import { extractDriveEpisodes } from "./drive.js";

function driveUrl(fileId) {
  return "https://drive.google.com/uc?export=download&id=" + fileId;
}

export function getStreams(episodeId) {
  const match = episodeId.match(/:(\d+):(\d+)$/);

  if (!match) {
    return [];
  }

  const season = Number(match[1]);
  const episode = Number(match[2]);

  if (season !== 1) {
    return [];
  }

  const episodes = extractDriveEpisodes();
  const video = episodes.find((x) => x.episode === episode);

  if (!video) {
    return [];
  }

  return [
    {
      name: "Google Drive",
      title: "Episodio " + episode + " • Google Drive",
      url: driveUrl(video.fileId),
      type: "video/mp4"
    }
  ];
}
