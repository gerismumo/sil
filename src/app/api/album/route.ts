import { Album } from "@/(models)/Album";
import connectDB from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET;

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function POST(req: NextRequest) {
    try{
       
        const body = await req.json();
        const { albumName } = body;

        if(!albumName ) {
            return NextResponse.json({success: false, message: "All fields are required"});
        }

        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if(!token) {
            return NextResponse.json({success: false, message: "user not authenticated"})
        }
        const value = token.value;
    
        const decodedToken = jwt.verify(value, JWT_SECRET as string) as DecodedToken;
      
        if(!decodedToken.id) {
            return NextResponse.json({success: false, message: "user not authenticated"})
        }

        const user = decodedToken.id;

        const existingAlbum = await Album.aggregate([
            { $match: { userId: user, title: albumName } },
            { $limit: 1 } 
        ]);

        if (existingAlbum.length > 0) {
            return NextResponse.json({ success: false, message: "Album name already exists" });
        }

        const newAlbum = new Album({
            userId: user,
            title: albumName
        })

        await newAlbum.save();

        return NextResponse.json({success: true, message: "Album created successfully"});

    }catch{
        return NextResponse.json({success: false, message: "Internal server error"})
    }
}

export async function GET() {
    try{
        await connectDB();

        const data = await Album.find();
        return NextResponse.json({success: true, data });
    }catch{
        return NextResponse.json({success: false, message: "Internal server error"})
    }
}