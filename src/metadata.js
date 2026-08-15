export async function getMetadata() {
  return {
    id: "70787",

    imdb_id: "tt0090407",

    tmdb_id: "70787",

    tmdbId: "70787",
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

    tmdb: {
      id: 70787,
      rating: 7.5
    },

    tmdbRating: 8.0,
    tmdbScore: 8.0,

    tmdb_score: 8.0,

    language: "ja",

    originalLanguage: "Japanese",

    spokenLanguages: ["Japanese"],

    spokenLanguage: "ja",

    languages: ["ja"],

    country: "JP",

    trailerYtIds: [
      "uJ57aEFkm8M"
    ],

    certificate: "TV-PG",

    certification: "L",

    ageRating: "TV-PG"
  };
}

export async function buildMetadata() {
  return getMetadata();
}
