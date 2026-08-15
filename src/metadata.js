export async function getMetadata() {
  return {
    id: "70787",
    type: "series",

    name: "Choushinsei Flashman",

    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    tmdb_id: "70787",

    networks: [
      {
        id: 103,
        name: "TV Asahi"
      }
    ],

    productionCompanies: [
      {
        id: 5822,
        name: "Toei Company"
      }
    ]
  };
}

export async function buildMetadata() {
  return getMetadata();
}
