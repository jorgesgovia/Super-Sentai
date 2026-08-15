export async function getMetadata() {
  return {
    id: "super-sentai-flashman",
    type: "series",

    name: "Choushinsei Flashman",
    originalName: "超新星フラッシュマン",

    /*
     * Referencias externas solamente.
     * NO son la identidad principal.
     */
    imdb_id: "tt0090407",
    tmdb_id: "70787",

    /*
     * ARTWORK
     */
    poster:
      "https://image.tmdb.org/t/p/original/mKoZUWBPMRa7sFBWMPuusTBBmS1.jpg",

    background:
      "https://imgbs.com/uploads/flashman-a8f83054.jpg",

    logo:
      "https://static.wikia.nocookie.net/logopedia/images/c/c2/Flashman_Logo.jpg/revision/latest/scale-to-width-down/1000?cb=20210828005807",

    /*
     * DESCRIPCION
     */
    description:
      "Cinco jóvenes que fueron secuestrados de la Tierra cuando eran niños regresan veinte años después como los Flashman para proteger la Tierra del Imperio Mess y descubrir sus verdaderos orígenes.",

    overview:
      "Cinco jóvenes que fueron secuestrados de la Tierra cuando eran niños regresan veinte años después como los Flashman para proteger la Tierra del Imperio Mess y descubrir sus verdaderos orígenes.",

    tagline:
      "¡El tiempo de los Flashman se acaba!",

    /*
     * FECHAS
     */
    year: 1986,
    releaseInfo: "1986-1987",
    released: "1986-03-01",

    /*
     * ESTADO
     */
    status: "Ended",

    /*
     * GENEROS
     */
    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    /*
     * RATING PRINCIPAL
     */
    rating: 8.2,
    imdbRating: 8.2,

    ratings: [
      {
        source: "imdb",
        value: 8.2
      },
      {
        source: "tmdb",
        value: 7.5
      },
      {
        source: "mdblist",
        value: 7.5
      }
    ],

    /*
     * CLASIFICACION
     */
    certificate: "TV-PG",
    ageRating: "TV-PG",

    /*
     * DURACION
     */
    runtime: 30,

    /*
     * IDIOMA — SOLO LA FORMA SIMPLE
     *
     * Se eliminan las variantes que anteriormente
     * podían generar conflictos:
     * spokenLanguages
     * spokenLanguage
     * languages
     * original_language
     */
    language: "ja",

    /*
     * PAIS
     */
    country: "JP",

    /*
     * NETWORK
     *
     * Se mantiene una sola representación estructurada.
     */
    network: "tv asahi",

    networks: [
      {
        name: "tv asahi",
        tmdbId: 103,
        logo:
          "https://image.tmdb.org/t/p/w185/j3xAzk1SYQQwrQOD7acdSz675Wa.png"
      }
    ],

    /*
     * PRODUCCION
     */
    productionCompanies: [
      {
        name: "Toei Company",
        tmdbId: 5822,
        logo:
          "https://image.tmdb.org/t/p/w185/qyTbRgCyU9NLKvKaiQVbadtr7RY.png"
      }
    ],

    /*
     * DIRECTOR
     */
    director: [
      {
        name: "Takao Nagaishi"
      },
      {
        name: "Katsuhiko Taguchi"
      },
      {
        name: "Takao Watanabe"
      }
    ],

    /*
     * ESCRITORES
     */
    writer: [
      {
        name: "Hirohisa Soda"
      },
      {
        name: "Kenji Terada"
      }
    ],

    /*
     * CREADOR
     */
    creator: [
      {
        name: "Nobuo Yajima"
      }
    ],

    /*
     * REPARTO
     */
    cast: [
      {
        name: "Tatsuya Nomi",
        character: "Jin / Red Flash"
      },
      {
        name: "Kenta Sato",
        character: "Dan / Green Flash"
      },
      {
        name: "Mayumi Yamaguchi",
        character: "Sara / Yellow Flash"
      },
      {
        name: "Yukari Ozawa",
        character: "Lou / Pink Flash"
      },
      {
        name: "Akira Ishihara",
        character: "Bun / Blue Flash"
      },
      {
        name: "Hiroko Kataoka"
      },
      {
        name: "Junichi Harada"
      },
      {
        name: "Masayuki Yui"
      }
    ],

    /*
     * TRAILER
     */
    trailerYtIds: [
      "uJ57aEFkm8M"
    ],

    /*
     * ENLACES
     */
    links: [
      {
        name: "IMDb",
        url: "https://www.imdb.com/title/tt0090407/"
      },
      {
        name: "TMDB",
        url: "https://www.themoviedb.org/tv/70787"
      }
    ]
  };
}

export async function buildMetadata() {
  return getMetadata();
}
