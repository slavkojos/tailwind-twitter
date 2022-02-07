import Image from "next/image";
import { Tab } from "@headlessui/react";
export default function ProfileInfo({ profile, followers, following }) {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <div className="relative h-56 w-full">
          <Image src="https://placeimg.com/600/200/any" alt="cover-image" layout="fill" />
        </div>
        <div className="absolute top-40 left-4 rounded-full border-2 border-black">
          <Image src={profile.avatar} width="128" alt="avatar" height="128" className="z-10 rounded-full border-4 border-black" />
        </div>
      </div>
      <div className="w-full p-4 px-6 text-right">
        <button className="rounded-full border border-gray-500 p-2 px-4 font-semibold hover:bg-gray-900">Edit profile</button>
      </div>
      <div className="flex w-full flex-col p-3 text-gray-300">
        <div className="flex w-full flex-col">
          <p className="text-xl font-bold">{profile.display_name}</p>
          <p className="text-gray-500">@{profile.username}</p>
        </div>
        <div className="my-2 flex w-full">
          <button className="mr-3 text-gray-500 hover:underline hover:decoration-solid">
            <span className="text-gray-300">{following.length}</span> Following
          </button>
          <button className="mr-3 text-gray-500 hover:underline hover:decoration-solid">
            <span className="text-gray-300">{followers.length}</span> Followers
          </button>
        </div>
        <div className="flex w-full justify-between"></div>
      </div>
    </div>
  );
}
