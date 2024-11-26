import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import { User } from "@/(models)/User";


export  async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, username, password, email } = body;

    if (!name || !username || !password || !email) {
      return NextResponse.json(
        { success: false, message: "All fields are required." }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Username or email already exists." }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error:any) {
    console.log("error",error)
    return NextResponse.json(
      { success: false, message: "Something went wrong." }
    );
  }
}
