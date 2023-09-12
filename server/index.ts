import express from "express";
import cors from "cors";
import { check_colour } from "./middleware/middleware";
import { create_svg } from "./helpers/create-svg";
import { Colours } from "./helpers/create-svg";

const app = express();
const PORT = Number(Bun.env.PORT) || 8080;
const HOST = Bun.env.HOST || "localhost";

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/api/badge/:size?/:colour?", check_colour, (req, res) => {
  try {
    const colour = req.colour as Colours;
    const size = Number(req.params.size);
    res.setHeader("Content-Type", "image/svg+xml");
    const svg = create_svg(size, colour);
    res.status(200).send(svg);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error generating SVG");
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Listening on port ${HOST}:${PORT}`);
});
