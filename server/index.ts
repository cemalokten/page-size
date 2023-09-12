import express from "express";
import cors from "cors";
import { check_colour, validate_url } from "./middleware/middleware";
import { calculate_total_size } from "./helpers/calculate-page-size";
import { create_svg } from "./helpers/create-svg";
import { get_url, insert_url, update_url } from "./db/queries";
import { older_than_days } from "./helpers/check-date";
import { Colours } from "./helpers/create-svg";

const app = express();
const PORT = Number(Bun.env.PORT) || 8080;
const HOST = Bun.env.HOST || "localhost";

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/api/page-size/badge/:size?/:colour?", check_colour, (req, res) => {
  const colour = req.colour as Colours;
  const size = Number(req.params.size);
  res.setHeader("Content-Type", "image/svg+xml");
  const svg = create_svg(size, colour);
  res.status(200).send(svg);
});

app.get(
  "/api/page-size/:url/:colour?",
  check_colour,
  validate_url,
  async (req, res) => {
    const url = req.decodedURL;
    const colour = req.colour as Colours;
    try {
      let size;
      let updated_at;
      const url_exists = await get_url(url);

      if (!url_exists || url_exists.length === 0) {
        size = await calculate_total_size(url);
        await insert_url({ url, size });
      } else if (url_exists) {
        [{ size, updated_At: updated_at }] = url_exists;
      }

      if (!older_than_days(updated_at, 30)) {
        size = await calculate_total_size(url);
        await update_url(url, size);
      }

      if (size !== null) {
        res.setHeader("Content-Type", "image/svg+xml");
        const svg = create_svg(size, colour);
        res.status(200).send(svg);
      }
    } catch (e) {
      console.log(e);
      res.status(400).send("Error generating SVG");
    }
  },
);

app.listen(PORT, HOST, () => {
  console.log(`Listening on port ${HOST}:${PORT}`);
});
