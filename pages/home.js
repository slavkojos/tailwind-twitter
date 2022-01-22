import Image from "next/image";
import Head from "next/head";
import NavItem from "../components/NavItem";
import ActionButton from "../components/ActionButton";
import TweetItem from "../components/TweetItem";
export default function Home() {
  return (
    <div className="container mx-auto grid grid-cols-12 bg-black h-screen">
      <Head>
        <title>Latest Tweets / Twitter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-black col-span-3 h-full flex flex-col items-start pl-4 pt-4 lg:pl-40 lg:pt-6 justify-between">
        <div className="w-full">
          <Image src="/assets/svgexport-3.svg" alt="" width="32" height="32" className="fill-white p-0" />
          <div className="my-4 w-full pr-4">
            <NavItem imageNumber={4} name="Home" />
            <NavItem imageNumber={5} name="Explore" />
            <NavItem imageNumber={6} name="Notifications" />
            <NavItem imageNumber={7} name="Messages" />
            <NavItem imageNumber={8} name="Bookmarks" />
            <NavItem imageNumber={9} name="Lists" />
            <NavItem imageNumber={10} name="Profile" />
            <NavItem imageNumber={11} name="More" />
            <button className="bg-sky-500 hover:bg-sky-600 transition ease-in duration-200 rounded-3xl p-2 py-3 mt-4 text-white w-full font-semibold">
              Tweet
            </button>
          </div>
        </div>
        <div className="w-full flex justify-between items-end mb-4 pr-4 py-2 rounded-2xl hover:bg-slate-800 transition ease-in duration-200 ">
          <div className="flex w-full items-center">
            <Image src="/assets/1490989105-twitter1.png" alt="" width="40" height="40" className="rounded-full" />
            <div className="flex flex-col text-white mx-2">
              <p>User</p>
              <p className="text-gray-500 text-sm">@username</p>
            </div>
          </div>
          <div>
            <Image src="/assets/svgexport-12.svg" alt="" width="32" height="32" className="rounded-full" />
          </div>
        </div>
      </div>
      <div className="border-l-[.005px] border-r-[.005px] border-gray-600 bg-black col-span-5 h-full  flex flex-col">
        <div className="flex justify-between items-center p-3">
          <p className="text-white font-bold">Latest Tweets</p>
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
        <div className="d-flex flex-col">
          <TweetItem />
        </div>
      </div>
      <div className="bg-blue-800 col-span-4 h-full"></div>
    </div>
  );
}
