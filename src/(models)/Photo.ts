import mongoose, { Schema } from "mongoose";

export interface IPhoto  {
    _id?: string;
    albumId: string;
    title: string;
    imageUrl: string;
  }
  
  const PhotoSchema: Schema = new Schema(
    {
      albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true
      },
    },
    { timestamps: true }
  );
  
  export const Photo = mongoose.models.Photo || mongoose.model<IPhoto>("Photo", PhotoSchema);
  