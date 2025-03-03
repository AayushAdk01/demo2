import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { playerContext } from "./context/playerContext";
import { auth } from "@/auth";
import LoginButton from "./components/buttons/loginBtn";
import LogoutButton from "./components/buttons/logoutBtn";

async function LoginPage() {
  const session = await auth();
  if (session) {
    const user = session.user;
    return (
      <div className="flex h-full">
        <div className="px-8 my-32 rounded py-8 border-2 mx-auto w-fit bg-white">
          <div className="">
            <h1 className="title mb-5 w-32">Welcome</h1>
            <p>Hello, {user?.name} </p>
            <p>
              You are already loged in, if you want to loginto another account
              please logout
            </p>
            <div className="mt-5 w-full">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full">
      <div className="px-8 my-32 rounded py-8 border-2 mx-auto w-fit bg-white">
        <div className="">
          <h1 className="title mb-5 w-32">Log in</h1>
          <p>
            Hello, Welcome to Guhuza Quiz App , The authentication is handled by
            Guhuza
          </p>

          <div>
            <div className="mt-5 w-full">
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
