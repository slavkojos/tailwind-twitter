import { format } from "date-fns";
import Image from "next/image";
export default function IncomingMessage({ timestamp, content, avatar }) {
  return (
    <div className="flex h-fit w-fit flex-col">
      <div className="flex items-center">
        <div className="mr-2">
          <Image src={avatar} height="32" width="32" alt="avatar" className="rounded-full" />
        </div>
        <div>
          <div className="rounded-t-lg rounded-r-lg rounded-br-lg bg-gray-700 p-3">
            <p className="">{content}</p>
          </div>
          <p className="text-left text-sm text-gray-500">{format(new Date(timestamp), "MMM dd, yyyy', 'K:mm a")}</p>
        </div>
      </div>
    </div>
  );
}
