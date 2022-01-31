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
          email: email,
          name: name,
          username: username,
          avatar_url: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        },
      }
    );
    if (error) {
      throw error;
    }
    addNewProfile(user);
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

export async function signInWithOauth(provider) {
  try {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: provider,
      },
      { redirectTo: "http://localhost:3000/home" }
    );
    console.log("error: ", error);
    if (error) throw error;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

export async function checkIfProfileExists(user) {
  try {
    let { data: profiles, error } = await supabase.from("profiles").select("*").eq("id", user.id);
    if (error) throw error;
    return profiles;
  } catch (error) {
    console.error(error.error_description || error.message);
  }
}

export async function addNewProfile(user) {
  try {
    const { data, error } = await supabase.from("profiles").insert([
      {
        id: user.id,
        avatar: user.user_metadata.avatar_url || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        email: user.user_metadata.email,
        display_name: user.user_metadata.name,
        username: user.user_metadata.provider_id || user.user_metadata.username,
      },
    ]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error.error_description || error.message);
  }
}
