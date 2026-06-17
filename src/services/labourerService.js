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

export async function getLabourerById(id) {
  const { data, error } = await supabase
    .from("labourers")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  console.log(data)
  return data;
}

export async function updateLabourer(id,labourerData) {
  const { data, error } =
    await supabase
      .from("labourers")
      .update(labourerData)
      .eq("id", id)
      .select();
  if (error) {
    throw error;
  }
  return data;
}

export async function deleteLabourer(id) {
  const { error } = await supabase
    .from("labourers")
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
  return true;
}