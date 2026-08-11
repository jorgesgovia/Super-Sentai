export async function getTmdbSeries(tmdbId) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("Falta TMDB_API_KEY");
  }

  const url =
    `https://api.themoviedb.org/3/tv/${tmdbId}` +
    `?api_key=${apiKey}` +
    `&language=es-MX` +
    `&append_to_response=credits,external_ids,videos,images` +
    `&include_image_language=es,null,en,ja`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB respondió ${response.status}`);
  }

  const data = await response.json();

  const logo =
    data.images?.logos?.find(x => x.iso_639_1 === "es") ||
    data.images?.logos?.find(x => x.iso_639_1 === "en") ||
    data.images?.logos?.find(x => x.iso_639_1 === "ja") ||
    data.images?.logos?.[0];

  if (logo?.file_path) {
    data.logo = `https://image.tmdb.org/t/p/original${logo.file_path}`;
  }

  return data;
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
    throw new Error(`TMDB respondió ${response.status}`);
  }

  return await response.json();
}
