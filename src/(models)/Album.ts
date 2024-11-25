import mongoose, { Schema } from "mongoose";

export interface IAlbum{
    _id?: string;
    userId: string;
    title: string;
  }
  
  const AlbumSchema: Schema = new Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
  
  export const Album = mongoose.model<IAlbum>("Album", AlbumSchema);
  