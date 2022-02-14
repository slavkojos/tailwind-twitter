import { format } from "date-fns";
export default function OutgoingMessage({ timestamp, content }) {
  return (
    <div className="flex h-fit w-fit flex-col self-end">
      <div className="rounded-t-lg rounded-l-lg rounded-bl-lg bg-sky-500 p-4 ">
        <p>{content}</p>
      </div>
      <p className="text-right text-sm text-gray-500">{format(new Date(timestamp), "MMM dd, yyyy', 'K:mm a")}</p>
    </div>
  );
}
