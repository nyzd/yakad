"use client";

import React, { useEffect, useState } from "react";
import ServerFetchData from "./ServerFetchData";
import { Card, Hr } from "@yakad/ui";
import { LoadingIcon, Stack } from "../../../../packages/ui/src";

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
            // console.log("Im a Child that Loaded for first time! index:", index);
        }, 500);

        // console.log("Rendered:", index);

        return () => clearTimeout(timeout);
    }, []);

    if (!loaded) return <LoadingIcon size="extraLarge" variant="dots" />;

    if (loaded)
        return (
            <Card>
                <h2>{children}</h2>
                <h2>Client time: {new Date().toLocaleString()}</h2>
                <h2>Client time: {new Date().toLocaleString()}</h2>
                <h2>Client time: {new Date().toLocaleString()}</h2>
                <h2>Client time: {new Date().toLocaleString()}</h2>
                <Hr />
                <ServerFetchData />
            </Card>
        );
};
