import { cookies } from "next/headers";
import App from "./components/App";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/dbConnect";
import { Album, IAlbum } from "@/(models)/Album";

const JWT_SECRET = process.env.JWT_SECRET;
export default async function Home() {
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
    await connectDB();

    const albumList:any = await Album.find({userId: user}).select('-createdAt -updatedAt -__v').lean();
    
    const formattedAlbumList = albumList.map((album: any) => ({
        ...album,
        _id: album._id.toString(),
    }));

    return (
        <App albumList={formattedAlbumList}/>
    )
} 
