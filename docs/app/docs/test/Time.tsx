"use client";

import React, { useEffect } from "react";
import ServerFetchData from "./ServerFetchData";

export interface TimeProps {
    index?: number;
    onLoad?: () => void;
}

export const Time = ({ index, onLoad }: TimeProps) => {
    useEffect(() => {
        onLoad?.();
    }, [onLoad]);

    useEffect(() => {
        console.log("Im a Time that Loaded for first time! index:", index);
    }, []);
    // console.log("Im a Time that Rendered! index:", index);

    return (
        <div>
            <h2>{index}</h2>
            <h2>Client time: {new Date().toLocaleString()}</h2>
            <ServerFetchData />
        </div>
    );
};
