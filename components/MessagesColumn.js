import Settings from "../public/assets/svgexport-34.svg";
import Compose from "../public/assets/svgexport-35.svg";
import Spinner from "../public/assets/spinner.svg";
import MessagesItem from "./MessagesItem";
export default function MessagesColumn({ messages, setMessages, loading, loggedInUser, setSelectedConversation }) {
  const displayMessages = () => {
    console.log("messages-column", messages);
    if (messages.length > 0) {
      return messages.map((message, index) => {
        return (
          <MessagesItem
            key={index}
            index={index}
            message={message}
            setMessages={setMessages}
            loggedInUser={loggedInUser}
            setSelectedConversation={setSelectedConversation}
          />
        );
      });
    } else {
      return (
        <div>
          <p className="text-gray-300">No messages yet</p>
        </div>
      );
    }
  };
  return (
    <div className="col-span-3 flex h-screen w-full flex-col overflow-auto border-l-[.005px] border-r-[.005px] border-gray-600 bg-black p-3  text-gray-300">
      <div className="flex w-full justify-between">
        <h3 className="text-xl font-bold text-gray-300">Messages</h3>
        <div>
          <button className="rounded-full p-2 hover:bg-gray-800">
            <Settings />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-800">
            <Compose />
          </button>
        </div>
      </div>
      <div className="my-3 w-full">
        <input
          type="text"
          className="w-full rounded-full border bg-black py-3 pl-10 pr-4 text-gray-700 placeholder:text-center focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-500"
          placeholder="Search for people"
        />
      </div>
      {loading ? <Spinner className="animate-spin" /> : <div className="flex w-full flex-col">{displayMessages()}</div>}
    </div>
  );
}
