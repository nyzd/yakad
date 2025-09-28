"use client";

import React from "react";
import ServerFetchData from "./ServerFetchData";

export const Time = ({ index }: { index?: number }) => {
    return (
        <div>
            <h2>{index}</h2>
            <h2>Client time: {new Date().toLocaleString()}</h2>
            <ServerFetchData />
        </div>
    );
};
