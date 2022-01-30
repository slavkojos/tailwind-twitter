import "../styles/globals.css";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabase";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  useEffect(() => {
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        setSession(session);
      }
    });
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
  return <Component {...pageProps} session={session} />;
}
export default MyApp;
