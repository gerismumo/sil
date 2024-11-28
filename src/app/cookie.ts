"use server"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const getCookie = async()  => {
    const cookieStore = await cookies()
    const token:any = cookieStore.get('token');
    const value :any = token?.value;
    if(value) {
        const decodedToken:any = jwt.verify(value, JWT_SECRET as string);
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
