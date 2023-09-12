import axios from "axios";
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export const get_badge_only = async ({
  SIZE,
  COLOUR,
}: {
  SIZE: number;
  COLOUR: string;
}) => {
  try {
    const { data } = await axios.get(`/api/badge/${SIZE}/${COLOUR}`);
    return { data };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const get_size_only = async ({ URL }: { URL: string }) => {
  try {
    const { data } = await axios.get(`/api/calculate-page-size/${URL}`);
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const get_calculate_and_badge = async ({
  URL,
  COLOUR,
}: {
  URL: string;
  COLOUR: string;
}) => {
  try {
    const { data } = await axios.get(
      `/api/calculate-page-size-with-badge/${URL}/${COLOUR}`,
    );
    return { data };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
