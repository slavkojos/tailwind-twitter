import UserSmall from "./UserSmall";
import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";
export default function ThirdColumn({ title, user }) {
  const [profilesToFollow, setProfilesToFollow] = useState([]);
  const fetchProfiles = async () => {
    try {
      let { data: profiles, error } = await supabase.from("profiles").select("*").neq("id", user.id); //gets all profiles except logged in user
      if (error) throw error;
      let { data: following, error: followingError } = await supabase.from("followers").select("following_id").eq("user_id", user.id); //gets a list of id's of profiles the logged in user is following
      if (followingError) throw followingError;
      const profilesWithFollowingStatus = profiles.map((profile) => {
        const isFollowing = following.some((following) => following.following_id === profile.id);
        isFollowing ? (profile.followStatus = true) : (profile.followStatus = false);
        return profile;
      });
      console.log(profilesWithFollowingStatus);
      setProfilesToFollow(profilesWithFollowingStatus);
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };
  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="my-4 flex flex-col rounded-2xl bg-gray-900 py-2 px-1 text-white">
      <p className="mb-3 p-3 text-xl font-extrabold">Who to follow</p>
      <div className="flex flex-col">
        {profilesToFollow &&
          profilesToFollow.map((profile, index) => {
            return (
              <UserSmall
                key={index}
                name={profile.display_name}
                username={profile.username}
                avatar={profile.avatar}
                followingStatus={profile.followStatus}
                userID={profile.id}
                user={user}
              />
            );
          })}
      </div>
    </div>
  );
}
