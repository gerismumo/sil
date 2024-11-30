
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { checkUser, userAlbumsPhotos } from "@/lib/serverServices"
import { cookies } from "next/headers";
import PhotoView from "./App";
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
    
    if(!decodedToken.id) {
        redirect('/sign-in');
    }

    const check= await checkUser(decodedToken.id);
    if (!check) {
      return redirect('/sign-in');
    }

    const user: string = searchParams.userRef;
    const alblumData= await userAlbumsPhotos(user);

    if(!user || !alblumData) {
       return  redirect('/home')
    }

    const data = alblumData.find((data) => data._id === searchParams.albumRef).photos.find((image:any) => image._id === searchParams.photoRef);
    return (
        <PhotoView title={data.title} image={data.imageUrl} />
    )
}