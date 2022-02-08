import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../utils/supabase";
import Spinner from "../public/assets/spinner.svg";
import Link from "next/link";
export default function UserSmall({ name, username, avatar, followingStatus, userID, user }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(followingStatus);
  const followUser = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("followers").insert([{ user_id: user.id, following_id: userID }]);
      if (error) throw error;
      setStatus((prevState) => !prevState);
      setLoading(false);
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };
  const unfollowUser = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("followers").delete().eq("user_id", user.id).eq("following_id", userID);
      if (error) throw error;
      setStatus((prevState) => !prevState);
      setLoading(false);
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };
  return (
    <div className="flex w-full items-center justify-between rounded-xl p-3 hover:bg-gray-800">
      <Link className="cursor-pointer" href={`/${username}`}>
        <a href="">
          <div className="flex w-full">
            <div>
              <Image alt="" src={avatar} width="44" height="44" className="rounded-full" />
            </div>
            <div className="ml-3 flex w-2/3 flex-col">
              <p className="truncate">{name}</p>
              <p className="truncate text-gray-500 ">{`@${username}`}</p>
            </div>
          </div>
        </a>
      </Link>
      <div>
        {status ? (
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
