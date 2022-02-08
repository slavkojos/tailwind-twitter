import Image from "next/image";
import ProfileInfo from "./ProfileInfo";
import ProfileTabPage from "./ProfileTabPage";
import { supabase } from "../utils/supabase";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function MainProfileColumn({ user, posts, profile, loading, following, followers }) {
  return (
    <div className="col-span-5 flex h-screen w-full flex-col overflow-auto border-l-[.005px] border-r-[.005px] border-gray-600 bg-black text-gray-300">
      <div className="sticky top-0 z-20 flex w-full bg-black/80 p-2 backdrop-blur backdrop-brightness-125">
        <Link href="/home">
          <a className="mr-4 opacity-100">
            <Image src="/assets/svgexport-33.svg" width={24} height={24} alt="back-arrow" />
          </a>
        </Link>

        <div className="flex flex-col">
          <p className="font-bold opacity-100 ">{profile.display_name}</p>
          <p className="text-gray-500 opacity-100 ">{posts.length} Tweets</p>
        </div>
      </div>
      {!loading && (
        <div>
          <ProfileInfo user={user} profile={profile} following={following} followers={followers} />

          <ProfileTabPage posts={posts} loading={loading} profile={profile} user={user} />
        </div>
      )}
    </div>
  );
}
