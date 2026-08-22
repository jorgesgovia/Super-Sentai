const FLASHMAN = {
  id: "70787",
  type: "series",
  name: "Choushinsei Flashman",
  imdb_id: "tt0090407",
  tmdb_id: "70787",
  tmdbId: "70787",

  imdbRating: 8.2,

  background:
    "https://imgbs.com/uploads/flashman-a8f83054.jpg",

  poster:
    "https://image.tmdb.org/t/p/original/wyGFaD0V2bU2Q5uEtJDStZSRoG2.jpg",

  logo:
    "https://image.tmdb.org/t/p/original/7jASxo9DcEkuhCQhuJpgkmjoTgt.png",

  trailer: "Q_oVf3qpwIk",

  description:
    "Cinco jóvenes que fueron secuestrados de la Tierra cuando eran niños regresan veinte años después como los Flashman para proteger la Tierra del Imperio Mess y descubrir sus verdaderos orígenes.",

  overview:
    "Cinco jóvenes que fueron secuestrados de la Tierra cuando eran niños regresan veinte años después como los Flashman para proteger la Tierra del Imperio Mess y descubrir sus verdaderos orígenes.",

  year: 1986,
  releaseInfo: "1986-1987",
  released: "1986-03-01",

  genres: [
    "Action",
    "Adventure",
    "Science Fiction"
  ],

  runtime: 30,
  duration: 30,
  status: "Ended",

  rating: 8.2,
  tmdbRating: 7.5,

  language: "ja",
  originalLanguage: "Japanese",
  spokenLanguages: ["Japanese"],
  spokenLanguage: "ja",
  languages: ["ja"],

  country: "JP",

  trailerYtIds: [
    "Q_oVf3qpwIk"
  ]
};


const MASKMAN = {
  id: "53129",
  type: "series",
  name: "Hikari Sentai Maskman",
  imdb_id: "tt0092371",
  tmdb_id: "53129",
  tmdbId: "53129",

  imdbRating: 7.8,

  description:
    "Hikari Sentai Maskman es una serie japonesa de Super Sentai estrenada en 1987. Cinco guerreros entrenados en las artes marciales luchan contra el Imperio Tube para proteger la Tierra.",

  overview:
    "Hikari Sentai Maskman es una serie japonesa de Super Sentai estrenada en 1987. Cinco guerreros entrenados en las artes marciales luchan contra el Imperio Tube para proteger la Tierra.",

  year: 1987,
  releaseInfo: "1987-1988",
  released: "1987-02-28",

  genres: [
    "Action",
    "Adventure",
    "Science Fiction"
  ],

  runtime: 30,
  duration: 30,
  status: "Ended",

  rating: 7.8,
  tmdbRating: 7.5,

  country: "JP",
  language: "ja",
  originalLanguage: "Japanese",
  spokenLanguages: ["Japanese"],
  spokenLanguage: "ja",
  languages: ["ja"]
};


export async function getMetadata(id = "70787") {
  return String(id) === "53129"
    ? MASKMAN
    : FLASHMAN;
}


export async function buildMetadata(id = "70787") {
  return getMetadata(id);
}


// ============================================================
// HIKARI SENTAI MASKMAN
// ============================================================

export async function getMaskmanMetadata() {
  return {
    id: "53129",
    type: "series",
    name: "Hikari Sentai Maskman",
    imdb_id: "tt0092371",
    tmdb_id: "53129",
    tmdbId: "53129",

    poster:
      "https://image.tmdb.org/t/p/original/8JwL6X3R8f6wK5Z9wJ5QfJY5V9M.jpg",

    background:
      "https://image.tmdb.org/t/p/original/8JwL6X3R8f6wK5Z9wJ5QfJY5V9M.jpg",

    description:
      "Hikari Sentai Maskman es una serie japonesa de Super Sentai estrenada en 1987. Cinco guerreros entrenados en las artes marciales luchan contra el Imperio Tube para proteger la Tierra.",

    overview:
      "Hikari Sentai Maskman es una serie japonesa de Super Sentai estrenada en 1987. Cinco guerreros entrenados en las artes marciales luchan contra el Imperio Tube para proteger la Tierra.",

    year: 1987,
    releaseInfo: "1987-1988",
    releaseYear: "1987-1988",
    released: "1987-02-28",

    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    status: "Ended"
  };
}
