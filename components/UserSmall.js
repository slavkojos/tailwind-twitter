import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../utils/supabase";
import Spinner from "../public/assets/spinner.svg";
export default function UserSmall({ name, username, avatar, followStatus, userID, user }) {
  const [followingStatus, setFollowingStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const followUser = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("followers").insert([{ user_id: user.id, following_id: userID }]);
      if (error) throw error;
      checkIfUserIsFollowing();
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };
  const unfollowUser = async () => {
    try {
      console.log(user.id);
      console.log(userID);
      setLoading(true);
      const { data, error } = await supabase.from("followers").delete().eq("user_id", user.id).eq("following_id", userID);
      console.log(data);
      console.log("trying to delete");
      if (error) throw error;
      checkIfUserIsFollowing();
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };

  const checkIfUserIsFollowing = async () => {
    try {
      const { data, error } = await supabase.from("followers").select("*").eq("user_id", user.id).eq("following_id", userID);
      if (data.length > 0) {
        setFollowingStatus(true);
      } else {
        setFollowingStatus(false);
      }
      if (error) throw error;
      setLoading(false);
      return data;
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };
  useEffect(() => {
    checkIfUserIsFollowing();
  }, []);
  return (
    <div className="flex w-full items-center justify-between rounded-xl p-3 hover:bg-gray-800">
      <div className="flex w-full">
        <div>
          <Image alt="" src={avatar} width="44" height="44" className="rounded-full" />
        </div>
        <div className="ml-3 flex w-2/3 flex-col">
          <p className="truncate">{name}</p>
          <p className="truncate text-gray-500 ">{`@${username}`}</p>
        </div>
      </div>
      <div>
        {followingStatus ? (
          <button onClick={() => unfollowUser()} className="rounded-full bg-slate-300 p-1 px-5 font-semibold text-black">
            {loading ? <Spinner className="mx-2 animate-spin" /> : "Following"}
          </button>
        ) : (
          <button onClick={() => followUser()} className="rounded-full bg-slate-300 p-1 px-5 font-semibold text-black">
            {loading ? <Spinner className="mx-2 animate-spin" /> : "Follow"}
          </button>
        )}
      </div>
    </div>
  );
}
