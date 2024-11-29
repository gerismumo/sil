import axios from "axios"
import UsersList from "./App";
import { usersList } from "@/lib/serverServices";


export default async function Home() {

    let usersInfo = await usersList();

    console.log("usersInfo", usersInfo)
 
    return (
        <UsersList users={usersInfo}/>
    )
}