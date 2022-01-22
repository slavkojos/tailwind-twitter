import Image from "next/image";
import Reply from "../public/assets/svgexport-22.svg";
import TweetActionIcon from "./TweetActionIcon";
export default function TweetActionButton({ number, hoverColor, icon, textHoverColor }) {
  return (
    <button className={`flex items-center rounded-full pr-2 text-gray-500 ${hoverColor} ${textHoverColor}`}>
      <TweetActionIcon icon={icon} hoverColor={hoverColor} />
      {/* <Image alt="" src={`/assets/svgexport-${buttonNumber}.svg`} width="16" height="16" className="hover:fill-green" /> */}
      <span className="mx-2">{number}</span>
    </button>
  );
}
