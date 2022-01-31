import Image from "next/image";
import Head from "next/head";
import Navigation from "../components/Navigation";
import ThirdColumn from "../components/ThirdColumn";
import MainTimelineColumn from "../components/MainTimelineColumn";
import { supabase, checkIfProfileExists, addNewProfile } from "../utils/supabase";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Home({ session }) {
  const [loggedInUser, setLoggedInUser] = useState();
  const router = useRouter();

  useEffect(() => {
    getLoggedInUser();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getLoggedInUser() {
    const { data, error } = await supabase.auth.getSessionFromUrl();
    const session = data || supabase.auth.session();
    if (!session) {
      console.log(session);
      router.push("/");
    } else {
      console.log(session);

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
  return (
    <div className="container mx-auto grid h-screen grid-cols-12 overflow-hidden bg-black">
      <Head>
        <title>Latest Tweets / Twitter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {loggedInUser && <Navigation className="" user={loggedInUser} />}
      {loggedInUser && <MainTimelineColumn className="" user={loggedInUser} />}

      <div className="col-span-3 flex h-screen flex-col bg-black p-3 px-4">
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            className="w-full rounded-full bg-white py-3 pl-10 pr-4 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-500"
            placeholder="Search Twitter"
          />
        </div>
        {loggedInUser && <ThirdColumn className="" user={loggedInUser} />}
      </div>
    </div>
  );
}
