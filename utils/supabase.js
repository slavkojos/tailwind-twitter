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
          preferred_username: username,
          avatar_url: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
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

// export async function addNewProfile(user) {
//   try {
//     const { data, error } = await supabase.from("profiles").insert([
//       {
//         id: user.id,
//         avatar: user.user_metadata.avatar_url || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
//         email: user.user_metadata.email,
//         display_name: user.user_metadata.name,
//         username: user.user_metadata.preferred_username || user.user_metadata.username,
//       },
//     ]);
//     if (error) throw error;
//     return data;
//   } catch (error) {
//     console.error(error.error_description || error.message);
//   }
// }

export async function fetchProfileFromUsername(username) {
  console.log("username: " + username);
  try {
    let { data: profiles, error } = await supabase.from("profiles").select("*").eq("username", username);
    if (error) throw error;
    if (profiles.length > 0) {
      return profiles[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error.error_description || error.message);
  }
}

export async function fetchFollowingList(userID) {
  try {
    //let { data: profiles, error } = await supabase.from("followers").select("*").eq("user_id", userID);
    let { data: profiles, error } = await supabase.from("followers").select("*").or(`user_id.eq.${userID},following_id.eq.${userID}`);
    console.log("profiles fetchFollwoing list", profiles);
    if (error) throw error;
    const following = [];
    const followers = [];
    profiles.forEach((profile) => {
      if (profile.user_id === userID) {
        following.push(profile);
      } else if (profile.following_id === userID) {
        followers.push(profile);
      }
    });
    return { following, followers };
  } catch (error) {
    console.error(error.error_description || error.message);
  }
}

// export async function fetchFollowersList(userID) {
//   try {
//     let { data: profiles, error } = await supabase.from("followers").select("*").eq("following_id", userID);
//     if (error) throw error;
//     return profiles;
//   } catch (error) {
//     console.error(error.error_description || error.message);
//   }
// }
