"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

export const AuthButton = () => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const handleButtonCLick = () => {
    console.log("clicked");
    setIsOpen(!isOpen);
  };

  console.log("session", session);

  const UserButton = () => {
    if (!session) {
      return "Guest";
    }

    if (session && session.user?.name) {
      return (
        <div className="flex flex-row">
          {session.user?.image && (
            <img
              src={session.user?.image}
              className="w-5 rounded-full mr-2"
              alt="user image"
            />
          )}
          <strong>{session.user.name}</strong>
        </div>
      );
    }
  };

  return (
    <>
      <div
        onClick={handleButtonCLick}
        className="p-2 border rounded-md  cursor-pointer hover:bg-gray-100 select-none"
      >
        <UserButton />
      </div>
      {isOpen && (
        <div className="absolute z-10 top-20 right-2 w-48 bg-white border rounded-xl shadow-md p-4">
          {!session && (
            <button style={{ marginRight: 10 }} onClick={() => signIn()}>
              Sign in
            </button>
          )}

          {session && (
            <button style={{ marginRight: 10 }} onClick={() => signOut()}>
              Sign Out
            </button>
          )}
        </div>
      )}
    </>
  );
};
