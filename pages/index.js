import Head from "next/head";
import Image from "next/image";
import OauthLoginButton from "../components/OauthLoginButton";

export default function Landing() {
  return (
    <div className="mx-auto bg-black h-screen flex justify-between items-stretch flex-col-reverse lg:flex-row">
      <div className="bg-landing-image flex justify-center basis-3/5 w-full">
        <Image src="/assets/svgexport-3.svg" alt="" width="400" height="400" className="fill-white" />
      </div>
      <div className="flex flex-col w-full bg-black pl-8 text-white items-start my-auto basis-2/5">
        <Image src="/assets/svgexport-3.svg" alt="" width="50" height="50" />
        <h2 className="text-6xl my-10 font-bold">Happening now</h2>
        <h2 className="text-4xl my-2 font-bold">Join twitter today.</h2>
        <OauthLoginButton provider="Google" />
        <OauthLoginButton provider="Github" />
        <OauthLoginButton provider="Discord" />
        <OauthLoginButton provider="Spotify" />
        <div className="flex flex-row items-center w-1/2">
          <hr className="w-full" />
          <p className="mx-2">or</p>
          <hr className="w-full" />
        </div>
        <button
          type="button"
          className=" mb-8 w-1/2 my-2 py-2 px-4 flex justify-center items-center  bg-sky-500 hover:bg-sky-600 focus:ring-sky-600 focus:ring-offset-sky-600 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-3xl "
        >
          Sign up with email
        </button>
        <h4 className="font-bold">Already have an account?</h4>
        <button
          type="button"
          className="w-1/2 my-2 py-2 px-4 flex justify-center items-center  bg-transparent hover:bg-neutral-900 focus:ring-bg-neutral-900 focus:ring-offset-bg-neutral-900 text-sky-500 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-3xl border-solid border border-gray-600 "
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
