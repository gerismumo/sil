import { User } from "@/(models)/User";
import { Album } from "@/(models)/Album";
import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users: any[] = await User.find({role:"user"}).lean();
    const albums = await Album.find().lean();

   
    const userAlbumCounts = users.map((user: any) => {
      const albumCount = albums.filter(
        (album) => album.userId === user._id.toString()
      ).length;

      const { _id, name, username, email } = user;
      return {
        _id,
        name,
        username,
        email,
        albumCount,
      };
    });

    return NextResponse.json({ success: true, data: userAlbumCounts });
  } catch  {
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}
