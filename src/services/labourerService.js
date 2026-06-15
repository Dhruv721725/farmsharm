import supabase from "./supabase";

export async function createLabourer(labourerData) {  
    const { data, error } = await supabase
    .from("labourers")
    .insert([labourerData])
    .select();

  if (error) {
    throw error;
  }
  return data;
}

export async function fetchLabourers() {
  const { data, error } = await supabase
    .from("labourers")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) {
    throw error;
  }
  return data;
}

