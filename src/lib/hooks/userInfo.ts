"use client"
import { getCookie } from "@/app/cookie";
import { useState, useEffect } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token  = await getCookie() as any;
      setUserInfo(token);
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  return { userInfo, loading };
};
