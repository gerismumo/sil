"use server"

import { Album } from "@/(models)/Album";
import connectDB from "./dbConnect";

export const userAlbumsPhotos = async (userId: any) => {
    try {
   
      await connectDB();
      const albumsWithPhotos = await Album.aggregate([
        {
          $match: { userId },
        },
        {
          $lookup: {
            from: "photos", 
            localField: "_id",
            foreignField: "albumId", 
            as: "photos", 
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            photos: {
              _id: 1,
              title: 1,
              imageUrl: 1,
            },
          },
        },
      ]);
  
      const formattedData = albumsWithPhotos.map((album: any) => ({
        ...album,
        _id: album._id.toString(),
        photos: album.photos.map((photo: any) => ({
          ...photo,
          _id: photo._id.toString()
        })),
      }));
  
      return formattedData;

    } catch (error: any) {
      console.error("Error fetching user albums and photos:", error);
      return [];
    }
  };