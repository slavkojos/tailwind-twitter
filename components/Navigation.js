import NavItem from "../components/NavItem";
import Image from "next/image";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

export default function Navigation({ user }) {
  const router = useRouter();
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log("logged out");
      router.push("/");
    }
  }
  return (
    <div className="col-span-3 flex h-screen flex-col items-start justify-between bg-black pl-4 pt-4 lg:pl-40 lg:pt-6">
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
          <button className="mt-4 w-full rounded-3xl bg-sky-500 p-2 py-3 font-semibold text-white transition duration-200 ease-in hover:bg-sky-600">
            Tweet
          </button>
        </div>
      </div>
      <div className="mb-4 flex w-full items-center justify-between rounded-2xl py-2 pr-4 transition duration-200 ease-in hover:bg-slate-800 ">
        <div className="flex w-full items-center">
          <Image src={user.avatar} alt="" width="40" height="40" className="rounded-full" />
          <div className="mx-2 flex w-2/3 flex-col text-white">
            <p>{user.display_name}</p>
            <p className="truncate text-sm text-gray-500">{`@${user.username}`}</p>
          </div>
        </div>
        <button className="flex rounded-full" onClick={logout}>
          <Image src="/assets/logout_white.svg" alt="" width="32" height="32" className="" />
        </button>
      </div>
    </div>
  );
}
