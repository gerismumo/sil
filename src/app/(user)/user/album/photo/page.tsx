import PhotoView from "./App";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { checkUser, userAlbumsPhotos } from "@/lib/serverServices"
import { cookies } from "next/headers";
import { DecodedToken } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function Home(props:any) {
    const searchParams= await props.searchParams;
    const cookieStore = await cookies();
    const token:any = cookieStore.get('token');

    if(!token) {
       return redirect('/sign-in');
    } 

    const value = token.value;
    
    const decodedToken = jwt.verify(value, JWT_SECRET as string) as DecodedToken;
    
    if(!decodedToken.id || !searchParams.id) {
       return redirect('/sign-in');
    }

    const check  = await checkUser(decodedToken.id);
    if (!check) {
      return redirect('/sign-in');
    }



    const user: string = decodedToken.id;
    const alblumData = await userAlbumsPhotos(user);
    const data = alblumData.find((data) => data._id === searchParams.ref).photos.find((image:any) => image._id === searchParams.id);
    return (
        <PhotoView title={data.title} image={data.imageUrl} />
    )
}