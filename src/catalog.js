import { SERIES } from "./series.js";
import { buildMetadata } from "./metadata.js";

export async function getCatalog() {
  const metas = [];

  for (const series of SERIES) {
    try {
      const metadata = await buildMetadata(series);

      metas.push({
        ...metadata,
        type: "series"
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
