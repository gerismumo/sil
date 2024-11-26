import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import { User } from "@/(models)/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are  required." }
      );
    }

 
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    }).select("+password"); 

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid username/email or password." }
      );
    }


    const isPasswordValid = await bcrypt.compare(password, user.password!);

    const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, JWT_SECRET as any, {
        expiresIn: "7d",
      });

      
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid username/email or password." }
      );
    }

  
    const response = NextResponse.json(
        { success: true, message: "Login successful!" }
      );
  
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, 
        sameSite: "strict",
        path: "/",
      });
  
      return response;

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong." }
    );
  }
}
