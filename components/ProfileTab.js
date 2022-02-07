import { Tab } from "@headlessui/react";
import { Fragment } from "react";

export default function MyTab({ title }) {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={
            selected
              ? " rounded border-b-4 border-sky-500 p-3 px-12 font-semibold text-gray-300 hover:bg-gray-800"
              : " rounded border-b-4 border-hidden bg-black p-3 px-12 font-semibold text-gray-500 hover:bg-gray-800"
          }
        >
          {title}
        </button>
      )}
    </Tab>
  );
}
