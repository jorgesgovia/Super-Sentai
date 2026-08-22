import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 7070;

app.get("/manifest.json", (req, res) => {
  res.json({
    id: "org.super-sentai.nuvio",
    version: "1.0.0",
    name: "Chōshinsei Flashman",
    description: "Chōshinsei Flashman para Nuvio",
    resources: ["catalog", "meta", "stream"],
    types: ["series"],
    catalogs: [
      {
        type: "series",
        id: "super-sentai",
        name: "Chōshinsei Flashman"
      }
    ],
    idPrefixes: ["super-sentai-"]
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Super Sentai escuchando en http://localhost:${PORT}`);
});