import { supabase } from "../utils/supabase";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function MessagesItem({ message, setMessages, loggedInUser, setSelectedConversation, index }) {
  const getRealRecipient = () => {
    if (loggedInUser.id === message[0].recipient.id) {
      return message[0].sender;
    } else {
      return message[0].recipient;
    }
  };
  return (
    <button
      className="flex h-fit w-full items-center justify-between rounded-lg py-3 hover:bg-gray-900"
      onClick={() => setSelectedConversation(index)}
    >
      <div className="flex w-3/4 items-center">
        <div className="mr-3">
          <Image width="48" height="48" src={getRealRecipient().avatar} alt="avatar" className=" rounded-full" />
        </div>
        <div className="flex w-1/2 flex-col text-left">
          <div>
            <span className="mr-2 truncate font-semibold text-white">{getRealRecipient().display_name}</span>
            <span className="truncate text-gray-500">@{getRealRecipient().username}</span>
          </div>
          <p className="truncate text-gray-500">{message[message.length - 1].content}</p>
        </div>
      </div>
      <div>
        <p className="truncate text-sm text-gray-500">{formatDistanceToNowStrict(new Date(message[message.length - 1].created_at))} ago</p>
      </div>
    </button>
  );
}
