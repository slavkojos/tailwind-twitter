import Image from "next/image";
import NavItem from "../components/NavItem";
export default function Home() {
  return (
    <div className="container mx-auto grid grid-cols-12 bg-black h-screen">
      <div className="border bg-black col-span-3 h-full flex flex-col items-start pl-4 pt-4 lg:pl-40 lg:pt-6">
        <Image src="/assets/svgexport-3.svg" alt="" width="32" height="32" className="fill-white" />
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
      <div className="border bg-blue-700 col-span-5 h-full"></div>
      <div className="border bg-blue-800 col-span-4 h-full"></div>
    </div>
  );
}
