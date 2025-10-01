"use client";

import React, { forwardRef, useEffect, useState } from "react";
import {
    Card,
    LoadingIcon,
    Stack,
    WithInteractions,
} from "../../../../packages/ui/src";
import { Time } from "./Time";

export interface LoadingPagesProps {
    extraLoading?: number;
    jump?: number;
}

const data = Array.from({ length: 78 });

export const LoadingPages = forwardRef<HTMLDivElement, LoadingPagesProps>(
    function LoadingPages({ extraLoading = 5, jump = 0, ...restProps }, ref) {
        // Collect Visibility Status
        const [visibled, setVisibled] = useState<{
            lowest: number;
            highest: number;
        }>({ lowest: jump, highest: jump });
        const handleOnVisible = (i: number) => {
            if (i < visibled.lowest) setVisibled({ ...visibled, lowest: i });
            if (i > visibled.highest) setVisibled({ ...visibled, highest: i });
        };

        // Collect Loaded Pages Status
        const [loaded, setLoaded] = useState<{
            lowest: number;
            highest: number;
        }>({ lowest: jump, highest: jump });

        // Laoding in progress flag
        const [loadingInProgress, setLoadingInProgress] =
            useState<boolean>(false);

        const overLoadededOnLowSide = visibled.lowest - loaded.lowest;
        const overLoadededOnHighSide = loaded.highest - visibled.highest;

        useEffect(() => {
            if (!loadingInProgress) {
                if (
                    loaded.highest < data.length &&
                    overLoadededOnHighSide < extraLoading
                ) {
                    setLoaded({ ...loaded, highest: loaded.highest + 1 });
                    setLoadingInProgress(true);
                } else if (
                    loaded.lowest > 0 &&
                    overLoadededOnLowSide < extraLoading
                ) {
                    setLoaded({ ...loaded, lowest: loaded.lowest - 1 });
                    setLoadingInProgress(true);
                }
            }
        }, [visibled, loaded, loadingInProgress]);

        console.log("visibled", visibled);
        console.log("loaded", loaded);
        console.log("loadingInProgress", loadingInProgress);

        return (
            <Stack ref={ref} {...restProps}>
                <Card>
                    <LoadingIcon variant="dots" size="extraLarge" />
                </Card>
                {data.map(
                    (_, i) =>
                        i >= loaded.lowest &&
                        i <= loaded.highest && (
                            <WithInteractions
                                key={i}
                                onVisible={() => handleOnVisible(i)}
                            >
                                <Time
                                    index={i}
                                    onLoad={() => setLoadingInProgress(false)}
                                />
                            </WithInteractions>
                        )
                )}
                {loaded.highest < data.length && (
                    <Card>
                        <LoadingIcon variant="dots" size="extraLarge" />
                    </Card>
                )}
            </Stack>
        );
    }
);
