import Head from "next/head";
import Image from "next/image";
import { signInWithOauth } from "../utils/supabase";

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
        <button
          type="button"
          onClick={() => signInWithOauth("google")}
          className="w-1/2 my-2 py-2 px-4 flex justify-center items-center  bg-white hover:bg-gray-200 focus:ring-gray-200 focus:ring-offset-gray-200 text-black transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-3xl "
        >
          <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
          </svg>
          Sign up with Google
        </button>

        <button
          type="button"
          onClick={() => signInWithOauth("github")}
          className="w-1/2 my-2 py-2 px-4 flex justify-center items-center  bg-white hover:bg-gray-200 focus:ring-gray-200 focus:ring-offset-gray-200 text-black transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-3xl "
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
          </svg>
          Sign in with GitHub
        </button>
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
