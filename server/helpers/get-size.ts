import axios, { AxiosResponse } from "axios";

export async function get_size(url: string): Promise<number> {
  let total = 0;

  let stream: AxiosResponse | undefined;

  try {
    stream = await axios.get(url, {
      responseType: "stream",
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }

  if (!stream) {
    return Promise.reject("Stream is undefined");
  }

  return new Promise((resolve, reject) => {
    stream?.data.on("data", (chunk: any) => {
      total += chunk.length;
    });

    stream?.data.on("end", () => {
      stream?.data.destroy(); // Close the stream
      resolve(total);
    });

    stream?.data.on("error", (error: any) => {
      console.error(`Error while streaming from URL: ${url}`, error);
      stream?.data.destroy(); // Close the stream
      reject(error);
    });
  });
}
