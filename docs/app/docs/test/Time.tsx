"use client";

import React, { useEffect } from "react";
import ServerFetchData from "./ServerFetchData";
import { LoadingControlV3ChildrenProps } from "../../../../packages/ui/src";

export const Time = ({ index, onLoad }: LoadingControlV3ChildrenProps) => {
    useEffect(() => {
        onLoad?.();
    }, [onLoad]);

    console.log("Im a Time that Rendered!");

    return (
        <div>
            <h2>{index}</h2>
            <h2>Client time: {new Date().toLocaleString()}</h2>
            <ServerFetchData />
        </div>
    );
};
