import Spinner from "../public/assets/spinner.svg";
import Google from "../public/assets/google.svg";
import Github from "../public/assets/github.svg";
import Discord from "../public/assets/Discord-Logo-Black.svg";
import Spotify from "../public/assets/Spotify_Icon_RGB_Black.svg";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import { useRouter } from "next/router";
export default function OauthLoginButton({ provider }) {
  const router = useRouter();
  async function signInWithOauth(provider) {
    try {
      const { user, session, error } = await supabase.auth.signIn(
        {
          provider: provider,
        },
        { redirectTo: "http://localhost:3000/home" }
      );
      console.log("error: ", error);
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }
  const chooseProvider = () => {
    switch (provider) {
      case "Google":
        return <Google className="mr-2" />;
      case "Github":
        return <Github className="mr-2" />;
      case "Discord":
        return <Discord className="mr-2" />;
      case "Spotify":
        return <Spotify className="mr-2" />;
    }
  };
  const [isLoading, setLoading] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        signInWithOauth(provider.toLowerCase());
        setLoading(true);
      }}
      className="my-2 flex w-1/2 items-center justify-center rounded-3xl bg-white  py-2 px-4 text-center text-base font-semibold text-black shadow-md transition duration-200 ease-in hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2  focus:ring-offset-gray-200 "
    >
      {isLoading ? (
        <Spinner className="mx-2 animate-spin" />
      ) : (
        <div className="flex items-center justify-center">
          {chooseProvider()}
          {`Sign in with ${provider}`}
        </div>
      )}
    </button>
  );
}
