import Image from "next/image";
export default function ActionButton({ buttonNumber }) {
  const addImageToTweet = () => {
    return;
  };
  if (buttonNumber === 15) {
    addImageToTweet();
  }

  return (
    <button className=" flex rounded-full p-2 hover:bg-gray-800">
      <Image alt="" src={`/assets/svgexport-${buttonNumber}.svg`} width="24" height="24" className="" />
    </button>
  );
}
