export async function getMetadata() {
  return {
    id: "super-sentai-flashman",
    type: "series",
    name: "Choushinsei Flashman",

    poster:
      "https://image.tmdb.org/t/p/original/mKoZUWBPMRa7sFBWMPuusTBBmS1.jpg",

    background:
      "https://imgbs.com/uploads/flashman-a8f83054.jpg",

    description:
      "Cinco jóvenes que fueron secuestrados de la Tierra cuando eran niños regresan veinte años después como los Flashman para proteger la Tierra del Imperio Mess y descubrir sus verdaderos orígenes.",

    overview:
      "Cinco jóvenes que fueron secuestrados de la Tierra cuando eran niños regresan veinte años después como los Flashman para proteger la Tierra del Imperio Mess y descubrir sus verdaderos orígenes.",

    year: 1986,

    releaseInfo: "1986-1987",

    releaseYear: "1986-1987",

    released: "1986-03-01",

    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    tagline:
      "¡El tiempo de los Flashman se acaba!",

    runtime: 30,

    duration: 30,

    status: "Ended",

    rating: 8.0,

    imdbRating: 8.0,
tmdbScore: 80,

    tmdbRating: 8.0,

    tmdb_rating: 8.0,

    tmdbVoteAverage: 8.0,

    tmdbScore: 8.0,

    tmdb_score: 8.0,

    language: "ja",

    originalLanguage: "Japanese",

    spokenLanguages: ["Japanese"],

    spokenLanguage: "ja",

    languages: ["ja"],

    originalLanguage: "Japanese",

    spokenLanguages: [
      "Japanese"
    ],

    spokenLanguage: "ja",

    languages: [
      "ja"
    ],

    country: "JP",

    certificate: "TV-PG",

    ageRating: "TV-PG"
    score: 80,

    tmdbScore: 80,

    tmdb_rating: 8.0,

    tmdbVoteAverage: 8.0,

    tmdb: {
      rating: 8.0,
      score: 80
    },

    links: [
      {
        name: "TMDB",
        category: "tmdb",
        url: "https://www.themoviedb.org/tv/70787"
      }
    ]

  };
}

export async function buildMetadata() {
  return getMetadata();
}
