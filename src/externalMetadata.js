import https from "node:https";

function getJSON(url, headers = {}, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          if (redirects >= 5) {
            reject(new Error("Demasiadas redirecciones"));
            return;
          }

          getJSON(
            new URL(res.headers.location, url).toString(),
            headers,
            redirects + 1
          )
            .then(resolve)
            .catch(reject);

          return;
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`HTTP ${res.statusCode}`));
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
      req.destroy(new Error("Timeout"));
    });
  });
}

/*
 * ============================================================
 * EXPERIMENTO
 *
 * SOLO usamos TMDB 70787 para obtener metadata externa.
 *
 * NO cambiamos:
 * - id de los episodios
 * - streams
 * - server.js
 * - background
 * - poster
 * - logo
 * - trailer
 * ============================================================
 */

const TMDB_ID = "70787";

export async function mergeExternalMetadata(meta) {
  let tmdb = null;

  const token = process.env.TMDB_API_KEY;

  if (!token) {
    console.log("[TMDB 70787] ERROR: falta TMDB_API_KEY");
    return meta;
  }

  try {
    const response = await getJSON(
      `https://api.themoviedb.org/3/tv/${TMDB_ID}?append_to_response=credits,images,external_ids,videos`,
      {
        Authorization: `Bearer ${token}`,
        accept: "application/json"
      }
    );

    tmdb = response;

    console.log(
      "[TMDB 70787] Serie:",
      tmdb?.name || "sin nombre"
    );

  } catch (error) {
    console.log(
      "[TMDB 70787] ERROR:",
      error.message
    );

    return meta;
  }

  /*
   * ============================================================
   * ARTWORK ORIGINAL — PROTEGIDO
   * ============================================================
   */

  const background = meta?.background;
  const poster = meta?.poster;
  const logo = meta?.logo;
  const trailerYtIds = meta?.trailerYtIds;

  /*
   * ============================================================
   * CAST
   * ============================================================
   */

  const cast = (tmdb?.credits?.cast || [])
    .slice(0, 50)
    .map((person) => ({
      name: person.name,
      character: person.character,
      photo: person.profile_path
        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
        : undefined
    }));

  /*
   * ============================================================
   * DIRECTORES
   * ============================================================
   */

  const directors = (tmdb?.credits?.crew || [])
    .filter(
      (person) =>
        person.job === "Director"
    )
    .map((person) => ({
      name: person.name,
      photo: person.profile_path
        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
        : undefined
    }));

  /*
   * ============================================================
   * ESCRITORES
   * ============================================================
   */

  const writers = (tmdb?.credits?.crew || [])
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
        : undefined
    }));

  /*
   * ============================================================
   * CREADORES
   * ============================================================
   */

  const creators = (tmdb?.created_by || [])
    .map((person) => ({
      name: person.name,
      photo: person.profile_path
        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
        : undefined
    }));

  /*
   * ============================================================
   * NETWORKS
   * ============================================================
   */

  const networks = (tmdb?.networks || [])
    .map((network) => ({
      name: network.name,
      tmdbId: network.id,
      logo: network.logo_path
        ? `https://image.tmdb.org/t/p/w185${network.logo_path}`
        : undefined
    }));

  /*
   * ============================================================
   * PRODUCCIÓN
   * ============================================================
   */

  const productionCompanies =
    (tmdb?.production_companies || [])
      .map((company) => ({
        name: company.name,
        tmdbId: company.id,
        logo: company.logo_path
          ? `https://image.tmdb.org/t/p/w185${company.logo_path}`
          : undefined
      }));

  /*
   * ============================================================
   * METADATA ENRIQUECIDA
   * ============================================================
   */

  const enriched = {
    ...meta,

    /*
     * IDENTIDAD DEL ADDON SE CONSERVA
     */
    id: meta?.id || "super-sentai-flashman",

    /*
     * REFERENCIAS
     */
    tmdb_id: TMDB_ID,
    tmdbId: TMDB_ID,
    imdb_id:
      meta?.imdb_id ||
      tmdb?.external_ids?.imdb_id ||
      "tt0090407",

    /*
     * DATOS TMDB
     */
    originalName:
      tmdb?.original_name,

    tagline:
      tmdb?.tagline ||
      meta?.tagline,

    status:
      tmdb?.status ||
      meta?.status,

    year:
      tmdb?.first_air_date
        ? Number(
            tmdb.first_air_date.slice(0, 4)
          )
        : meta?.year,

    releaseInfo:
      tmdb?.first_air_date ||
      meta?.releaseInfo,

    genres:
      (tmdb?.genres || [])
        .map((genre) => genre.name),

    rating:
      typeof tmdb?.vote_average === "number"
        ? tmdb.vote_average
        : meta?.rating,

    tmdbRating:
      typeof tmdb?.vote_average === "number"
        ? tmdb.vote_average
        : undefined,

    vote_average:
      tmdb?.vote_average,

    certificate:
      meta?.certificate,

    /*
     * PERSONAS
     */
    cast,

    actors: cast,

    director: directors,

    directors,

    writer: writers,

    writers,

    creator: creators,

    creators,

    /*
     * NETWORK
     */
    network:
      networks[0]?.name ||
      meta?.network,

    networks,

    /*
     * PRODUCCIÓN
     */
    productionCompanies,

    production_companies:
      productionCompanies,

    /*
     * ARTWORK PROTEGIDO
     */
    background,

    poster,

    logo,

    /*
     * TRAILER PROTEGIDO
     */
    trailerYtIds:
      Array.isArray(trailerYtIds)
        ? trailerYtIds
        : []
  };

  console.log(
    "[TMDB 70787] CAST:",
    cast.length
  );

  console.log(
    "[TMDB 70787] DIRECTORES:",
    directors.length
  );

  console.log(
    "[TMDB 70787] ESCRITORES:",
    writers.length
  );

  console.log(
    "[TMDB 70787] CREADORES:",
    creators.length
  );

  console.log(
    "[TMDB 70787] NETWORKS:",
    networks.length
  );

  console.log(
    "[TMDB 70787] PRODUCCIÓN:",
    productionCompanies.length
  );

  console.log(
    "[TMDB 70787] BACKGROUND PROTEGIDO:",
    Boolean(background)
  );

  console.log(
    "[TMDB 70787] LOGO PROTEGIDO:",
    Boolean(logo)
  );

  console.log(
    "[TMDB 70787] TRAILER PROTEGIDO:",
    Boolean(trailerYtIds?.length)
  );

  return enriched;
}
