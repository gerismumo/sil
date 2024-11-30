import { Photo } from "@/(models)/Photo";
import connectDB from "@/lib/dbConnect";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(req:NextRequest) {
    try{
        const body = await req.json();

        await connectDB();

        const photosToInsert = body.map((photo: any) => ({
            albumId: new mongoose.Types.ObjectId(photo.albumId),
            title: photo.title,
            imageUrl: photo.imageUrl,
        }));

        await Photo.insertMany(photosToInsert);

        return NextResponse.json({ success: true, message: "Photos added successfully" });

    }catch {
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
}