import jsdom from "jsdom";
import { add_url } from "./add-url";
import { extract_background_URL } from "./extract-background-url";
import { add_other_sizes } from "./add-other-sizes";
import { AxiosResponse } from "axios";

export function get_assets(
  res: AxiosResponse,
  url_assets: Set<String>,
  other_assets: Set<Number>,
  base_url: string,
) {
  let DOM;

  try {
    const { JSDOM } = jsdom;
    const virtualConsole = new jsdom.VirtualConsole();

    DOM = new JSDOM(res.data, { virtualConsole });

    const pictures = new Set([
      ...DOM.window.document.querySelectorAll("picture"),
    ]);
    const images = new Set([
      ...DOM.window.document.querySelectorAll(":not(picture) > img"),
    ]);
    const backgroundImages = new Set([
      ...DOM.window.document.querySelectorAll('[style*="background-image"]'),
    ]);
    const favicons = new Set([
      ...DOM.window.document.querySelectorAll("link[rel~='icon']"),
    ]);
    const scripts = new Set([
      ...DOM.window.document.querySelectorAll("script"),
    ]);

    if (pictures.size > 0) {
      for (let picture of pictures) {
        const source = picture.querySelectorAll("source");
        const src = source[0].srcset.split(" ")[0];
        if (src && src.trim() !== "") {
          add_url({ src, base_url, url_assets });
        }
      }
    }

    if (images.size > 0) {
      for (const image of images) {
        const src = image.getAttribute("src");
        if (src && src.trim() !== "") {
          add_url({ src, base_url, url_assets });
        }
      }
    }

    if (backgroundImages.size > 0) {
      for (const backgroundImage of backgroundImages) {
        const style = backgroundImage.getAttribute("style");
        const src = extract_background_URL(style);
        if (src && src.trim() !== "") {
          add_url({ src, base_url, url_assets });
        }
      }
    }

    for (const icon of favicons) {
      const href = icon.getAttribute("href");
      if (href?.startsWith("data")) {
        const base64 = icon.getAttribute("href")?.split(",")[1];
        if (base64) {
          const total_size_bytes = (base64.length * 6 * 8) / 8;
          add_other_sizes(total_size_bytes, other_assets);
        }
      } else if (href !== null) {
        const src = href;
        add_url({ src, base_url, url_assets });
      }
    }

    if (scripts.size > 0) {
      for (const script of scripts) {
        const src = script.getAttribute("src");
        if (src && src.trim() !== "") {
          add_url({ src, base_url, url_assets });
        }
      }
    }
  } catch (error) {
    console.error("Error while processing the DOM");
  } finally {
    if (DOM && DOM.window) {
      DOM.window.close();
    }
    DOM = null;
  }
}
