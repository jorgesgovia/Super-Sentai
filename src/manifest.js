export const manifest = {
  id: "com.super-sentai.addon",
  version: "1.0.0",
  name: "Chōshinsei Flashman",
  description:
    "Addon de Stremio para series Super Sentai con metadata estática.",
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
      name: "Chōshinsei Flashman"
    }
  ],
  idPrefixes: [
    "70787"
  ]
};