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
        minlength: 3,
      },
      imageUrl: {
        type: String,
        required: true,
        match: /^(http|https):\/\/.+/,
      },
    },
    { timestamps: true }
  );
  
  export const Photo = mongoose.model<IPhoto>("Photo", PhotoSchema);
  