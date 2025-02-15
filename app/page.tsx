"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <div className="flex  h-full  ">
      <div className="px-8 my-32 rounded py-8 border-2 mx-auto  w-fit bg-white">
        <form onSubmit={handleLogin} className="">
          <h1 className="title mb-5">Log In</h1>
          <div className="">
            <div>
              <label className="">Username</label>
              <div>
                <input
                  placeholder="@SudipBhusal"
                  type="text"
                  className="border-2 rounded px-2 py-4 w-96"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="">Password</label>
              <div>
                <input
                  placeholder="Enter Password here "
                  type="password"
                  className="border-2 rounded px-2 py-4 w-96"
                />
              </div>
            </div>
          </div>

          <div>
            <button className="quizPbtn mt-5 w-full" type="submit">
              Log in
            </button>
          </div>
        </form>
        <div className="mt-4">
          <p>Don't have an account ?</p>
          <Link href={"/signup"} className="text-blue-600">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}
