"use client"
import { getCookie } from "@/app/cookie";
import { useState, useEffect } from "react";


export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token:any = await getCookie();
      console.log("Decoded Token:", token);
      setUserInfo(token);
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  return { userInfo, loading };
};
