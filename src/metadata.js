const episodes = Array.from({ length: 50 }, (_, index) => {
  const episode = index + 1;

  return {
    id: `70787:1:${episode}`,
    type: "series",
    name: `Episodio ${episode}`,
    title: `Episodio ${episode}`,
    season: 1,
    number: episode,
    episode,
    overview: `Episodio ${episode} de Choushinsei Flashman.`
  };
});

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

    /*
     * NO TOCAR.
     *
     * Esta es la configuración que consiguió
     * que Nuvio mostrara Red y Producción
     * como secciones navegables.
     */
    network: "TV Asahi",
    productionCompany: "Toei Company",

    /*
     * EPISODIOS
     */
    videos: episodes
  };
}

export async function buildMetadata() {
  return getMetadata();
}
