"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@/Layout/Container";
import Link from "next/link";

type UserData = {
  _id: string;
  name: string;
  username: string;
  email: string;
  albumCount: number;
};

type Props ={
    users: UserData[];
}

const UsersList: React.FC<Props> = ({users}) => {
 

 

//   if (loading) {
//     return (
//       <Container>
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//         </div>
//       </Container>
//     );
//   }

  return (
    <Container>
      {users.length === 0 ? (
        <div className="my-10">
          <div className="flex flex-row justify-center items-center">
            <h2 className="text-xl text-center font-semibold dark:text-white">
              No Data found.
            </h2>
          </div>
        </div>
      ): (
        <div className="my-10">
          <h1 className="text-3xl font-bold dark:text-white text-center mb-8">
            Users
          </h1>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Link href={`/home/user?userRef=${user._id}`}
                key={user._id}
                className="border rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out bg-white dark:bg-light-dark "
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white ">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-white ">@{user.username}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 dark:text-white">
                  Email:{" "}
                  <span
                    className="text-gray-700  dark:text-gray-200 hover:underline"
                  >
                    {user.email}
                  </span>
                </p>
                <p className="mt-2 text-gray-700 dark:text-white">
                  Albums:{" "}
                  <span className="font-semibold text-gray-700  dark:text-gray-200">
                    {user.albumCount}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
      
    </Container>
  );
};

export default UsersList;
