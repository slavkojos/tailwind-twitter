import "../styles/globals.css";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabase";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default MyApp;
