import {
  extractDriveEpisodes,
  getDriveStream
} from "./drive.js";

export async function getStreams(episodeId) {
  const match = episodeId.match(/:(\d+):(\d+)$/);

  if (!match) {
    return [];
  }

  const season = Number(match[1]);
  const episode = Number(match[2]);

  if (season !== 1) {
    return [];
  }

  const episodes = await extractDriveEpisodes();

  const video = episodes.find(
    (x) => x.episode === episode
  );

  if (!video) {
    return [];
  }

  const streamUrl = await getDriveStream(video.fileId);

  return [
    {
      name: "Google Drive",
      title: `Episodio ${episode} • Google Drive`,
      url: streamUrl,
      type: "video/mp4"
    }
  ];
}