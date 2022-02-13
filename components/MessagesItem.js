import { supabase } from "../utils/supabase";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
export default function MessagesItem({ message, setMessages, loggedInUser }) {
  const realRecipient = () => {
    if (loggedInUser.id === message[0].recipient.id) {
      return message[0].sender;
    } else {
      return message[0].recipient;
    }
  };
  return (
    <button className="flex w-full justify-between rounded-lg py-3 hover:bg-gray-900">
      <div className="flex items-center">
        <div className="mr-3">
          <Image width="48" height="48" src={realRecipient().avatar} alt="avatar" className=" rounded-full" />
        </div>
        <div className="flex flex-col text-left">
          <div>
            <span className="mr-2 font-semibold text-white">{realRecipient().display_name}</span>
            <span className="text-gray-500">@{realRecipient().username}</span>
          </div>
          <p className="text-gray-500">{message[message.length - 1].content}</p>
        </div>
      </div>
      <div>
        <p className="text-gray-500">{formatDistanceToNowStrict(new Date(message[message.length - 1].created_at))} ago</p>
      </div>
    </button>
  );
}
