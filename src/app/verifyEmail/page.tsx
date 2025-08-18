/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
      <p className="mb-6 text-gray-700">{token || "No token"}</p>

      {verified && (
        <div className="text-green-600 mb-4">
          <h2 className="text-xl font-semibold">Verified!</h2>
          <Link href="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div className="text-red-600">
          <h2 className="text-xl font-semibold">Error verifying your email</h2>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
