import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/dbConnect";
import { Album, IAlbum } from "@/(models)/Album";
import { userAlbumsPhotos } from "@/lib/serverServices";
import App from "./App";


const JWT_SECRET = process.env.JWT_SECRET;
export default async function Home(props:any) {
    const searchParams= await props.searchParams;
    const cookieStore = await cookies();
    const token:any = cookieStore.get('token');

    if(!token) {
        redirect('/sign-in');
    } 

    const value = token.value;
    
    const decodedToken:any = jwt.verify(value, JWT_SECRET as string);
    
    if (!decodedToken.id || decodedToken.role !== "admin") {
        return redirect('/sign-in');
    }

  

    const user = searchParams.userRef;

    if(!user) {
        redirect('/home')
    }

    const alblumData = await userAlbumsPhotos(user);
    console.log("alblumData", alblumData);

    return (
        <App  alblumData={alblumData} user={user} />
    )
} 
