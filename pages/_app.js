import "../styles/globals.css";
import { useEffect, useState, useRef } from "react";
import { supabase, checkIfProfileExists, addNewProfile } from "../utils/supabase";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState();
  useEffect(() => {
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        setSession(session);
      }
    });
    getLoggedInUser();
    return () => {
      authListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSessionFromUrl();
    const session = data || supabase.auth.session();
    setSession(session);
  };
  async function getLoggedInUser() {
    const { data, error } = await supabase.auth.getSessionFromUrl();
    const session = data || supabase.auth.session();
    if (!session) {
      console.log(session);
      router.push("/");
    } else {
      const existingProfile = await checkIfProfileExists(session.user);
      console.log("existingProfile[0]", existingProfile[0]);
      setLoggedInUser(existingProfile[0]);
      if (existingProfile.length === 0) {
        console.log("adding new profile");
        const profile = addNewProfile(session.user);
        setLoggedInUser(profile);
      }
    }
  }
  return <Component {...pageProps} session={session} loggedInUser={loggedInUser} />;
}
export default MyApp;
