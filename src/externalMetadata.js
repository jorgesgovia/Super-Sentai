import https from "node:https";

function getJSON(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`HTTP ${res.statusCode} en ${url}`));
          return;
        }

        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", reject);

    req.setTimeout(15000, () => {
      req.destroy(new Error(`Timeout en ${url}`));
    });
  });
}

function first(...values) {
  return values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
  );
}

function uniquePeople(list = []) {
  const seen = new Set();

  return list.filter((person) => {
    const name =
      typeof person === "string"
        ? person
        : person?.name;

    if (!name) return false;

    const key = name.toLowerCase();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

export async function mergeExternalMetadata(meta, imdbId) {
  let tmdb = null;
  let cinemetaData = null;

  /*
   * ============================================================
   * CINEMETA
   * ============================================================
   */

  try {
    cinemetaData = await getJSON(
      `https://v3-cinemeta.strem.io/meta/tv/${encodeURIComponent(imdbId)}.json`
    );

    console.log(
      "[externalMetadata] Cinemeta integrado:",
      cinemetaData?.meta?.name || "sin nombre"
    );
  } catch (error) {
    console.log(
      "[externalMetadata] Cinemeta no disponible:",
      error.message
    );
  }

  /*
   * ============================================================
   * TMDB
   * ============================================================
   */

  const tmdbToken = process.env.TMDB_API_TOKEN;

  if (tmdbToken && meta?.tmdb_id) {
    try {
      tmdb = await getJSON(
        `https://api.themoviedb.org/3/tv/${meta.tmdb_id}?language=es-MX&append_to_response=credits,images`,
        {
          Authorization: `Bearer ${tmdbToken}`,
          accept: "application/json",
        }
      );

      console.log(
        "[externalMetadata] TMDB integrado:",
        tmdb?.name || "sin nombre"
      );
    } catch (error) {
      console.log(
        "[externalMetadata] TMDB error:",
        error.message
      );
    }
  } else {
    console.log(
      "[externalMetadata] TMDB token o ID no disponible"
    );
  }

  /*
   * ============================================================
   * DATOS CINEMETA
   * ============================================================
   */

  const cm = cinemetaData?.meta || {};

  /*
   * ============================================================
   * TMDB CAST
   * ============================================================
   */

  const tmdbCast = (tmdb?.credits?.cast || []).slice(0, 30).map(
    (person) => ({
      name: person.name,
      character: person.character || undefined,
      photo: person.profile_path
        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
        : undefined,
    })
  );

  /*
   * ============================================================
   * CINEMETA CAST
   * ============================================================
   */

  const cinemetaCast = Array.isArray(cm.cast)
    ? cm.cast.map((person) => {
        if (typeof person === "string") {
          return {
            name: person,
          };
        }

        return {
          name: person.name,
          character:
            person.character ||
            person.characterName ||
            undefined,
          photo:
            person.photo ||
            person.profile ||
            undefined,
        };
      })
    : [];

  const cast = uniquePeople([
    ...tmdbCast,
    ...cinemetaCast,
    ...(Array.isArray(meta?.cast) ? meta.cast : []),
  ]).slice(0, 30);

  /*
   * ============================================================
   * DIRECTORES
   * ============================================================
   */

  const tmdbDirectors = (tmdb?.credits?.crew || [])
    .filter((person) => person.job === "Director")
    .map((person) => ({
      name: person.name,
      photo: person.profile_path
        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
        : undefined,
    }));

  const cinemetaDirectors = Array.isArray(cm.director)
    ? cm.director.map((person) =>
        typeof person === "string"
          ? { name: person }
          : person
      )
    : [];

  const directors = uniquePeople([
    ...tmdbDirectors,
    ...cinemetaDirectors,
    ...(Array.isArray(meta?.director) ? meta.director : []),
  ]);

  /*
   * ============================================================
   * ESCRITORES
   * ============================================================
   */

  const tmdbWriters = (tmdb?.credits?.crew || [])
    .filter(
      (person) =>
        person.job === "Writer" ||
        person.job === "Screenplay" ||
        person.job === "Story"
    )
    .map((person) => ({
      name: person.name,
      photo: person.profile_path
        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
        : undefined,
    }));

  const cinemetaWriters = Array.isArray(cm.writer)
    ? cm.writer.map((person) =>
        typeof person === "string"
          ? { name: person }
          : person
      )
    : [];

  const writers = uniquePeople([
    ...tmdbWriters,
    ...cinemetaWriters,
    ...(Array.isArray(meta?.writer) ? meta.writer : []),
  ]);

  /*
   * ============================================================
   * PRODUCTORAS
   * ============================================================
   */

  const tmdbProductionCompanies =
    tmdb?.production_companies?.map(
      (company) => company.name
    ) || [];

  const cinemetaProductionCompanies =
    Array.isArray(cm.productionCompanies)
      ? cm.productionCompanies.map((company) =>
          typeof company === "string"
            ? company
            : company?.name
        )
      : [];

  const productionCompanies = [
    ...new Set(
      [
        ...tmdbProductionCompanies,
        ...cinemetaProductionCompanies,
        ...(Array.isArray(meta?.productionCompanies)
          ? meta.productionCompanies
          : []),
      ].filter(Boolean)
    ),
  ];

  /*
   * ============================================================
   * GÉNEROS
   * ============================================================
   */

  const tmdbGenres =
    tmdb?.genres?.map((genre) => genre.name) || [];

  const cinemetaGenres = Array.isArray(cm.genres)
    ? cm.genres.map((genre) =>
        typeof genre === "string"
          ? genre
          : genre?.name || genre?.title
      )
    : [];

  const genres = [
    ...new Set(
      [
        ...tmdbGenres,
        ...cinemetaGenres,
        ...(Array.isArray(meta?.genres) ? meta.genres : []),
      ].filter(Boolean)
    ),
  ];

  /*
   * ============================================================
   * RATING
   * ============================================================
   */

  const imdbRating = first(
    cm.imdbRating,
    meta?.imdbRating
  );

  const imdbVotes = first(
    cm.imdbVotes,
    meta?.imdbVotes
  );

  const tmdbRating =
    typeof tmdb?.vote_average === "number"
      ? tmdb.vote_average
      : undefined;

  /*
   * ============================================================
   * POSTER
   *
   * IMPORTANTE:
   * Conservamos el poster que ya usa el addon.
   * No cambiamos la reproducción ni la identificación.
   * ============================================================
   */

  const poster = first(
    meta?.poster,
    cm.poster,
    tmdb?.poster_path
      ? `https://image.tmdb.org/t/p/original${tmdb.poster_path}`
      : undefined
  );

  /*
   * ============================================================
   * BACKGROUND
   * ============================================================
   */

  const background = first(
    meta?.background,
    cm.background,
    tmdb?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${tmdb.backdrop_path}`
      : undefined
  );

  /*
   * ============================================================
   * LOGO
   * ============================================================
   */

  const logo = first(
    meta?.logo,
    cm.logo,
    tmdb?.images?.logos?.find(
      (x) => x.iso_639_1 === "es"
    )?.file_path
      ? `https://image.tmdb.org/t/p/original${
          tmdb.images.logos.find(
            (x) => x.iso_639_1 === "es"
          ).file_path
        }`
      : undefined,
    tmdb?.images?.logos?.find(
      (x) => x.iso_639_1 === "en"
    )?.file_path
      ? `https://image.tmdb.org/t/p/original${
          tmdb.images.logos.find(
            (x) => x.iso_639_1 === "en"
          ).file_path
        }`
      : undefined
  );

  /*
   * ============================================================
   * RED / CANAL
   * ============================================================
   */

  const network = first(
    meta?.network,
    cm.network,
    tmdb?.networks?.[0]?.name
  );

  /*
   * ============================================================
   * METADATA FINAL
   * ============================================================
   */

  const merged = {
    ...meta,

    imdb_id: first(
      meta?.imdb_id,
      cm.imdb_id,
      imdbId
    ),

    tmdb_id: first(
      meta?.tmdb_id,
      cm.tmdb_id,
      tmdb?.id
    ),

    tvdb_id: first(
      meta?.tvdb_id,
      cm.tvdb_id,
      tmdb?.external_ids?.tvdb_id
    ),

    name: first(
      meta?.name,
      cm.name,
      tmdb?.name
    ),

    originalName: first(
      meta?.originalName,
      cm.originalName,
      tmdb?.original_name
    ),

    description: first(
      meta?.description,
      cm.description,
      tmdb?.overview
    ),

    overview: first(
      meta?.overview,
      cm.overview,
      tmdb?.overview
    ),

    poster,

    background,

    logo,

    year: first(
      meta?.year,
      cm.year,
      tmdb?.first_air_date
        ? Number(tmdb.first_air_date.slice(0, 4))
        : undefined
    ),

    releaseInfo: first(
      meta?.releaseInfo,
      cm.releaseInfo,
      tmdb?.first_air_date
    ),

    status: first(
      meta?.status,
      cm.status,
      tmdb?.status
    ),

    runtime: first(
      meta?.runtime,
      cm.runtime,
      tmdb?.episode_run_time?.[0]
    ),

    country: first(
      meta?.country,
      cm.country,
      tmdb?.origin_country
    ),

    language: first(
      meta?.language,
      cm.language,
      tmdb?.original_language
    ),

    genres,

    genre: genres,

    rating: first(
      meta?.rating,
      tmdbRating,
      cm.rating
    ),

    imdbRating,

    imdbVotes,

    network,

    productionCompanies,

    production_companies: productionCompanies,

    cast,

    actors: cast,

    director: directors,

    directors,

    writer: writers,

    writers,

    tagline: first(
      meta?.tagline,
      cm.tagline,
      tmdb?.tagline
    ),

    /*
     * Conservamos cualquier enlace que Cinemeta ya
     * entregue, incluyendo referencias externas.
     */
    links: [
      ...(Array.isArray(meta?.links) ? meta.links : []),
      ...(Array.isArray(cm.links) ? cm.links : []),
    ].filter(
      (link, index, array) =>
        index ===
        array.findIndex(
          (x) =>
            x?.url === link?.url &&
            x?.name === link?.name
        )
    ),
  };

  console.log(
    "[externalMetadata] Géneros:",
    genres.length
  );

  console.log(
    "[externalMetadata] Reparto:",
    cast.length
  );

  console.log(
    "[externalMetadata] Productoras:",
    productionCompanies.length
  );

  console.log(
    "[externalMetadata] Director:",
    directors.length
  );

  console.log(
    "[externalMetadata] Escritores:",
    writers.length
  );

  console.log(
    "[externalMetadata] IMDb:",
    imdbRating || "N/D"
  );

  console.log(
    "[externalMetadata] Network:",
    network || "N/D"
  );

  return merged;
}
