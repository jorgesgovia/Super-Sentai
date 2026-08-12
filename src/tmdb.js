async function tmdbFetch(url) {
  const token = process.env.TMDB_API_KEY;

  if (!token) {
    throw new Error("Falta TMDB_API_KEY");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
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
