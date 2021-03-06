import Image from "next/image";
import TweetActionButton from "../components/TweetActionButton";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { formatDistanceToNowStrict } from "date-fns";
export default function TweetItem({ post, profile, user }) {
  return (
    <div className="flex w-full items-start border-t-[0.0000001px]  border-gray-700 p-3 text-white">
      <div className="mr-3">
        <Image alt="" src={profile.avatar} width="64" height="64" className="rounded-full" />
      </div>
      <div className="flex w-full flex-col">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex space-x-1">
            <p>{profile.display_name}</p>
            <p className="text-gray-500">{`@${profile.username}`}</p>
            <p className="text-gray-500">·</p>
            <p className="text-gray-500">{formatDistanceToNowStrict(new Date(post.created_at))}</p>
          </div>
          <button className="flex rounded-full p-1 hover:bg-gray-800">
            <Image alt="" src="/assets/svgexport-31.svg" width="16" height="16" />
          </button>
        </div>
        <div>
          <p>{post.content}</p>
          {post.media && (
            <div className="relative my-3 h-[30rem] w-11/12">
              <Image alt="" src={post.media} layout="fill" className="h-fit rounded-md" />
            </div>
          )}
        </div>

        <div className="mt-4 mb-1 flex w-3/4 justify-between">
          <TweetActionButton
            buttonNumber={22}
            number={1}
            hoverColor="hover:stroke-sky-500"
            textHoverColor="hover:text-sky-500"
            icon="reply"
            count={0}
          />
          <TweetActionButton
            buttonNumber={23}
            number={2}
            hoverColor="hover:stroke-green-600"
            textHoverColor="hover:text-green-500"
            icon="retweet"
            count={0}
          />
          <TweetActionButton
            buttonNumber={24}
            number={3}
            hoverColor="hover:stroke-rose-600"
            textHoverColor="hover:text-rose-500"
            icon="like"
            postID={post.id}
            user={user}
            likes={post.likes}
            count={post.likes.length}
          />
          <TweetActionButton
            buttonNumber={25}
            number=""
            hoverColor="hover:stroke-sky-500"
            textHoverColor="hover:text-sky-500"
            icon="share"
            count={0}
          />
        </div>
      </div>
    </div>
  );
}
