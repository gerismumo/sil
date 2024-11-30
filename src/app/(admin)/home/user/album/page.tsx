
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { checkUser, userAlbumsPhotos } from "@/lib/serverServices"
import { cookies } from "next/headers";
import App from "./App";
import { DecodedToken } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET;
export default  async function PhotosView(props:any) {
    const searchParams= await props.searchParams;
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if(!token) {
        redirect('/sign-in');
    } 

    const value = token.value;
    
    const decodedToken  = jwt.verify(value, JWT_SECRET as string) as DecodedToken;
    
    if(!decodedToken.id) {
        redirect('/sign-in');
    }

    const check = await checkUser(decodedToken.id);
    if (!check) {
      return redirect('/sign-in');
    }

    const user:string = searchParams.userRef;
    const albumRef:string = searchParams.albumRef;

    if(!user ||!albumRef) {
        redirect('/home')
    }

    const alblumData = await userAlbumsPhotos(user);
    const data = alblumData.find((data) => data._id === albumRef);

    return (
        <App albumData={data} userRef={user} />
    )
}