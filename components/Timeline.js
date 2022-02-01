import { supabase } from "../utils/supabase";
import TweetItem from "./TweetItem";
import { useEffect, useState } from "react";
export default function Timeline({ user }) {
  const [posts, setPosts] = useState();
  const fetchFollowers = async () => {
    try {
      //let { data: posts, error } = await supabase.from("posts").select("*").eq("user_id", user.id).orderBy("created_at", "desc");
      let { data: followers, error } = await supabase.from("followers").select("following_id").eq("user_id", user.id);

      //if (error) throw new Error(error);
      console.log(followers);

      if (error) throw error;
      followers.push({ following_id: user.id });
      fetchPosts(followers);
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };

  const fetchPosts = async (followers) => {
    try {
      let { data: posts, error } = await supabase
        .from("posts")
        .select("*,profile:posts_user_id_fkey!inner(*),likes:likes_post_id_fkey(*)")
        .in(
          "posts.user_id",
          followers.map((follower) => follower.following_id)
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      console.log("Posts", posts);
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFollowers();
  }, []);
  return (
    <div className="flex flex-col overflow-auto">
      {posts && posts.map((post) => <TweetItem key={post.id} post={post} profile={post.profile} user={user} />)}
    </div>
  );
}
