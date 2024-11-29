
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { userAlbumsPhotos } from "@/lib/serverServices"
import { cookies } from "next/headers";
import PhotosViewPage from "./_components/App";

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

    const user = decodedToken.id;
    const alblumData = await userAlbumsPhotos(user);
    const data = alblumData.find((data) => data._id === searchParams.ref);

    if(!data) {
        redirect('/user-landing')
    }

    return (
        <PhotosViewPage albumData={data}/>
    )
}