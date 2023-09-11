import { get_assets } from "./get-assets.js";
import { get_size } from "./get-size.js";

export async function calculate_total_size(url: string): Promise<number> {
  try {
    const url_assets: Set<string> = new Set();
    const other_assets: Set<number> = new Set();

    const res: Response = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch URL ${url} with status: ${res.status}`);
    }

    const base_url = new URL(res.url).origin;
    const html_content = await res.text();

    url_assets.add(url);

    get_assets(html_content, url_assets, other_assets, base_url);

    const array_of_sizes = [...url_assets].map((url) => get_size(url));

    const sizes = await Promise.all(array_of_sizes);

    const total_size = sizes.reduce((a, c) => a + Number(c), 0);
    const other_size = [...other_assets].reduce((a, c) => a + c, 0);

    const total = Math.floor((total_size + other_size) / 1024);

    return total;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
