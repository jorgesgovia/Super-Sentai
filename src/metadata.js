export async function getMetadata() {
  return {
    id: "70787",
    type: "series",

    /*
     * IDENTIDAD
     */
    name: "Choushinsei Flashman",

    /*
     * GENEROS
     */
    genres: [
      "Action",
      "Adventure",
      "Science Fiction"
    ],

    /*
     * ========================================================
     * ORIGINAL NETWORK
     * ========================================================
     */

    network: "TV Asahi",

    originalNetwork: "TV Asahi",

    original_network: "TV Asahi",

    networks: [
      {
        name: "TV Asahi"
      }
    ],

    originalNetworks: [
      {
        name: "TV Asahi"
      }
    ],

    original_networks: [
      {
        name: "TV Asahi"
      }
    ],

    /*
     * ========================================================
     * PRODUCTION COMPANY
     * ========================================================
     */

    productionCompany: "Toei Company",

    production_company: "Toei Company",

    productionCompanies: [
      {
        name: "Toei Company"
      }
    ],

    production_companies: [
      {
        name: "Toei Company"
      }
    ],

    /*
     * Algunas estructuras utilizadas por diferentes
     * sistemas de metadata.
     */

    production: {
      company: "Toei Company",
      name: "Toei Company"
    },

    productionCompanyList: [
      "Toei Company"
    ],

    companies: [
      {
        name: "Toei Company",
        type: "production"
      }
    ]
  };
}

export async function buildMetadata() {
  return getMetadata();
}
