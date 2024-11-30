import { cookies } from "next/headers";
import UsersList from "./App";
import { checkUser, usersList } from "@/lib/serverServices";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/lib/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const JWT_SECRET = process.env.JWT_SECRET;

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return redirect('/sign-in');
  }

  const value = token.value;

  try {
    const decodedToken = jwt.verify(value, JWT_SECRET as string) as DecodedToken;


    if (!decodedToken.id || decodedToken.role !== "admin") {
      return redirect('/sign-in');
    }

    const check = await checkUser(decodedToken.id);
    if (!check) {
      return redirect('/sign-in');
    }

    const usersInfo = await usersList();

    return <UsersList users={usersInfo} />;
  } catch {
    return redirect('/sign-in');
  }
}
