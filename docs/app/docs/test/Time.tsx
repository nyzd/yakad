"use client";

import React, { useEffect } from "react";
import ServerFetchData from "./ServerFetchData";
import { Card } from "@yakad/ui";

export interface TimeProps {
    index?: number;
    onLoad?: () => void;
    children?: React.ReactNode;
}

export const Time = ({ index, onLoad, children }: TimeProps) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onLoad?.();
            console.log("Im a Child that Loaded for first time! index:", index);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Card>
            <h2>{children}</h2>
            <h2>Client time: {new Date().toLocaleString()}</h2>
            <ServerFetchData />
        </Card>
    );
};
