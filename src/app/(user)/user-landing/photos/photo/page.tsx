import PhotoView from "./App";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { userAlbumsPhotos } from "@/lib/serverServices"
import { cookies } from "next/headers";

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
    
    if(!decodedToken.id) {
        redirect('/sign-in');
    }

    const user = decodedToken.id;
    const alblumData = await userAlbumsPhotos(user);
    const data = alblumData.find((data) => data._id === searchParams.ref).photos.find((image:any) => image._id === searchParams.id);
    console.log("data", data);
    return (
        <PhotoView title={data.title} image={data.imageUrl} />
    )
}