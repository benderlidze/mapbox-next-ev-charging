"use client";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export const AuthButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonCLick = () => {
    console.log("clicked");
    setIsOpen(!isOpen);
  };

  const [session, setUser] = useState<Session>();
  const supabase = createClientComponentClient();

  const handleLogInGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  const handleLogInApple = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "apple",
    });
  };

  const handleLogInFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      session && setUser(session);
    });
  }, [supabase]);

  useEffect(() => {
    async function getProfile() {
      console.log("session", session);
      let { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", "fe5285a1-8b35-4861-bea4-91943cb33ee1")
        .single();

      console.log("data", data);
    }

    getProfile();
  }, [session]);

  return (
    <>
      <div
        onClick={handleButtonCLick}
        className="p-2 border rounded-md cursor-pointer hover:bg-gray-100 select-none"
      >
        {session && <div className="flex">{session && session.user.email}</div>}
        {!session && <div className="flex">Sign in</div>}
      </div>
      {isOpen && (
        <div className="absolute z-10 top-20 right-2 w-48 bg-white border rounded-xl shadow-md p-4">
          {!session && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <button onClick={handleLogInGoogle}>Sign in with Google</button>
              </div>
              <div className="flex items-center">
                <button onClick={handleLogInApple}>Sign in with Apple</button>
              </div>
              <div className="flex items-center">
                <button onClick={handleLogInFacebook}>Sign in with FB</button>
              </div>
            </div>
          )}

          {session && (
            <button style={{ marginRight: 10 }} onClick={() => handleSignOut()}>
              Sign Out
            </button>
          )}
        </div>
      )}
    </>
  );
};
