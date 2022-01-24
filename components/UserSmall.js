import Image from "next/image";
export default function UserSmall({ name, username, avatar, followStatus }) {
  return (
    <div className="flex justify-between items-center hover:bg-gray-800 rounded-xl p-3 w-full">
      <div className="flex w-full">
        <div>
          <Image alt="" src={`/assets/1490989105-twitter1.png`} width="44" height="44" className="rounded-full" />
        </div>
        <div className="flex flex-col ml-3">
          <p>Name</p>
          <p className="text-gray-500">@username</p>
        </div>
      </div>
      <button className="rounded-full text-black bg-slate-300 p-1 px-5 font-semibold">Follow</button>
    </div>
  );
}
