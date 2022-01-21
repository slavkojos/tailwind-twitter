import Image from "next/image";
import Link from "next/link";

export default function NavItem({ imageNumber, name }) {
  return (
    <Link className="cursor-pointer" href="/">
      <a className="flex my-2 items-center hover:bg-gray-900 rounded-3xl p-2">
        <Image src={`/assets/svgexport-${imageNumber}.svg`} alt="" width="32" height="32" className="fill-white" />
        <p className="ml-4 text-white font-semibold">{name}</p>
      </a>
    </Link>
  );
}
