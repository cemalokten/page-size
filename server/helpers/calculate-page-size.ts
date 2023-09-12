import axios from "axios";
import { get_assets } from "./get-assets.js";
import { get_size } from "./get-size.js";

export async function calculate_total_size(url: string): Promise<number> {
  try {
    const url_assets: Set<string> = new Set();
    const other_assets: Set<number> = new Set();
    url_assets.add(url);

    const res = await axios.get(url);
    const base_url = new URL(res.config.url as string).origin;

    get_assets(res, url_assets, other_assets, base_url);

    const array_of_sizes = [...url_assets].map((url) => get_size(url));
    const sizes: PromiseSettledResult<number>[] =
      await Promise.allSettled(array_of_sizes);

    const total_size = sizes.reduce((a, c) => {
      if (c.status === "fulfilled") {
        return a + Number(c.value);
      }
      return a;
    }, 0);
    const other_size = [...other_assets].reduce((a, c) => a + c, 0);
    const total = Math.floor((total_size + other_size) / 1024);
    return total;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
