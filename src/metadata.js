export async function getMetadata() {
  return {
    type: "series",
    name: "Choushinsei Flashman",
    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ]
  };
}

export async function buildMetadata() {
  return getMetadata();
}
