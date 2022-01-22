import Image from "next/image";
export default function ActionButton({ buttonNumber }) {
  return (
    <button className=" hover:bg-gray-800 p-2 flex rounded-full">
      <Image alt="" src={`/assets/svgexport-${buttonNumber}.svg`} width="24" height="24" className="" />
    </button>
  );
}
