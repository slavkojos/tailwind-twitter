import "../styles/globals.css";
import { useEffect, useState, useRef } from "react";
import { supabase, fetchProfileFromID } from "../utils/supabase";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [messages, setMessages] = useState("");
  useEffect(() => {
    console.log(router);
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        console.log("signed in");
      }
      if (event == "SIGNED_OUT") {
        console.log("sign out");
        setLoggedInUser(null);
      }
    });
    let inboxSubscription;
    if (supabase.auth.user()) {
      inboxSubscription = supabase
        .from(`conversations:recipient_id=eq.${supabase.auth.user().id}`)
        .on("INSERT", (payload) => {
          console.log("inboxSubscription: ", payload);
        })
        .subscribe();
    }
    return () => {
      authListener.unsubscribe();
      supabase.removeSubscription(inboxSubscription);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Component]);
  const getSession = async () => {
    try {
      let session;
      const { data, error } = await supabase.auth.getSessionFromUrl();
      if (error) {
        console.log("error: ", error);
        session = supabase.auth.session();
      } else {
        session = data;
      }
      console.log("session: ", session);
      if (session) {
        const currentUser = await fetchProfileFromID(session.user.id);
        console.log("current uiser", currentUser);
        setLoggedInUser(currentUser);
      } else {
        setLoggedInUser(null);
        router.push("/");
      }
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };

  return <Component {...pageProps} loggedInUser={loggedInUser} messages={messages} setMessages={setMessages} />;
}
export default MyApp;
