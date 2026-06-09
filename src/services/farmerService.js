import supabase from "./supabase";

export const getFarmers = async () => {
  const { data, error } = await supabase
    .from("farmers")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};