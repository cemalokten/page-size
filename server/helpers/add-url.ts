type AddURL = {
  src: string;
  base_url: string;
  url_assets: Set<String>;
};

export function add_url({ src, base_url, url_assets }: AddURL): void {
  try {
    let resolvedURL;
    const protocol = new URL(base_url)?.protocol;

    if (src.startsWith("//")) {
      const _src = `${protocol}${src}`;
      resolvedURL = new URL(_src, base_url).href;
    } else if (src.startsWith("/")) {
      resolvedURL = new URL(src, base_url).href;
    } else if (src.startsWith("..")) {
      resolvedURL = new URL(src, base_url).href;
    } else {
      resolvedURL = new URL(src).href;
    }
    url_assets.add(resolvedURL);
  } catch (e) {
    console.log(`Invalid URL: ${src}`);
  }
}
