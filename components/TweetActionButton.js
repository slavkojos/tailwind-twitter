import Image from "next/image";
import Reply from "../public/assets/svgexport-22.svg";
import TweetActionIcon from "./TweetActionIcon";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
export default function TweetActionButton({ number, hoverColor, icon, textHoverColor, postID, user, likes, count }) {
  const [counter, setCounter] = useState(count);
  const [liked, setLiked] = useState(false);
  const checkIfUserHasLiked = () => {
    if (likes) {
      console.log("likes are here");
      const check = likes.some((like) => like.user_id === user.id);
      check ? setLiked(true) : setLiked(false);
    }
  };
  useEffect(() => {
    checkIfUserHasLiked();
  }, []);
  const triggerTweetAction = async () => {
    if (icon === "like") {
      if (liked === false) {
        try {
          const { data, error } = await supabase.from("likes").insert([{ post_id: postID, user_id: user.id }]);
          if (error) throw error;
          setCounter((prevCount) => prevCount + 1);
          setLiked(true);
        } catch (error) {
          console.error(error.error_description || error.message);
        }
      } else {
        try {
          const { data, error } = await supabase.from("likes").delete().eq("user_id", user.id).eq("post_id", postID);
          if (error) throw error;
          setCounter((prevCount) => prevCount - 1);
          setLiked(false);
        } catch (error) {
          console.error(error.error_description || error.message);
        }
      }
    }
  };
  return (
    <button className={`flex items-center rounded-full pr-2 text-gray-500 ${hoverColor} ${textHoverColor}`} onClick={triggerTweetAction}>
      <TweetActionIcon icon={icon} hoverColor={hoverColor} />
      <span className="mx-2">{counter}</span>
    </button>
  );
}
