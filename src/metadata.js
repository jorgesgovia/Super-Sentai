export async function getMetadata() {
  return {
    /*
     * IDENTIDAD LOCAL DEL ADDON
     *
     * IMPORTANTE:
     * No usamos IMDb/TMDB como id principal.
     * No hay imdb_id ni tmdb_id para que Nuvio
     * no active enriquecimiento automático.
     */
    id: "super-sentai-flashman",

    type: "series",
    name: "Choushinsei Flashman",

    /*
     * ARTWORK MANUAL
     */
    poster:
      "https://image.tmdb.org/t/p/original/mKoZUWBPMRa7sFBWMPuusTBBmS1.jpg",

    background:
      "https://imgbs.com/uploads/flashman-a8f83054.jpg",

    logo:
      "https://image.tmdb.org/t/p/original/q1YjYh7J9wM4KX2w4x4nKX5Y7xC.png",

    /*
     * DESCRIPCIÓN MANUAL
     */
    description:
      "Cinco jóvenes que fueron secuestrados de la Tierra cuando eran niños regresan veinte años después como los Flashman para proteger la Tierra del Imperio Mess y descubrir sus verdaderos orígenes.",

    overview:
      "Cinco jóvenes que fueron secuestrados de la Tierra cuando eran niños regresan veinte años después como los Flashman para proteger la Tierra del Imperio Mess y descubrir sus verdaderos orígenes.",

    tagline:
      "¡El tiempo de los Flashman se acaba!",

    /*
     * INFORMACIÓN GENERAL
     */
    year: 1986,
    releaseInfo: "1986-1987",
    releaseYear: "1986-1987",
    released: "1986-03-01",

    status: "Ended",

    runtime: 30,
    duration: 30,

    /*
     * GÉNEROS
     */
    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    genre: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    /*
     * CALIFICACIONES MANUALES
     */
    rating: 8.2,
    imdbRating: 8.2,

    ratings: [
      {
        source: "IMDb",
        value: 8.2
      },
      {
        source: "TMDB",
        value: 7.5
      },
      {
        source: "MDblist",
        value: 7.5
      }
    ],

    tmdbRating: 7.5,
    tmdbScore: 7.5,

    /*
     * CLASIFICACIÓN
     */
    certificate: "TV-PG",
    certification: "TV-PG",
    ageRating: "TV-PG",

    /*
     * IDIOMA / PAÍS
     */
    language: "ja",
    originalLanguage: "Japanese",
    spokenLanguage: "ja",

    spokenLanguages: [
      "Japanese"
    ],

    languages: [
      "ja"
    ],

    country: "JP",

    /*
     * RED / CANAL
     *
     * MANUAL. Sin TMDB ID.
     */
    network: "tv asahi",

    networks: [
      {
        name: "tv asahi",
        logo:
          "https://image.tmdb.org/t/p/w185/j3xAzk1SYQQwrQOD7acdSz675Wa.png"
      }
    ],

    /*
     * PRODUCCIÓN
     *
     * MANUAL. Sin TMDB ID.
     */
    productionCompanies: [
      {
        name: "Toei Company",
        logo:
          "https://image.tmdb.org/t/p/w185/qyTbRgCyU9NLKvKaiQVbadtr7RY.png"
      }
    ],

    production_companies: [
      {
        name: "Toei Company",
        logo:
          "https://image.tmdb.org/t/p/w185/qyTbRgCyU9NLKvKaiQVbadtr7RY.png"
      }
    ],

    /*
     * CREADOR / DIRECCIÓN
     *
     * Nombres manuales.
     */
    director: [
      {
        name: "Noboru Sugimura"
      }
    ],

    directors: [
      {
        name: "Noboru Sugimura"
      }
    ],

    creator: [
      {
        name: "Noboru Sugimura"
      }
    ],

    creators: [
      {
        name: "Noboru Sugimura"
      }
    ],

    /*
     * ESCRITORES
     */
    writer: [
      {
        name: "Noboru Sugimura"
      }
    ],

    writers: [
      {
        name: "Noboru Sugimura"
      }
    ],

    /*
     * REPARTO MANUAL
     */
    cast: [
      {
        name: "Toshiaki Kurasawa",
        character: "Jin / Red Flash"
      },
      {
        name: "Kihachiro Uemura",
        character: "Dan / Green Flash"
      },
      {
        name: "Yasuhiro Ishiwata",
        character: "Bun / Blue Flash"
      },
      {
        name: "Mayumi Yoshida",
        character: "Sara / Yellow Flash"
      },
      {
        name: "Yoshiko Sakamoto",
        character: "Lou / Pink Flash"
      },
      {
        name: "Akira Ishihama",
        character: "Doctor Keflen"
      },
      {
        name: "Koji Shimizu",
        character: "Monster"
      },
      {
        name: "Hiroshi Tanahashi",
        character: "Additional Cast"
      }
    ],

    actors: [
      {
        name: "Toshiaki Kurasawa",
        character: "Jin / Red Flash"
      },
      {
        name: "Kihachiro Uemura",
        character: "Dan / Green Flash"
      },
      {
        name: "Yasuhiro Ishiwata",
        character: "Bun / Blue Flash"
      },
      {
        name: "Mayumi Yoshida",
        character: "Sara / Yellow Flash"
      },
      {
        name: "Yoshiko Sakamoto",
        character: "Lou / Pink Flash"
      },
      {
        name: "Akira Ishihama",
        character: "Doctor Keflen"
      }
    ],

    /*
     * TRAILER MANUAL
     */
    trailerYtIds: [
      "uJ57aEFkm8M"
    ],

    /*
     * ENLACES MANUALES
     *
     * No contienen IMDb/TMDB IDs.
     */
    links: [
      {
        name: "tv asahi",
        category: "official",
        url: "https://www.tv-asahi.co.jp/"
      },
      {
        name: "Toei Company",
        category: "official",
        url: "https://www.toei.co.jp/"
      }
    ]
  };
}

export async function buildMetadata() {
  return getMetadata();
}
