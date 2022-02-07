import Image from "next/image";
import Link from "next/link";

export default function NavItem({ imageNumber, name, destination }) {
  return (
    <Link className="cursor-pointer" href={`/${destination}`}>
      <a className="my-2 flex items-center rounded-3xl py-2 hover:bg-gray-900">
        <Image src={`/assets/svgexport-${imageNumber}.svg`} alt="" width="32" height="32" className="fill-white" />
        <p className="ml-4 text-xl font-normal text-gray-300">{name}</p>
      </a>
    </Link>
  );
}
