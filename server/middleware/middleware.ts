import { NextFunction, Request, Response } from "express";

export function validate_url(req: Request, res: Response, next: NextFunction) {
  try {
    const url = req.params.url;
    const decoded_url = decodeURIComponent(url);
    req.decodedURL = new URL(decoded_url).href;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error decoding URL");
  }
}
