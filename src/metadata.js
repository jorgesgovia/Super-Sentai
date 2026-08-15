export async function getMetadata() {
  return {
    id: "tt0090407",
    type: "series",

    name: "Choushinsei Flashman",

    genres: [
      "Action"
    ],

    network: "tv asahi",

    networks: [
      {
        name: "tv asahi"
      }
    ],

    productionCompanies: [
      {
        name: "Toei Company"
      }
    ]
  };
}

export async function buildMetadata() {
  return getMetadata();
}
