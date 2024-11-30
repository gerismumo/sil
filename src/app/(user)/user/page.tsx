import { cookies } from "next/headers";
import App from "./_components/App";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/dbConnect";
import { Album} from "@/(models)/Album";
import { checkUser, userAlbumsPhotos } from "@/lib/serverServices";
import { DecodedToken } from "@/lib/types";


const JWT_SECRET = process.env.JWT_SECRET;
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function Home() {
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

    const user: string = decodedToken.id;
    await connectDB();

    const albumList = await Album.find({userId: user}).select('-createdAt -updatedAt -__v').lean();

    const formattedAlbumList = albumList.map((album:any) => ({
        ...album,
        _id: album._id.toString(),
    }));

    const alblumData = await userAlbumsPhotos(user);

    return (
        <App albumList={formattedAlbumList} alblumData={alblumData} />
    )
} 
