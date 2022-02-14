import Info from "../public/assets/svgexport-36.svg";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import IncomingMessage from "../components/IncomingMessage";
import OutgoingMessage from "../components/OutgoingMessage";
import AttachImageIcon from "../public/assets/svgexport-15.svg";
import AttachGifIcon from "../public/assets/svgexport-16.svg";
import SendIcon from "../public/assets/svgexport-37.svg";
import { supabase } from "../utils/supabase";
export default function ConversationWindow({ selectedConversation, loggedInUser, messages, setMessages }) {
  useEffect(() => {
    if (selectedConversation !== null) {
      divRef.current.scrollIntoView();
    }
  }, [selectedConversation]);

  const [inputMessage, setInputMessage] = useState("");
  const divRef = useRef();
  const getRealRecipient = () => {
    //console.log("message received", messages[selectedConversation][0]);
    if (loggedInUser.id === messages[selectedConversation][0].sender.id) {
      return messages[selectedConversation][0].recipient;
    } else {
      return messages[selectedConversation][0].sender;
    }
  };
  const handleSendMessage = async () => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .insert([{ sender_id: loggedInUser.id, recipient_id: getRealRecipient().id, content: inputMessage }]);
      if (error) throw error;
      //alert("Message sent!");
      setInputMessage("");
      const { data: record, error: selectError } = await supabase
        .from("conversations")
        .select("id,created_at,content,media,seen,sender:conversations_sender_id_fkey(*),recipient:conversations_recipient_id_fkey(*)")
        .eq("id", data[0].id);
      if (selectError) throw new Error(selectError);
      setMessages((prevState) => {
        console.log("record", record);
        const messages = prevState;
        messages[selectedConversation].push(record[0]);
        console.log("messages123213", messages);
        return [...messages];
      });
      console.log(divRef);
      divRef.current.scrollIntoView();
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };
  if (selectedConversation === null) {
    return (
      <div className="col-span-5 flex items-center justify-center border-r-[.005px] border-gray-600">
        <div className="flex flex-col text-gray-300">
          <h2 className="w-1/2 text-3xl font-extrabold">You don&apos;t have a message selected</h2>
          <p className="my-2 w-3/4 text-gray-500">Choose one from your existing messages,or start a new one</p>
          <button className="my-2 w-1/3 rounded-full bg-sky-500 py-3 px-2 font-bold text-white hover:bg-sky-400">New message</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-span-5 flex h-screen w-full flex-col border-r-[.005px] border-gray-600 text-white">
        <div className="sticky top-0 left-0 right-0 flex h-fit w-full items-center justify-between bg-gray-900 p-1">
          <div className="flex w-full">
            <div className="mr-2">
              <Image src={getRealRecipient().avatar} width="40" height="40" alt="avatar" className="rounded-full" />
            </div>
            <div className="flex flex-col">
              <h5 className="font-bold">{getRealRecipient().display_name}</h5>
              <p className="text-sm text-gray-500">@{getRealRecipient().username}</p>
            </div>
          </div>
          <div>
            <Info />
          </div>
        </div>
        <div className="flex h-full flex-col overflow-y-auto scroll-smooth bg-black p-3">
          {messages[selectedConversation].map((message, index) => {
            return loggedInUser.id === message.sender.id ? (
              <OutgoingMessage key={index} content={message.content} timestamp={message.created_at} />
            ) : (
              <IncomingMessage key={index} content={message.content} timestamp={message.created_at} avatar={message.sender.avatar} />
            );
          })}
          <div ref={divRef}></div>
        </div>
        <div className="flex h-fit w-full items-center bg-gray-800 py-3">
          <div className="flex px-2">
            <AttachImageIcon className="mx-2" />
            <AttachGifIcon className="mx-2" />
          </div>
          <input
            type="text"
            className="w-full rounded-2xl bg-black p-2 text-gray-300 "
            placeholder="Start a new message"
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button className="mx-2 rounded-full p-2 hover:bg-gray-700" onClick={handleSendMessage}>
            <SendIcon />
          </button>
        </div>
      </div>
    );
  }
}
