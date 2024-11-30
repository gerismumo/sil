"use client";

import Container from "@/Layout/Container";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { getCookie, logoutUser } from "../cookie";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const POLLING_INTERVAL = 500; 

  const fetchUserInfo = async () => {
    const token:any= await getCookie();
    setUser(token); 
  };

  useEffect(() => {
    fetchUserInfo();
    const intervalId = setInterval(() => {
      fetchUserInfo();
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    const redirectPath = await logoutUser();
    router.push(redirectPath);
    router.refresh();
  };

  return (
    <div className="flex flex-col shadow-gray-300 dark:shadow-alpha-white-400 shadow-sm">
      <Container>
        <div className="flex flex-row justify-between items-center py-[15px]">
          <div
            onClick={() => router.push("/")}
            className="flex flex-col cursor-pointer"
          >
            <h2 className="font-[600]">Savannah</h2>
          </div>
          <div className="flex flex-row items-center justify-center gap-[20px]">
            {user && user.role === "admin" && (
                <Link href="/home" className="hover:underline" >
                    Users
                </Link>
            )}
            {user && user.role === "user" && (
                <Link href="/user">
                    Albums
                </Link>
            )}
            {!user ? (
              <Link
                href="/sign-in"
                className="bg-[#ddd] text-[14px] font-[500] dark:bg-light-dark px-[10px] py-[5px] rounded-[15px]"
              >
                Log in
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-[#ddd] text-[14px] font-[500] dark:bg-light-dark px-[10px] py-[5px] rounded-[15px]"
              >
                Log out
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
