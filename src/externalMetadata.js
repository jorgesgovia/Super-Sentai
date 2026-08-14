import https from "node:https";
import { getTmdbSeries } from "./tmdb.js";

function getJSON(url, headers = {}, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {

        /*
         * Seguir redirecciones HTTP.
         *
         * Cinemeta actualmente puede responder 307.
         */

        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          if (redirects >= 5) {
            reject(
              new Error(
                `Demasiadas redirecciones en ${url}`
              )
            );
            return;
          }

          getJSON(
            new URL(
              res.headers.location,
              url
            ).toString(),
            headers,
            redirects + 1
          )
            .then(resolve)
            .catch(reject);

          return;
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(
            new Error(
              `HTTP ${res.statusCode} en ${url}`
            )
          );
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

  const tmdbToken = process.env.TMDB_API_KEY;

  if (tmdbToken && meta?.tmdb_id) {
    try {
      /*
       * Usamos el cliente TMDB oficial del addon.
       *
       * Esto mantiene una sola implementación de:
       * - Bearer token
       * - credits
       * - external_ids
       * - videos
       * - images
       */

      tmdb = await getTmdbSeries(
        meta.tmdb_id
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
   *
   * Nuvio espera MetaCompany:
   * {
   *   name,
   *   logo,
   *   tmdbId
   * }
   *
   * El tmdbId es especialmente importante porque Nuvio lo usa
   * para hacer navegable la sección de producción.
   */

  const tmdbProductionCompanies =
    Array.isArray(tmdb?.production_companies)
      ? tmdb.production_companies
          .filter((company) => company?.name)
          .map((company) => ({
            name: company.name,
            logo: company.logo_path
              ? `https://image.tmdb.org/t/p/w185${company.logo_path}`
              : undefined,
            tmdbId:
              typeof company.id === "number"
                ? company.id
                : undefined,
          }))
      : [];

  const cinemetaProductionCompanies =
    Array.isArray(cm.productionCompanies)
      ? cm.productionCompanies.map((company) => {
          if (typeof company === "string") {
            return { name: company };
          }

          return {
            name: company?.name,
            logo:
              company?.logo ||
              company?.logo_path ||
              undefined,
            tmdbId:
              typeof company?.tmdbId === "number"
                ? company.tmdbId
                : undefined,
          };
        })
      : [];

  const addonProductionCompanies =
    Array.isArray(meta?.productionCompanies)
      ? meta.productionCompanies.map((company) => {
          if (typeof company === "string") {
            return { name: company };
          }

          return {
            name: company?.name,
            logo:
              company?.logo ||
              company?.logo_path ||
              undefined,
            tmdbId:
              typeof company?.tmdbId === "number"
                ? company.tmdbId
                : undefined,
          };
        })
      : [];

  const productionCompanies = [
    ...tmdbProductionCompanies,
    ...cinemetaProductionCompanies,
    ...addonProductionCompanies,
  ]
    .filter((company) => company?.name)
    .filter(
      (company, index, array) =>
        index ===
        array.findIndex(
          (x) =>
            x?.name === company?.name &&
            (
              x?.tmdbId === company?.tmdbId ||
              (!x?.tmdbId && !company?.tmdbId)
            )
        )
    );

  /*
   * ============================================================
   * CREADORES
   * ============================================================
   *
   * TMDB entrega los creadores de series en created_by.
   * También aceptamos datos procedentes de Cinemeta/addon.
   */

  const tmdbCreators =
    Array.isArray(tmdb?.created_by)
      ? tmdb.created_by
          .filter((person) => person?.name)
          .map((person) => ({
            name: person.name,
            photo: person.profile_path
              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
              : undefined,
            tmdbId:
              typeof person.id === "number"
                ? person.id
                : undefined,
          }))
      : [];

  const cinemetaCreators =
    Array.isArray(cm.creators)
      ? cm.creators.map((person) =>
          typeof person === "string"
            ? { name: person }
            : {
                name: person?.name,
                photo:
                  person?.photo ||
                  person?.profile ||
                  undefined,
                tmdbId:
                  typeof person?.tmdbId === "number"
                    ? person.tmdbId
                    : undefined,
              }
        )
      : [];

  const addonCreators =
    Array.isArray(meta?.creators)
      ? meta.creators.map((person) =>
          typeof person === "string"
            ? { name: person }
            : person
        )
      : Array.isArray(meta?.creator)
        ? meta.creator.map((person) =>
            typeof person === "string"
              ? { name: person }
              : person
          )
        : meta?.creator
          ? [
              typeof meta.creator === "string"
                ? { name: meta.creator }
                : meta.creator
            ]
          : [];

  const creators = uniquePeople([
    ...tmdbCreators,
    ...cinemetaCreators,
    ...addonCreators,
  ]);

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
   * CUSTOM ADDON MEDIA
   * ============================================================
   *
   * Preserve the manually defined background and YouTube trailers
   * from metadata.js after external enrichment.
   */
  const customBackground = meta?.background;
  const customTrailerYtIds = Array.isArray(meta?.trailerYtIds)
    ? meta.trailerYtIds.filter(Boolean)
    : [];

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
   *
   * Nuvio espera las cadenas exactamente como MetaCompany,
   * incluyendo tmdbId. Ese ID permite que al pulsar la cadena
   * Nuvio abra su navegación TMDB.
   */

  const tmdbNetworks =
    Array.isArray(tmdb?.networks)
      ? tmdb.networks
          .filter((network) => network?.name)
          .map((network) => ({
            name: network.name,
            logo: network.logo_path
              ? `https://image.tmdb.org/t/p/w185${network.logo_path}`
              : undefined,
            tmdbId:
              typeof network.id === "number"
                ? network.id
                : undefined,
          }))
      : [];

  const cinemetaNetworks =
    Array.isArray(cm.networks)
      ? cm.networks.map((network) => {
          if (typeof network === "string") {
            return { name: network };
          }

          return {
            name: network?.name,
            logo:
              network?.logo ||
              network?.logo_path ||
              undefined,
            tmdbId:
              typeof network?.tmdbId === "number"
                ? network.tmdbId
                : undefined,
          };
        })
      : [];

  const addonNetworks =
    Array.isArray(meta?.networks)
      ? meta.networks.map((network) => {
          if (typeof network === "string") {
            return { name: network };
          }

          return {
            name: network?.name,
            logo:
              network?.logo ||
              network?.logo_path ||
              undefined,
            tmdbId:
              typeof network?.tmdbId === "number"
                ? network.tmdbId
                : undefined,
          };
        })
      : [];

  const networks = [
    ...tmdbNetworks,
    ...cinemetaNetworks,
    ...addonNetworks,
  ]
    .filter((network) => network?.name)
    .filter(
      (network, index, array) =>
        index ===
        array.findIndex(
          (x) =>
            x?.name === network?.name &&
            (
              x?.tmdbId === network?.tmdbId ||
              (!x?.tmdbId && !network?.tmdbId)
            )
        )
    );

  const network = networks[0]?.name;


  /*
   * ============================================================
   * NAVIGATION / EXTERNAL METADATA
   * ============================================================
   *
   * Construimos explícitamente estos campos a partir de TMDB,
   * Cinemeta y metadata local.
   */

        .filter(Boolean)
    : [];

  const cmNetworks = [
    ...(Array.isArray(cm.networks) ? cm.networks : []),
    cm.network
  ]
    .map((x) =>
      typeof x === "string"
        ? x
        : x?.name
    )
    .filter(Boolean);

  const networks = [
    ...new Set([
      ...(Array.isArray(meta?.networks) ? meta.networks : []),
      meta?.network,
      ...tmdbNetworks,
      ...cmNetworks
    ].filter(Boolean))
  ];

  const network = first(
    meta?.network,
    cm.network,
    networks[0]
  );

  const tmdbCreators = Array.isArray(tmdb?.created_by)
    ? tmdb.created_by.map((person) => ({
        name: person?.name,
        id: person?.id,
        photo: person?.profile_path
          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
          : undefined
      }))
    : [];

  const creatorPeople = uniquePeople([
    ...tmdbCreators,
    ...(Array.isArray(meta?.creators) ? meta.creators : []),
    ...(Array.isArray(cm.creators) ? cm.creators : [])
  ]);

  const creator = first(
    meta?.creator,
    cm.creator,
    creators[0]
  );

  const navigationLinks = [];

  const externalIds = tmdb?.external_ids || {};

  if (externalIds.imdb_id) {
    navigationLinks.push({
      name: "IMDb",
      category: "imdb",
      url: `https://www.imdb.com/title/${externalIds.imdb_id}`
    });
  }

  if (tmdb?.id) {
    navigationLinks.push({
      name: "TMDB",
      category: "tmdb",
      url: `https://www.themoviedb.org/tv/${tmdb.id}`
    });
  }

  if (externalIds.tvdb_id) {
    navigationLinks.push({
      name: "TheTVDB",
      category: "tvdb",
      url: `https://thetvdb.com/series/${externalIds.tvdb_id}`
    });
  }

  if (tmdb?.homepage) {
    navigationLinks.push({
      name: "Official website",
      category: "official",
      url: tmdb.homepage
    });
  }

  const links = [
    ...(Array.isArray(meta?.links) ? meta.links : []),
    ...(Array.isArray(cm.links) ? cm.links : []),
    ...navigationLinks
  ].filter(
    (link, index, array) =>
      link?.url &&
      index ===
        array.findIndex(
          (x) => x?.url === link?.url
        )
  );

  console.log(
    "[externalMetadata] Networks:",
    networks
  );

  console.log(
    "[externalMetadata] Creators:",
    creators
  );

  console.log(
    "[externalMetadata] Navigation links:",
    links
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

    background: customBackground || background,
    trailerYtIds: customTrailerYtIds,

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

    tmdbRating,

    vote_average:
      typeof tmdb?.vote_average === "number"
        ? tmdb.vote_average
        : undefined,

    imdbRating,

    imdbVotes,

    network,

    networks,

    productionCompanies,

    production_companies: productionCompanies,

    /*
     * Creador/es de la serie.
     *
     * Nuvio no necesita estos campos para navegar cadenas/productoras,
     * pero los exponemos para que la metadata completa quede disponible.
     */
    creator:
      creators.length === 1
        ? creators[0].name
        : creators.length > 1
          ? creators.map((person) => person.name)
          : undefined,

    creators,

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

      /*
       * Enlaces externos generados directamente desde TMDB.
       * La navegación interna de Nuvio hacia estas entidades
       * utiliza networks/productionCompanies + tmdbId.
       */

      ...networks
        .filter((network) => network?.tmdbId)
        .map((network) => ({
          name: network.name,
          category: "Network",
          url: `https://www.themoviedb.org/network/${network.tmdbId}`,
        })),

      ...productionCompanies
        .filter((company) => company?.tmdbId)
        .map((company) => ({
          name: company.name,
          category: "Production",
          url: `https://www.themoviedb.org/company/${company.tmdbId}`,
        })),
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
