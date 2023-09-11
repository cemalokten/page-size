import express from "express";
import cors from "cors";
import { validate_url } from "./middleware/middleware";
import { calculate_total_size } from "./helpers/calculate-page-size";
import { create_svg } from "./helpers/create-svg";

const app = express();
const PORT = Number(Bun.env.PORT) || 8080;
const HOST = Bun.env.HOST || "localhost";

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/api/page-size/:url/:colour?", validate_url, async (req, res) => {
  const url = req.decodedURL;
  try {
    const total = await calculate_total_size(url);
    if (total !== null) {
      res.setHeader("Content-Type", "image/svg+xml");
      const svg = create_svg(total, "red");
      res.status(200).send(svg);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Error generating SVG");
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Listening on port ${HOST}:${PORT}`);
});
