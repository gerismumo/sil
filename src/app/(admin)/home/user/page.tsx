import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { checkUser, userAlbumsPhotos } from "@/lib/serverServices";
import App from "./App";
import { DecodedToken } from "@/lib/types";


const JWT_SECRET = process.env.JWT_SECRET;
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function Home(props:any) {
    const searchParams= await props.searchParams;
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if(!token) {
        redirect('/sign-in');
    } 

    const value = token.value;
    
    const decodedToken = jwt.verify(value, JWT_SECRET as string) as DecodedToken;
    
    if (!decodedToken.id || decodedToken.role !== "admin") {
        return redirect('/sign-in');
    }

    const check:any = await checkUser(decodedToken.id);
    if (!check) {
      return redirect('/sign-in');
    }
  

    const user = searchParams.userRef;

    if(!user) {
        redirect('/home')
    }

    const alblumData = await userAlbumsPhotos(user);

    return (
        <App  alblumData={alblumData} user={user} />
    )
} 
