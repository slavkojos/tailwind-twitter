import Image from "next/image";
import ActionButton from "../components/ActionButton";
import TweetItem from "./TweetItem";
export default function MainTimelineColumn() {
  return (
    <div className="border-l-[.005px] border-r-[.005px] border-gray-600 bg-black col-span-5 h-screen flex flex-col">
      <div className="flex justify-between items-center p-3">
        <p className="text-white font-bold text-xl">Latest Tweets</p>
        <button>
          <Image src="/assets/svgexport-13.svg" width="32" height="32" className="rounded-full" alt="" />
        </button>
      </div>
      <div className="flex my-4 items-center p-3">
        <Image src="/assets/1490989105-twitter1.png" width="64" height="64" className="rounded-full" alt="" />
        <div className="d-flex flex-col mx-4  w-full">
          <input
            type="text"
            className="bg-black py-4 text-white cursor-white focus:ring-transparent focus:outline-none border-b-2 border-gray-600 w-full"
            placeholder="What's happening?"
          />
          <div className="flex my-2 justify-between items-center">
            <div className="flex justify-between items-center">
              <ActionButton buttonNumber={15} />
              <ActionButton buttonNumber={16} />
              <ActionButton buttonNumber={17} />
              <ActionButton buttonNumber={18} />
              <ActionButton buttonNumber={19} />
            </div>
            <button className="bg-sky-500 rounded-full p-2 text-white font-semibold px-5 hover:bg-sky-700 transition ease-in duration-200">
              Tweet
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <TweetItem />
        <TweetItem />
        <TweetItem />
        <TweetItem />
        <TweetItem />
        <TweetItem />
        <TweetItem />
      </div>
    </div>
  );
}
