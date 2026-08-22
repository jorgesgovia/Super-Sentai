const FLASHMAN_FOLDER_ID =
  "1PXkjbU32tpllgv6K-z-tbZuUyjDZ6zS6";

const MASKMAN_FOLDER_ID =
  "1bWvwhziUoL9QZHuFJDA9ys9ij9iChVXG";


function decodeHtmlEntities(text) {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}


async function extractFromFolder(folderId, maxEpisode) {

  const folderUrl =
    `https://drive.google.com/drive/folders/${folderId}?hl=es`;

  const response = await fetch(folderUrl);

  if (!response.ok) {
    throw new Error(
      `Google Drive respondió ${response.status}`
    );
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

    const episodeMatch =
      filename.match(/\bE(\d{1,2})\b/i);

    if (!episodeMatch) continue;

    const episode =
      Number(episodeMatch[1]);

    if (
      episode < 1 ||
      episode > maxEpisode
    ) {
      continue;
    }

    if (!results.has(episode)) {
      results.set(episode, {
        episode,
        filename,
        fileId
      });
    }
  }

  return [...results.values()]
    .sort((a, b) =>
      a.episode - b.episode
    );
}


export async function extractDriveEpisodes(seriesId = "70787") {

  if (String(seriesId) === "53129") {
    return extractFromFolder(
      MASKMAN_FOLDER_ID,
      51
    );
  }

  return extractFromFolder(
    FLASHMAN_FOLDER_ID,
    50
  );
}


export async function extractMaskmanEpisodes() {
  return extractFromFolder(
    MASKMAN_FOLDER_ID,
    51
  );
}


export async function getDriveStream(fileId) {

  const url =
    `https://drive.usercontent.google.com/download` +
    `?id=${encodeURIComponent(fileId)}` +
    `&export=download`;

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Google Drive respondió ${response.status}`
    );
  }

  const html =
    await response.text();

  const uuidMatch =
    html.match(
      /name="uuid"\s+value="([^"]+)"/i
    );

  if (!uuidMatch) {
    throw new Error(
      "Google Drive no proporcionó UUID"
    );
  }

  const uuid =
    uuidMatch[1];

  return (
    `https://drive.usercontent.google.com/download` +
    `?id=${encodeURIComponent(fileId)}` +
    `&export=download` +
    `&confirm=t` +
    `&uuid=${encodeURIComponent(uuid)}`
  );
}


export async function getMaskmanStream(fileId) {
  return getDriveStream(fileId);
}
