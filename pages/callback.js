import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function Callback({ session }) {
  useEffect(() => {
    console.log(session);
  }, []);
  return <div>Loading...</div>;
}
