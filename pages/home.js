import Image from "next/image";
import Head from "next/head";
import Navigation from "../components/Navigation";
import ThirdColumn from "../components/ThirdColumn";
import MainTimelineColumn from "../components/MainTimelineColumn";
import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("user", supabase.auth.user());
    });
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-12 bg-black h-screen overflow-hidden">
      <Head>
        <title>Latest Tweets / Twitter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation className="" />
      <MainTimelineColumn className="" />
      <div className="bg-black col-span-3 h-screen p-3 px-4 flex flex-col">
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white rounded-full dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Search Twitter"
          />
        </div>
        <ThirdColumn className="" />
      </div>
    </div>
  );
}
