import { supabase } from "../utils/supabase";
import TweetItem from "./TweetItem";
import { useEffect, useState } from "react";
export default function Timeline({ user }) {
  const fetchFollowers = async () => {
    try {
      //let { data: posts, error } = await supabase.from("posts").select("*").eq("user_id", user.id).orderBy("created_at", "desc");
      let { data: followers, error } = await supabase.from("followers").select("following_id").eq("user_id", user.id);

      //if (error) throw new Error(error);
      console.log(followers);
      if (followers.length > 0) {
        followers.push({ following_id: user.id });
        fetchPosts(followers);
      }
      if (error) throw error;
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };

  const fetchPosts = async (followers) => {
    try {
      let { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .in(
          "user_id",
          followers.map((follower) => follower.following_id)
        )
        .order("created_at", { ascending: false });
      console.log(posts);
      if (error) throw error;
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };
  useEffect(() => {
    fetchFollowers();
  }, []);
  return (
    <div className="flex flex-col overflow-auto">
      <TweetItem />
      <TweetItem />
      <TweetItem />
      <TweetItem />
      <TweetItem />
      <TweetItem />
      <TweetItem />
    </div>
  );
}
