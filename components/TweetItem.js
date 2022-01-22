import Image from "next/image";
import TweetActionButton from "../components/TweetActionButton";
export default function TweetItem() {
  return (
    <div className="text-white border-t-[.005px] border-b-[.005px] border-gray-600 flex items-start p-3 w-full">
      <div className="mr-3 w-1/12">
        <Image alt="" src={`/assets/1490989105-twitter1.png`} width="44" height="44" className="rounded-full" />
      </div>
      <div className="flex flex-col w-full">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex space-x-1">
            <p>Name</p>
            <p className="text-gray-500">@username</p>
            <p className="text-gray-500">·</p>
            <p className="text-gray-500">2h</p>
          </div>
          <button className="rounded-full flex hover:bg-gray-800 p-1">
            <Image alt="" src="/assets/svgexport-31.svg" width="16" height="16" />
          </button>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum velSDSit nobis odit! Illum est
          temporasdsssssssssssssssssssssssssssssssssssssssssssssLorem ipsum dolor sit amet consectetur adipisicing elit. Cum velSDSit nobis odit!
          Illum est tempo
        </p>
        <div className="flex my-2 justify-between w-3/4">
          <TweetActionButton buttonNumber={22} number={1} hoverColor="hover:stroke-sky-500" textHoverColor="hover:text-sky-500" icon="reply" />
          <TweetActionButton buttonNumber={23} number={2} hoverColor="hover:stroke-green-600" textHoverColor="hover:text-green-500" icon="retweet" />
          <TweetActionButton buttonNumber={24} number={3} hoverColor="hover:stroke-rose-600" textHoverColor="hover:text-rose-500" icon="like" />
          <TweetActionButton buttonNumber={25} number="" hoverColor="hover:stroke-sky-500" textHoverColor="hover:text-sky-500" icon="share" />
        </div>
      </div>
    </div>
  );
}
