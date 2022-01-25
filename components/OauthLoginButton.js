import Spinner from "../public/assets/spinner.svg";
import Google from "../public/assets/google.svg";
import Github from "../public/assets/github.svg";
import { signInWithOauth } from "../utils/supabase";
import { useState } from "react";
export default function OauthLoginButton({ provider }) {
  const chooseProvider = () => {
    switch (provider) {
      case "Google":
        return <Google className="mr-2" />;
      case "Github":
        return <Github className="mr-2" />;
    }
  };
  const [isLoading, setLoading] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        signInWithOauth("google");
        setLoading(true);
      }}
      className="w-1/2 my-2 py-2 px-4 flex justify-center items-center  bg-white hover:bg-gray-200 focus:ring-gray-200 focus:ring-offset-gray-200 text-black transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-3xl "
    >
      {isLoading ? (
        <Spinner className="mx-2 animate-spin" />
      ) : (
        <div className="flex justify-center items-center">
          {chooseProvider()}
          {`Sign in with ${provider}`}
        </div>
      )}
    </button>
  );
}
