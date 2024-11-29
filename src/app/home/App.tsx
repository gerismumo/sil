"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@/Layout/Container";

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
      <div className="my-10">
        <h1 className="text-3xl font-bold dark:text-white text-center mb-8">
          Registered Users with Albums
        </h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out bg-white dark:bg-light-dark "
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
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
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {user.email}
                </a>
              </p>
              <p className="mt-2 text-gray-700 dark:text-white">
                Albums:{" "}
                <span className="font-semibold text-blue-600">
                  {user.albumCount}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default UsersList;
