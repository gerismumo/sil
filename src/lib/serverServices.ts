"use server"

import { Album } from "@/(models)/Album";
import connectDB from "./dbConnect";
import { User } from "@/(models)/User";

/* eslint-disable @typescript-eslint/no-explicit-any */

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

    } catch  {
      
      return [];
    }
  };

export const usersList = async() => {
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
        _id: _id.toString(),
        name,
        username,
        email,
        albumCount,
      };
    });

    return  userAlbumCounts;
  } catch  {
    return [];
  }
}

export const checkUser = async (user:any) => {
  try {
    await connectDB();

    const userdata = await User.findById(user);
    return userdata;
  }catch {
    return null
  }
}
