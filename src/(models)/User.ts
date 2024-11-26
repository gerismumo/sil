import mongoose, { Schema} from "mongoose";

export interface IUser {
    _id?: string;
    name: string;
    password?: string;
    username: string;
    email: string;
    role: "user"| "admin";
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"], 
    }
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
