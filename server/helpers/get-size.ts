export async function get_size(url: string): Promise<string> {
  try {
    const head = await fetch(url, { method: "HEAD" });
    if (head.status === 404) {
      return "0";
    } else if (!head.ok) {
      throw new Error(
        `Server responded with ${head.status}: ${head.statusText}`,
      );
    }

    const contentLength = head.headers.get("content-length");
    if (contentLength) {
      return contentLength;
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`,
        );
      }
      const reader = response.body!.getReader();
      let total = 0;

      return new Promise<string>((resolve, reject) => {
        function read() {
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                resolve(total.toString());
                return;
              }

              total += value.length;
              read();
            })
            .catch((error) => {
              console.error(`Error while streaming from URL: ${url}`, error);
              reject(error);
            });
        }

        read();
      });
    }
  } catch (error) {
    console.error("Failed to fetch URL", error);
    return "0";
  }
}
