import { supabase } from "../utils/supabase";
import TweetItem from "./TweetItem";
import { useEffect, useState, useCallback } from "react";
import { post } from "@supabase/gotrue-js/dist/main/lib/fetch";
export default function Timeline({ user }) {
  const [posts, setPosts] = useState([]);

  const updateLikes = (payload) => {
    if (payload.eventType === "DELETE") {
      setPosts((existingPosts) => {
        const postIndex = existingPosts.findIndex((post) => post.id === payload.old.post_id);
        const updatedLikes = existingPosts[postIndex].likes.filter((like) => like.id !== payload.old.id);
        delete existingPosts[postIndex].likes;
        existingPosts[postIndex].likes = updatedLikes;
        return [...existingPosts];
      });
    }
    if (payload.eventType === "INSERT") {
      setPosts((existingPosts) => {
        const updatedPosts = existingPosts.map((post) => {
          if (post.id === payload.new.post_id) post.likes.push(payload.new);
          return post;
        });
        return [...updatedPosts];
      });
    }
  };

  const fetchFollowers = async () => {
    try {
      let { data: followers, error } = await supabase.from("followers").select("following_id").eq("user_id", user.id);
      if (error) throw error;
      followers.push({ following_id: user.id });
      fetchPosts(followers);
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };

  const fetchPosts = async (followers) => {
    console.log("fetching posts");
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
    const postsSubscription = supabase
      .from("posts")
      .on("INSERT", (payload) => {
        fetchPosts(following);
      })
      .subscribe();
    const likesSubscription = supabase
      .from("likes")
      .on("INSERT", (payload) => {
        updateLikes(payload);
      })
      .on("DELETE", (payload) => {
        updateLikes(payload);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(postsSubscription);
      supabase.removeSubscription(likesSubscription);
    };
  }, []);

  return (
    <div className="flex flex-col overflow-auto">
      {posts && posts.map((post) => <TweetItem key={post.id} post={post} profile={post.profile} user={user} />)}
      <p className="my-3 text-center text-gray-400">No more tweets to show</p>
    </div>
  );
}
