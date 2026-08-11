export async function getTmdbSeries(tmdbId) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("Falta TMDB_API_KEY");
  }

  const url =
    `https://api.themoviedb.org/3/tv/${tmdbId}` +
    `?api_key=${apiKey}` +
    `&language=es-MX` +
    `&append_to_response=credits,external_ids,videos`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `TMDB respondió ${response.status}`
    );
  }

  return await response.json();
}
export async function getTmdbSeason(tmdbId, seasonNumber) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("Falta TMDB_API_KEY");
  }

  const url =
    `https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}` +
    `?api_key=${apiKey}` +
    `&language=es-MX`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB temporada respondió ${response.status}`);
  }

  return await response.json();
}
