const FOLDER_ID = "1PXkjbU32tpllgv6K-z-tbZuUyjDZ6zS6";

const FOLDER_URL =
  `https://drive.google.com/drive/folders/${FOLDER_ID}?hl=es`;

function decodeHtmlEntities(text) {
  return text
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
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

  // En el HTML de Drive:
  // aria-label="... E01 ...mp4..."
  // ...
  // data-id="FILE_ID"
  const regex =
    /aria-label="([^"]+\bE(\d{1,2})\b[^"]+\.mp4)[^"]*"[\s\S]{0,3000}?data-id="([^"]+)"/gi;

  let match;

  while ((match = regex.exec(data)) !== null) {
    const filename = match[1];
    const episode = Number(match[2]);
    const fileId = match[3];

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
