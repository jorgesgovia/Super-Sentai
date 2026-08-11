import { SERIES } from "./series.js";
import { buildMetadata } from "./metadata.js";

export async function getCatalog() {
  const metas = [];

  for (const series of SERIES) {
    try {
      const metadata = await buildMetadata(series);

      metas.push({
        id: metadata.id,
        type: "series",
        name: metadata.name,
        poster: metadata.poster,
        background: metadata.background,
        description: metadata.description,
        releaseInfo: metadata.releaseInfo,
        imdbRating: metadata.imdbRating,
        tmdbRating: metadata.tmdbRating
      });
    } catch (error) {
      console.error(
        `Error creando metadata para ${series.name}:`,
        error.message
      );
    }
  }

  return metas;
}