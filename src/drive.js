import fs from "fs";

const HTML_FILE = "/tmp/flashman-drive.html";

function decodeHtmlEntities(text) {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function extractDriveEpisodes() {
  const raw = fs.readFileSync(HTML_FILE, "utf8");
  const data = decodeHtmlEntities(raw);

  const results = new Map();

  const regex =
    /data-id="([^"]+)"[\s\S]{0,3000}?aria-label="([^"]+\.mp4)[^"]*"/gi;

  let match;

  while ((match = regex.exec(data)) !== null) {
    const fileId = match[1];
    const filename = match[2];

    const episodeMatch = filename.match(/\bE(\d{1,2})\b/i);

    if (!episodeMatch) continue;

    const episode = Number(episodeMatch[1]);

    if (episode < 1 || episode > 50) continue;

    if (!results.has(episode)) {
      results.set(episode, {
        episode,
        filename,
        fileId
      });
    }
  }

  return [...results.values()]
    .sort((a, b) => a.episode - b.episode);
}