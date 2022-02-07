import NavItem from "../components/NavItem";
import Image from "next/image";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Spinner from "../public/assets/spinner.svg";

export default function Navigation({ user }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const avatarRef = useRef();
  async function logout() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setLoading(false);
      console.log("logged out");
      router.push("/");
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }
  const changeAvatar = async (image) => {
    const file = image;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    try {
      const { data, error } = await supabase.storage.from("avatars").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { publicURL, error: urlError } = supabase.storage.from("avatars").getPublicUrl(filePath);
      if (urlError) throw urlError;
      const { profile, error: updateError } = await supabase.from("profiles").update({ avatar: publicURL }).eq("id", user.id);
      if (updateError) throw updateError;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };
  return (
    <div className="col-span-3 flex h-screen flex-col items-start justify-between bg-black pl-4 pt-4 lg:pl-40 lg:pt-6">
      <div className="w-full">
        <Image src="/assets/svgexport-3.svg" alt="" width="32" height="32" className="fill-white p-0" />
        <div className="my-4 w-full pr-4">
          <NavItem imageNumber={4} name="Home" destination="home" />
          <NavItem imageNumber={5} name="Explore" destination="home" />
          <NavItem imageNumber={6} name="Notifications" destination="home" />
          <NavItem imageNumber={7} name="Messages" destination="home" />
          <NavItem imageNumber={8} name="Bookmarks" destination="home" />
          <NavItem imageNumber={9} name="Lists" destination="home" />
          <NavItem imageNumber={10} name="Profile" destination={user.username} />
          <NavItem imageNumber={11} name="More" destination="home" />
          <button className="mt-4 w-full rounded-3xl bg-sky-500 p-2 py-3 font-semibold text-white transition duration-200 ease-in hover:bg-sky-600">
            Tweet
          </button>
        </div>
      </div>
      <div className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-2xl py-2 pr-4 transition duration-200 ease-in hover:bg-slate-800">
        <div className="flex w-full items-center">
          <Image src={user.avatar} alt="" width="40" height="40" className="rounded-full" onClick={() => avatarRef.current.click()} />
          <input type="file" ref={avatarRef} className="hidden" onChange={(e) => changeAvatar(e.target.files[0])} />
          <div className="mx-2 flex w-2/3 flex-col text-white">
            <p>{user.display_name}</p>
            <p className="truncate text-sm text-gray-500">{`@${user.username}`}</p>
          </div>
        </div>
        {loading ? (
          <Spinner className="animate-spin fill-white" />
        ) : (
          <button className="flex rounded-full" onClick={logout}>
            <Image src="/assets/logout_white.svg" alt="" width="32" height="32" className="" />
          </button>
        )}
      </div>
    </div>
  );
}
