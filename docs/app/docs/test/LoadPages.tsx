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
    pageLimit?: number;
}

type FlagList = Record<number, boolean>;

const trueValueIndexes = (list: FlagList) =>
    Object.entries(list)
        // eslint-disable-next-line
        .filter(([_, isTrue]) => isTrue)
        .map(([index]) => parseInt(index));

const lowestTrueValueIndex = (list: FlagList) =>
    trueValueIndexes(list).length ? Math.min(...trueValueIndexes(list)) : 0;

const highestTrueValueIndex = (list: FlagList) =>
    trueValueIndexes(list).length ? Math.max(...trueValueIndexes(list)) : 0;

const countTrueValues = (list: FlagList) =>
    Object.values(list).filter(Boolean).length;

export const LoadingPages = forwardRef<HTMLDivElement, LoadingPagesProps>(
    function LoadingPages({ pageLimit, ...restProps }, ref) {
        // Collect Visibility Status
        const [visibilityStatus, setVisibilityStatus] = useState<FlagList>({});
        const handleOnVisibilityChange = (index: number, visible: boolean) => {
            if (index !== undefined)
                if (visibilityStatus[index] !== visible)
                    setVisibilityStatus((prev) => ({
                        ...prev,
                        [index]: visible,
                    }));
        };

        // Calculate Extra Loading
        const [maxTotalVisibledChilds, setMaxTotalVisibledChilds] =
            useState<number>(3); // Min: default
        if (countTrueValues(visibilityStatus) > maxTotalVisibledChilds) {
            setMaxTotalVisibledChilds(countTrueValues(visibilityStatus));
        }
        const extraLoading = maxTotalVisibledChilds * 2;

        // Collect Loaded Pages Status
        const [loadedStatus, setLoadedFlags] = useState<FlagList>({
            [0]: false,
        });

        // Can Laod Flags
        const [canLoadFlags, setCanLoadFlags] = useState<FlagList>({
            [0]: true,
        });

        useEffect(() => {
            const overLoadededOnLowSide =
                lowestTrueValueIndex(visibilityStatus) -
                lowestTrueValueIndex(loadedStatus);
            const overLoadededOnHighSide =
                highestTrueValueIndex(loadedStatus) -
                highestTrueValueIndex(visibilityStatus);

            const index = highestTrueValueIndex(loadedStatus);
            if (overLoadededOnHighSide < extraLoading)
                if (loadedStatus[index] === true)
                    setCanLoadFlags({ ...canLoadFlags, [index + 1]: true });
        }, [visibilityStatus, loadedStatus]);

        console.log("visibilityStatus", countTrueValues(visibilityStatus));
        console.log("loadedStatus", countTrueValues(loadedStatus));
        console.log("canLoadFlags", countTrueValues(canLoadFlags));

        return (
            <Stack ref={ref} {...restProps}>
                {Array.from({ length: 100 }).map(
                    (_, i) =>
                        canLoadFlags[i] && (
                            <WithInteractions
                                key={i}
                                onVisibilityChange={(v) =>
                                    handleOnVisibilityChange(i, v)
                                }
                            >
                                <Time
                                    key={i}
                                    index={i}
                                    onLoad={() =>
                                        loadedStatus[i] !== true &&
                                        setLoadedFlags({
                                            ...loadedStatus,
                                            [i]: true,
                                        })
                                    }
                                />
                            </WithInteractions>
                        )
                )}
                <Card>
                    <LoadingIcon variant="dots" size="extraLarge" />
                </Card>
            </Stack>
        );
    }
);
