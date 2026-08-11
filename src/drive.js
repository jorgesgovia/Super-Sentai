const FOLDER_ID = "1PXkjbU32tpllgv6K-z-tbZuUyjDZ6zS6";

const FOLDER_URL =
  `https://drive.google.com/drive/folders/${FOLDER_ID}?hl=es`;

function decodeHtmlEntities(text) {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function extractDriveEpisodes() {
  const response = await fetch(FOLDER_URL);

  if (!response.ok) {
    throw new Error(`Google Drive respondió ${response.status}`);
  }

  const raw = await response.text();
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

export async function getDriveStream(fileId) {
  const url =
    `https://drive.usercontent.google.com/download` +
    `?id=${encodeURIComponent(fileId)}` +
    `&export=download`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google Drive respondió ${response.status}`);
  }

  const html = await response.text();

  const uuidMatch =
    html.match(/name="uuid"\s+value="([^"]+)"/i);

  if (!uuidMatch) {
    throw new Error("Google Drive no proporcionó UUID");
  }

  const uuid = uuidMatch[1];

  return (
    `https://drive.usercontent.google.com/download` +
    `?id=${encodeURIComponent(fileId)}` +
    `&export=download` +
    `&confirm=t` +
    `&uuid=${encodeURIComponent(uuid)}`
  );
}