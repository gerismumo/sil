"use server"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET;

export const getCookie = async()  => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token');
    const value = token?.value;
    if(value) {
        const decodedToken = jwt.verify(value, JWT_SECRET as string) as DecodedToken;
        const user = {
            userId: decodedToken.id,
            role: decodedToken.role,
            username: decodedToken.username
        }

        return user
    }else {
        return null;
    }
}


export const logoutUser = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    return '/';
};
