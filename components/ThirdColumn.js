import UserSmall from "./UserSmall";
export default function ThirdColumn({ title }) {
  return (
    <div className="py-2 px-1 flex flex-col text-white bg-gray-900 rounded-2xl my-4">
      <p className="font-extrabold text-xl mb-3 p-3">Who to follow</p>
      <div className="flex flex-col">
        <UserSmall />
        <UserSmall />
        <UserSmall />
      </div>
    </div>
  );
}
