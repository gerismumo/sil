import PhotoView from "./App";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { checkUser, userAlbumsPhotos } from "@/lib/serverServices"
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
export default async function Home(props:any) {
    const searchParams= await props.searchParams;
    const cookieStore = await cookies();
    const token:any = cookieStore.get('token');

    if(!token) {
       return redirect('/sign-in');
    } 

    const value = token.value;
    
    const decodedToken:any = jwt.verify(value, JWT_SECRET as string);
    
    if(!decodedToken.id || !searchParams.id) {
       return redirect('/sign-in');
    }

    const check :any = await checkUser(decodedToken.id);
    if (!check) {
      return redirect('/sign-in');
    }



    const user: string = decodedToken.id;
    const alblumData:any = await userAlbumsPhotos(user);
    const data:any = alblumData.find((data:any) => data._id === searchParams.ref).photos.find((image:any) => image._id === searchParams.id);
    return (
        <PhotoView title={data.title} image={data.imageUrl} />
    )
}