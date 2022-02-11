import "../styles/globals.css";
import { useEffect, useState, useRef } from "react";
import { supabase, checkIfProfileExists, addNewProfile } from "../utils/supabase";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  //const [session, setSession] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    console.log("useeffect in app.js");
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
  }, [router]);
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSessionFromUrl();
    const session = data || supabase.auth.session();
    console.log("session: ", session);
    if (session) {
      console.log("session valid", session);
      getLoggedInUser(session);
    }
  };
  async function getLoggedInUser(session) {
    if (!session) {
      router.push("/");
    } else {
      const existingProfile = await checkIfProfileExists(session.user);
      console.log("existingProfile[0]", existingProfile[0]);
      setLoggedInUser(existingProfile[0]);
      if (existingProfile.length === 0) {
        console.log("adding new profile");
        const profile = await addNewProfile(session.user);
        setLoggedInUser(profile);
      }
    }
  }
  return <Component {...pageProps} loggedInUser={loggedInUser} />;
}
export default MyApp;
