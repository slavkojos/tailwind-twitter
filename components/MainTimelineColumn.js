import Image from "next/image";
import ActionButton from "../components/ActionButton";
import Timeline from "./Timeline";

import { useState } from "react";
import { supabase } from "../utils/supabase";
export default function MainTimelineColumn({ user, session }) {
  const [tweet, setTweet] = useState("");
  const submitTweet = async (tweet, user) => {
    try {
      const { data, error } = await supabase.from("posts").insert([{ content: tweet, user_id: user.id }]);
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };
  return (
    <div className="col-span-5 flex h-screen flex-col border-l-[.005px] border-r-[.005px] border-gray-600 bg-black">
      <div className="flex items-center justify-between p-3">
        <p className="text-xl font-bold text-white">Latest Tweets</p>
        <button>
          <Image src="/assets/svgexport-13.svg" width="32" height="32" className="rounded-full" alt="" />
        </button>
      </div>
      <div className="my-4 flex items-center p-3">
        <Image src={user.avatar} width="64" height="64" className="rounded-full" alt="" />
        <div className="d-flex mx-4 w-full  flex-col">
          <input
            type="text"
            className="cursor-white w-full border-b-2 border-gray-600 bg-black py-4 text-white focus:outline-none focus:ring-transparent"
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
          <div className="my-2 flex items-center justify-between">
            <div className="flex items-center justify-between">
              <ActionButton buttonNumber={15} />
              <ActionButton buttonNumber={16} />
              <ActionButton buttonNumber={17} />
              <ActionButton buttonNumber={18} />
              <ActionButton buttonNumber={19} />
            </div>
            <button
              onClick={() => {
                submitTweet(tweet, user);
                setTweet("");
              }}
              className="rounded-full bg-sky-500 p-2 px-5 font-semibold text-white transition duration-200 ease-in hover:bg-sky-700"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
      <Timeline user={user} />
      <p className="my-3 text-center text-gray-400">No more tweets to show</p>
    </div>
  );
}
