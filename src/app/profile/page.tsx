"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Profile() {
  const router = useRouter();
  const [data, setData] = useState("Empty");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/aboutMe");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <hr className="w-full border-gray-300" />

      <h2 className="text-lg">
        {data === "Empty" ? (
          <span className="text-gray-500">No Data</span>
        ) : (
          <Link
            href={`/profile/${data}`}
            className="text-blue-500 hover:underline"
          >
            {data}
          </Link>
        )}
      </h2>
      <hr className="w-full border-gray-300" />

      <div className="flex gap-4">
        <button
          onClick={getUserDetails}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Get User Details
        </button>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
