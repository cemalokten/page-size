import { createClient } from "@supabase/supabase-js";

const supabase_url = Bun.env.SUPABASE_URL;
const supabase_key = Bun.env.SUPABASE_KEY;

const supabase = createClient(supabase_url as string, supabase_key as string, {
  auth: { persistSession: false },
});

type Database = {
  url: string;
  size: number;
};

export async function insert_url({ url, size }: Database) {
  try {
    const { data } = await supabase
      .from("urls")
      .insert([{ url, size }])
      .select();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function get_url(url: string) {
  try {
    let { data } = await supabase
      .from("urls")
      .select("size, updated_At")
      .eq("url", url);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function update_url(url: string, size: number) {
  try {
    const { data, error } = await supabase
      .from("urls")
      .update({ size })
      .eq("url", url)
      .select();
  } catch (error) {
    console.log(error);
  }
}
