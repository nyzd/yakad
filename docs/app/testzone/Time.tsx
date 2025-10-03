"use client";

import React, { useEffect, useState } from "react";
import ServerFetchData from "./ServerFetchData";
import { Card, Hr } from "@yakad/ui";
import { LoadingIcon, Stack } from "@yakad/ui/src";

export interface TimeProps {
    index?: number;
    onLoad?: () => void;
    children?: React.ReactNode;
}

export const Time = ({ index, onLoad, children }: TimeProps) => {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoaded(true);
            onLoad?.();
            console.log("Im a Child that Loaded for first time! index:", index);
        }, 1000);

        // console.log("Rendered:", index);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Card align="center">
            {loaded ? (
                <>
                    <h2>Client time: {new Date().toLocaleString()}</h2>
                    <h2>Client time: {new Date().toLocaleString()}</h2>
                    <h2>Client time: {new Date().toLocaleString()}</h2>
                    <h2>Client time: {new Date().toLocaleString()}</h2>
                    <Hr />
                    <ServerFetchData />
                    <h2>{children}</h2>
                </>
            ) : (
                <>
                    <LoadingIcon />
                    <h2>{index}</h2>
                </>
            )}
        </Card>
    );
};
