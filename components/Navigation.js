import NavItem from "../components/NavItem";
import Image from "next/image";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log("logged out");
      router.push("/");
    }
  }
  return (
    <div className="bg-black col-span-3 h-screen flex flex-col items-start pl-4 pt-4 lg:pl-40 lg:pt-6 justify-between">
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
      <div className="w-full flex justify-between items-center mb-4 pr-4 py-2 rounded-2xl hover:bg-slate-800 transition ease-in duration-200 ">
        <div className="flex w-full items-center">
          <Image src="/assets/1490989105-twitter1.png" alt="" width="40" height="40" className="rounded-full" />
          <div className="flex flex-col text-white mx-2">
            <p>User</p>
            <p className="text-gray-500 text-sm">@username</p>
          </div>
        </div>
        <button className="flex rounded-full" onClick={logout}>
          <Image src="/assets/logout_white.svg" alt="" width="32" height="32" className="" />
        </button>
      </div>
    </div>
  );
}
