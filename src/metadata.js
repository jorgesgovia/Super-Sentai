export async function getMetadata() {
  return {
    id: "70787",
    type: "series",

    name: "Choushinsei Flashman",
    originalName: "超新星フラッシュマン",

    imdb_id: "tt0090407",
    tmdb_id: "70787",

    poster:
      "https://image.tmdb.org/t/p/original/mKoZUWBPMRa7sFBWMPuusTBBmS1.jpg",

    background:
      "https://imgbs.com/uploads/flashman-a8f83054.jpg",

    description:
      "Cinco jóvenes que fueron secuestrados de la Tierra cuando eran niños regresan veinte años después como los Flashman para proteger la Tierra del Imperio Mess y descubrir sus verdaderos orígenes.",

    year: 1986,
    releaseInfo: "1986-1987",
    released: "1986-03-01",

    status: "Ended",

    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    language: "ja",
    country: "JP",

    network: "tv asahi",

    networks: [
      {
        name: "tv asahi",
        tmdbId: 103,
        logo:
          "https://image.tmdb.org/t/p/w185/j3xAzk1SYQQwrQOD7acdSz675Wa.png"
      }
    ],

    productionCompanies: [
      {
        name: "Toei Company",
        tmdbId: 5822,
        logo:
          "https://image.tmdb.org/t/p/w185/qyTbRgCyU9NLKvKaiQVbadtr7RY.png"
      }
    ],

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

    writer: [
      {
        name: "Hirohisa Soda"
      },
      {
        name: "Kenji Terada"
      }
    ],

    creator: [
      {
        name: "Nobuo Yajima"
      }
    ],

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
      }
    ],

    trailerYtIds: [
      "uJ57aEFkm8M"
    ],

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
