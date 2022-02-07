import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import ProfileTab from "./ProfileTab";
import Spinner from "../public/assets/Rolling-1s-200px.svg";
import TweetItem from "./TweetItem";

export default function MyTabs({ posts, loading, user }) {
  return (
    <Tab.Group as="div" className="">
      <Tab.List as="div" className="flex w-full justify-center">
        <ProfileTab title="Tweets" />
        <ProfileTab title="Tweets & replies" />
        <ProfileTab title="Media" />
        <ProfileTab title="Likes" />
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <div className="flex flex-col items-center ">
            {loading ? (
              <Spinner className="h-1/3 w-1/3" />
            ) : (
              <div className="w-full">
                {posts.map((post) => (
                  <TweetItem key={post.id} post={post} profile={post.profile} user={user} />
                ))}
                <p className="my-3 text-center text-gray-400">No more tweets to show</p>
              </div>
            )}
          </div>
        </Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
        <Tab.Panel>Content 4</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
