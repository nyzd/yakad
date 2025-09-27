"use client";

import React from "react";
import ServerFetchData from "./ServerFetchData";

export const Time = ({ index }: { index?: number }) => (
    <>
        <h1>{index}</h1>
        <h2>Client time: {new Date().toLocaleString()}</h2>
        <ServerFetchData />
    </>
);
