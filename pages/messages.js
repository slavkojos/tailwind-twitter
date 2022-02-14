import Head from "next/head";
import Navigation from "../components/Navigation";
import MessagesColumn from "../components/MessagesColumn";
import ConversationWindow from "../components/ConversationWindow";
import { supabase, fetchMessages } from "../utils/supabase";
import { useEffect, useState } from "react";

export default function Messages({ session, loggedInUser, messages, setMessages }) {
  const [loading, setLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  useEffect(() => {
    getMessages();
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
        <MessagesColumn
          messages={messages}
          setMessages={setMessages}
          loading={loading}
          loggedInUser={loggedInUser}
          setSelectedConversation={setSelectedConversation}
        />
      )}
      {loggedInUser && messages && (
        <ConversationWindow messages={messages} setMessages={setMessages} selectedConversation={selectedConversation} loggedInUser={loggedInUser} />
      )}
    </div>
  );
}
