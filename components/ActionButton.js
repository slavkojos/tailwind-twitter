import Image from "next/image";
import { useRef } from "react";
export default function ActionButton({ buttonNumber, image, setImage }) {
  const fileInputRef = useRef(null);
  const triggerAction = () => {
    if (buttonNumber === 15) {
      fileInputRef.current.click();
    }
  };

  return (
    <button className=" flex rounded-full p-2 hover:bg-gray-800" onClick={triggerAction}>
      <Image alt="" src={`/assets/svgexport-${buttonNumber}.svg`} width="24" height="24" className="" />
      {buttonNumber === 15 && (
        <input
          type="file"
          className="hidden text-sm text-slate-500
          file:mr-4 file:rounded-full file:border-0
        file:bg-violet-50 file:py-2
          file:px-4 file:text-sm
          file:font-semibold file:text-violet-700
        hover:file:bg-violet-100"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
        />
      )}
    </button>
  );
}
