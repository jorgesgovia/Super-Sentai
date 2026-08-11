export const manifest = {
  id: "com.super-sentai.addon",
  version: "1.0.0",
  name: "Super Sentai Addon",
  description:
    "Addon de Stremio para series Super Sentai con metadata de TMDB y MDBList.",
  logo: "https://image.tmdb.org/t/p/original/mKoZUWBPMRa7sFBWMPuusTBBmS1.jpg",
  resources: [
    "catalog",
    "meta",
    "stream"
  ],
  types: [
    "series"
  ],
  catalogs: [
    {
      type: "series",
      id: "super-sentai",
      name: "Super Sentai"
    }
  ],
  idPrefixes: [
    "super-sentai-"
  ]
};