import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://fhlkhextimngjhecwwrd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyNTM0MDExLCJleHAiOjE5NTgxMTAwMTF9.MWo9ApnWlJEggdXqLVnFmCTof24xnykyC6GwhP5rNP4"
);

export async function signUp(email, password, username, name) {
  try {
    const { user, session, error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
      },
      {
        data: {
          name: name,
          username: username,
        },
      }
    );
    if (error) {
      throw error;
    }
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

export async function checkIfProfileExists(user_id) {
  const { data: profiles, error } = await supabase.from("profiles").select("*").in("id", user_id);
  return profiles;
}
