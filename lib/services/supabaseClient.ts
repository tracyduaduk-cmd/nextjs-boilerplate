import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jwetpisuobxyypgofvsd.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_V2XOxQZ4E5Cytj5QlOC0uA_O1UVrmaA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
