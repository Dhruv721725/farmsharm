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

export async function getFarmerById(id) {
  const { data, error } = await supabase
    .from("farmers")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function updateFarmer(id,farmerData) {
  const { data, error } =
    await supabase
      .from("farmers")
      .update(farmerData)
      .eq("id", id)
      .select();
  if (error) {
    throw error;
  }
  return data;
}

export async function deleteFarmer(id) {
  const { error } = await supabase
    .from("farmers")
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
  return true;
}