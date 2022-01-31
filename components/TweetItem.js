import Image from "next/image";
import TweetActionButton from "../components/TweetActionButton";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { formatDistanceToNowStrict } from "date-fns";
export default function TweetItem({ post }) {
  const [authorInfo, setAuthorInfo] = useState();
  useEffect(() => {
    fetchPostAuthor();
  }, []);

  const fetchPostAuthor = async () => {
    try {
      let { data: profiles, error } = await supabase.from("profiles").select("*").eq("id", post.user_id);
      if (error) throw error;
      console.log(profiles[0]);
      setAuthorInfo(profiles[0]);
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };
  return (
    <div>
      {authorInfo && (
        <div className="flex w-full items-start border-t-[.005px] border-b-[.005px] border-gray-600 p-3 text-white">
          <div className="mr-3">
            <Image alt="" src={authorInfo.avatar} width="64" height="64" className="rounded-full" />
          </div>
          <div className="flex w-full flex-col">
            <div className="mb-1 flex items-center justify-between">
              <div className="flex space-x-1">
                <p>{authorInfo.display_name}</p>
                <p className="text-gray-500">{`@${authorInfo.username}`}</p>
                <p className="text-gray-500">·</p>
                <p className="text-gray-500">{formatDistanceToNowStrict(new Date(post.created_at))}</p>
              </div>
              <button className="flex rounded-full p-1 hover:bg-gray-800">
                <Image alt="" src="/assets/svgexport-31.svg" width="16" height="16" />
              </button>
            </div>
            <p>{post.content}</p>
            <div className="my-2 flex w-3/4 justify-between">
              <TweetActionButton buttonNumber={22} number={1} hoverColor="hover:stroke-sky-500" textHoverColor="hover:text-sky-500" icon="reply" />
              <TweetActionButton
                buttonNumber={23}
                number={2}
                hoverColor="hover:stroke-green-600"
                textHoverColor="hover:text-green-500"
                icon="retweet"
              />
              <TweetActionButton buttonNumber={24} number={3} hoverColor="hover:stroke-rose-600" textHoverColor="hover:text-rose-500" icon="like" />
              <TweetActionButton buttonNumber={25} number="" hoverColor="hover:stroke-sky-500" textHoverColor="hover:text-sky-500" icon="share" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
