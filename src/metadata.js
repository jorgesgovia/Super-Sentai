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

    network: "TV Asahi",

    productionCompany: "Toei Company"
  };
}

export async function buildMetadata() {
  return getMetadata();
}
