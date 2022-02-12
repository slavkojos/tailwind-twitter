import "../styles/globals.css";
import { useEffect, useState, useRef } from "react";
import { supabase, fetchProfileFromID } from "../utils/supabase";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
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
        session = supabase.auth.session();
      } else {
        session = data;
      }
      console.log("session: ", session);
      if (session) {
        console.log("session valid", session);
        const currentUser = await fetchProfileFromID(session.user.id);
        setLoggedInUser(currentUser);
      } else {
        setLoggedInUser(null);
        router.push("/");
      }
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  };

  return <Component {...pageProps} loggedInUser={loggedInUser} />;
}
export default MyApp;
