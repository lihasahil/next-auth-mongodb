/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

function Details({ params }: any) {
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{params.id}</h2>
    </div>
  );
}

export default Details;
