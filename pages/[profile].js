import { useRouter } from "next/router";
import Head from "next/head";
import Navigation from "../components/Navigation";
import ThirdColumn from "../components/ThirdColumn";
import { supabase, fetchProfileFromUsername, fetchFollowingList } from "../utils/supabase";
import { useState, useEffect } from "react";
import MainProfileColumn from "../components/MainProfileColumn";

export default function Profile({ session, loggedInUser }) {
  const router = useRouter();
  const [profileData, setProfileData] = useState("");
  const [following, setFollowing] = useState("");
  const [followers, setFollowers] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const { profile } = router.query;
    fetchData(profile);
  }, [router]);

  const fetchData = async (profile) => {
    const user = await fetchProfileFromUsername(profile);
    if (user) {
      const { following, followers } = await fetchFollowingList(user.id);
      setProfileData(user);
      setFollowing(following);
      setFollowers(followers);
      fetchPosts(user.id);
    } else {
      alert("User not found");
    }
  };

  const fetchPosts = async (id) => {
    setLoading(true);
    try {
      let { data: posts, error } = await supabase
        .from("posts")
        .select("*,profile:posts_user_id_fkey!inner(*),likes:likes_post_id_fkey(*),replies:replies_post_id_fkey(*)")
        .eq("user_id", id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      console.log(posts);
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto grid h-screen grid-cols-12 overflow-hidden bg-black">
      <Head>
        <title>Latest Tweets / Twitter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {loggedInUser && <Navigation className="" user={loggedInUser} />}
      <MainProfileColumn profile={profileData} posts={posts} user={loggedInUser} loading={loading} following={following} followers={followers} />
      <div className="col-span-3 flex h-screen flex-col bg-black p-3 px-4">
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            className="w-full rounded-full bg-white py-3 pl-10 pr-4 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-500"
            placeholder="Search Twitter"
          />
        </div>
        {loggedInUser && <ThirdColumn className="" user={loggedInUser} />}
      </div>
    </div>
  );
}
