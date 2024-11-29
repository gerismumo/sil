import { cookies } from "next/headers";
import UsersList from "./App";
import { checkUser, usersList } from "@/lib/serverServices";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function Home() {
  const cookieStore = await cookies();
  const token: any = cookieStore.get('token');

  if (!token) {
    return redirect('/sign-in');
  }

  const value = token.value;

  try {
    const decodedToken: any = jwt.verify(value, JWT_SECRET as string);

    if (!decodedToken.id || decodedToken.role !== "admin") {
      return redirect('/sign-in');
    }

    const check = await checkUser(decodedToken.id);
    if (!check) {
      return redirect('/sign-in');
    }

    let usersInfo = await usersList();

    return <UsersList users={usersInfo} />;
  } catch (error) {
    return redirect('/sign-in');
  }
}
