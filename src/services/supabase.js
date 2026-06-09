import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

async function fetchFarmers(){
  const farmers = await supabase.from("farmers").select("*");
  return farmers;
}

export { fetchFarmers };
export default supabase;