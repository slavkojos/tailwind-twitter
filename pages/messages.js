import Head from "next/head";
import Navigation from "../components/Navigation";
import MessagesColumn from "../components/MessagesColumn";
import ConversationWindow from "../components/ConversationWindow";
import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages, handleInboxMessage } from "../store/messagesSlice";
export default function Messages({ session, loggedInUser }) {
  const [loading, setLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  useEffect(() => {
    dispatch(fetchMessages(supabase.auth.user().id));
    //getMessages()
    let inboxSubscription;
    if (supabase.auth.user()) {
      inboxSubscription = supabase
        .from(`conversations:recipient_id=eq.${supabase.auth.user().id}`)
        .on("INSERT", (payload) => {
          console.log("event for incomin message", payload.new);
          dispatch(handleInboxMessage(payload.new));
        })
        .subscribe();
    }
    return () => {
      supabase.removeSubscription(inboxSubscription);
    };
  }, []);
  const getMessages = async () => {
    setLoading(true);
    let recievedMessages = await fetchMessages(supabase.auth.user().id);
    if (recievedMessages) {
      console.log("messages: ", recievedMessages);
      setMessages(recievedMessages);
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto grid h-screen grid-cols-12 overflow-hidden bg-black">
      <Head>
        <title>Messages / Twitter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {loggedInUser && <Navigation className="" user={loggedInUser} />}
      {loggedInUser && (
        <MessagesColumn messages={messages} loading={loading} loggedInUser={loggedInUser} setSelectedConversation={setSelectedConversation} />
      )}
      {loggedInUser && messages && <ConversationWindow messages={messages} selectedConversation={selectedConversation} loggedInUser={loggedInUser} />}
    </div>
  );
}
