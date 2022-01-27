import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://fhlkhextimngjhecwwrd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyNTM0MDExLCJleHAiOjE5NTgxMTAwMTF9.MWo9ApnWlJEggdXqLVnFmCTof24xnykyC6GwhP5rNP4"
);

export async function signInWithOauth(provider) {
  const { user, session, error } = await supabase.auth.signIn(
    {
      provider: provider,
    },
    {
      redirectTo: "http://localhost:3000/home",
    }
  );
}

export async function signUp(email, password, username, name) {
  const { user, session, error } = await supabase.auth.signUp(
    { redirectTo: "http://localhost:3000/home" },
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
}
