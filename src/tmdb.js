async function tmdbFetch(url) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("Falta TMDB_API_KEY");
  }

  /*
   * TMDB_API_KEY es una API key v3 de 32 caracteres.
   *
   * Se envía como ?api_key=...
   * y no como Authorization: Bearer.
   */

  const separator = url.includes("?") ? "&" : "?";

  const authenticatedUrl =
    `${url}${separator}api_key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(authenticatedUrl, {
    headers: {
      accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB respondió ${response.status}`);
  }

  return await response.json();
}

export async function getTmdbSeries(tmdbId) {
  const url =
    `https://api.themoviedb.org/3/tv/${tmdbId}` +
    `?language=es-MX` +
    `&append_to_response=credits,external_ids,videos,images` +
    `&include_image_language=es,null,en,ja`;

  const data = await tmdbFetch(url);

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
  const url =
    `https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}` +
    `?language=es-MX` +
    `&append_to_response=credits,videos,images` +
    `&include_image_language=es,null,en,ja`;

  return await tmdbFetch(url);
}
