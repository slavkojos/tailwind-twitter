import { useState, useRef } from "react";
import { signUp } from "../utils/supabase";

export default function SignUp({ isSignUpOpen, setSignUpOpen, cancelButtonRef }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col items-center">
      <h4 className="text-2xl font-bold text-white">Sign up for Twitter</h4>
      <div className="my-3 flex flex-col items-center">
        <div className="my-1 w-full">
          <label htmlFor="required-name" className="text-white">
            Name
            <span className="required-dot text-red-500">*</span>
          </label>
          <input
            type="text"
            id="required-name"
            className="w-full flex-1 appearance-none rounded-lg border border-transparent  bg-gray-800 py-2 px-4 text-base text-gray-200 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-1 w-full">
          <label htmlFor="required-username" className="text-white">
            Username
            <span className="required-dot text-red-500">*</span>
          </label>
          <input
            type="text"
            id="required-username"
            className=" w-full flex-1 appearance-none rounded-lg border border-transparent bg-gray-800  py-2 px-4 text-base text-gray-200  placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="username"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-1 w-full">
          <label htmlFor="required-email" className="text-white">
            Email
            <span className="required-dot text-red-500">*</span>
          </label>
          <input
            type="text"
            id="required-email"
            className=" w-full flex-1 appearance-none rounded-lg border border-transparent bg-gray-800  py-2 px-4 text-base text-gray-200  placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-1 w-full ">
          <label htmlFor="required-password" className="text-white">
            Password
            <span className="required-dot text-red-500">*</span>
          </label>
          <input
            type="password"
            id="required-password"
            className=" w-full flex-1 appearance-none rounded-lg border border-transparent bg-gray-800 py-2 px-4 text-base text-gray-200 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full bg-black px-4 py-3 sm:px-6">
        <button
          type="button"
          className=" w-full  rounded-md border border-transparent bg-sky-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2  focus:ring-offset-2 sm:ml-3  sm:text-sm"
          onClick={() => signUp(email, password, username, name)}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="mt-3  w-full  rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3  sm:text-sm"
          onClick={() => setSignUpOpen(false)}
          ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
