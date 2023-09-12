import { NextFunction, Request, Response } from "express";

export function validate_url(req: Request, res: Response, next: NextFunction) {
  try {
    const url = req.params.url;
    const decoded_url = decodeURIComponent(url);
    req.decodedURL = new URL(decoded_url).href;
    next();
  } catch (err) {
    console.error(err);
    return res.status(400).send("Error decoding URL");
  }
}

export function check_colour(req: Request, res: Response, next: NextFunction) {
  let colour = req.params.colour || "purple";
  const colours = [
    "purple",
    "green",
    "red",
    "orange",
    "blue",
    "darkgreen",
    "darkblue",
    "grey",
  ];

  if (!colours.includes(colour)) colour = "purple";

  req.colour = colour;
  next();
}
