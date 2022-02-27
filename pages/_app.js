import "../styles/globals.css";
import { useEffect, useState } from "react";
import { supabase, fetchProfileFromID } from "../utils/supabase";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "../store/index";
import { fetchMessages } from "../store/messagesSlice";
import { useSelector, useDispatch } from "react-redux";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  //const dispatch = useDispatch();
  //const [messages, setMessages] = useState("");
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

    return () => {
      authListener.unsubscribe();
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

  return (
    <Provider store={store}>
      <Component {...pageProps} loggedInUser={loggedInUser} />
    </Provider>
  );
}
export default MyApp;
