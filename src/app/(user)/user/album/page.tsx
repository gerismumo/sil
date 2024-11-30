
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { checkUser, userAlbumsPhotos } from "@/lib/serverServices"
import { cookies } from "next/headers";
import PhotosViewPage from "./_components/App";
import { DecodedToken } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET;
export default  async function PhotosView(props:any) {
    const searchParams= await props.searchParams;
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if(!token) {
       return redirect('/sign-in');
    } 

    const value = token.value;
    
    const decodedToken = jwt.verify(value, JWT_SECRET as string) as DecodedToken;
    
    if(!decodedToken.id) {
        return redirect('/sign-in');
    }

    const check = await checkUser(decodedToken.id);
    if (!check) {
      return redirect('/sign-in');
    }


    const user = decodedToken.id;
    const alblumData = await userAlbumsPhotos(user);
    const data = alblumData.find((data) => data._id === searchParams.ref);

    return (
        <PhotosViewPage albumData={data}/>
    )
}