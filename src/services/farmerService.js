import supabase from "./supabase";

export async function createFarmer(farmerData) {
  const { data, error } = await supabase
    .from("farmers")
    .insert([farmerData])
    .select();
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchFarmers() {
  const { data, error } = await supabase
    .from("farmers")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
  if (error) {
    throw error;
  }
  return data;
}