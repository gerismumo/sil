import mongoose, { Schema } from "mongoose";

export interface IAlbum{
    _id?: string;
    userId: string;
    title: string;
  }
  
  const AlbumSchema: Schema = new Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
        minlength: 3,
      },
    },
    { timestamps: true }
  );
  
  export const Album = mongoose.models.Album || mongoose.model<IAlbum>("Album", AlbumSchema);
  