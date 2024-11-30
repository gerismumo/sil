
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { checkUser, userAlbumsPhotos } from "@/lib/serverServices"
import { cookies } from "next/headers";
import App from "./App";

const JWT_SECRET = process.env.JWT_SECRET;
export default  async function PhotosView(props:any) {
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

    const check:any = await checkUser(decodedToken.id);
    if (!check) {
      return redirect('/sign-in');
    }

    const user:string = searchParams.userRef;
    const albumRef:string = searchParams.albumRef;

    if(!user ||!albumRef) {
        redirect('/home')
    }

    const alblumData:any = await userAlbumsPhotos(user);
    const data:any = alblumData.find((data:any) => data._id === albumRef);

    return (
        <App albumData={data} userRef={user} />
    )
}