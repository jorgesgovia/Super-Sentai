export async function getMdbListData(imdbId) {
  const apiKey = process.env.MDBLIST_API_KEY;

  if (!apiKey) {
    throw new Error("Falta MDBLIST_API_KEY");
  }

  if (!imdbId) {
    return null;
  }

  const url =
    `https://api.mdblist.com/imdb/show/${encodeURIComponent(imdbId)}/` +
    `?apikey=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`MDBList respondió ${response.status}`);
  }

  return await response.json();
}