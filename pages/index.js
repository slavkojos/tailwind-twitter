import Head from "next/head";
import Image from "next/image";
import OauthLoginButton from "../components/OauthLoginButton";
import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";
import { useState } from "react";

export default function Landing() {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);
  return (
    <div className="mx-auto flex h-screen flex-col-reverse items-stretch justify-between bg-black lg:flex-row">
      <div className="flex w-full basis-3/5 justify-center bg-landing-image">
        <Image src="/assets/svgexport-3.svg" alt="" width="400" height="400" className="fill-white" />
      </div>
      <div className="my-auto flex w-full basis-2/5 flex-col items-start bg-black pl-8 text-white">
        <Image src="/assets/svgexport-3.svg" alt="" width="50" height="50" />
        <h2 className="my-10 text-6xl font-bold">Happening now</h2>
        <h2 className="my-2 text-4xl font-bold">Join twitter today.</h2>
        <OauthLoginButton provider="Google" />
        <OauthLoginButton provider="Github" />
        <OauthLoginButton provider="Discord" />
        <OauthLoginButton provider="Spotify" />
        <div className="flex w-1/2 flex-row items-center">
          <hr className="w-full" />
          <p className="mx-2">or</p>
          <hr className="w-full" />
        </div>
        <button
          type="button"
          onClick={() => setSignUpOpen(true)}
          className=" my-2 mb-8 flex w-1/2 items-center justify-center rounded-3xl bg-sky-500  py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2  focus:ring-offset-sky-600 "
        >
          Sign up with email
        </button>
        <h4 className="font-bold">Already have an account?</h4>
        <button
          type="button"
          onClick={() => setSignInOpen(true)}
          className="focus:ring-bg-neutral-900 focus:ring-offset-bg-neutral-900 my-2 flex w-1/2 items-center justify-center  rounded-3xl border border-solid border-gray-600 bg-transparent py-2 px-4 text-center text-base font-semibold text-sky-500 shadow-md transition duration-200 ease-in  hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 "
        >
          Sign in
        </button>
      </div>
      <SignUpModal isSignUpOpen={isSignUpOpen} setSignUpOpen={setSignUpOpen} />
      <SignInModal isSignInOpen={isSignInOpen} setSignInOpen={setSignInOpen} />
    </div>
  );
}
