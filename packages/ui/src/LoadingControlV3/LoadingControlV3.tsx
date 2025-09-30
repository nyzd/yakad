"use client";

import React, { forwardRef, useState } from "react";
import classNames from "classnames";
import { DisplayOnVisible, RenderOnVisible } from "..";
import boxingStyles from "../boxing.module.css";

export interface LoadingControlV3ChildrenProps {
    index?: number;
    onLoad?: () => void;
}

export interface LoadingControlV3Props
    extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidth?: boolean;
    loadingLimit?: number;
    children: React.ReactElement<LoadingControlV3ChildrenProps>;
}

export const LoadingControlV3 = forwardRef<
    HTMLDivElement,
    LoadingControlV3Props
>(function LoadingControlV3(
    {
        align,
        fullWidth = true,
        loadingLimit = 200,
        className,
        children,
        ...restProps
    },
    ref
) {
    const [maxTotalVisibledItems, setMaxTotalVisibledItems] =
        useState<number>(3); // Min: default
    const extraLoading = maxTotalVisibledItems * 2;

    const [loadedItems, setLoadedItems] = useState<
        Record<number, React.ReactNode>
    >({
        0: React.cloneElement(children, {
            index: 0,
        }),
    });

    const [visibilityStatus, setVisibilityStatus] = useState<
        Record<number, boolean>
    >({});
    const handleOnVisibilityChange = (visible: boolean, i?: number) => {
        if (i !== undefined)
            if (visibilityStatus[i] !== visible)
                setVisibilityStatus((prev) => ({ ...prev, [i]: visible }));
    };

    const visibleIndexes = Object.entries(visibilityStatus)
        // eslint-disable-next-line
        .filter(([_, isVisible]) => isVisible)
        .map(([index]) => parseInt(index));
    const visibleCount = Object.values(visibilityStatus).filter(Boolean).length;
    const lowestVisibleItemIndex = visibleIndexes.length
        ? Math.min(...visibleIndexes)
        : 0;
    const highestVisibleItemIndex = visibleIndexes.length
        ? Math.max(...visibleIndexes)
        : 0;
    if (visibleCount > maxTotalVisibledItems) {
        setMaxTotalVisibledItems(visibleCount);
    }

    const loadedItemsLength = Object.values(loadedItems).length;
    const lowestLoadedItemIndex = Number(Object.keys(loadedItems)[0]);
    const highestLoadedItemIndex = Number(
        Object.keys(loadedItems)[loadedItemsLength - 1]
    );

    if (
        highestLoadedItemIndex < loadingLimit &&
        highestLoadedItemIndex - highestVisibleItemIndex < extraLoading
    ) {
        const newIndex = highestLoadedItemIndex + 1;
        setLoadedItems({
            ...loadedItems,
            [newIndex]: React.cloneElement(children, {
                index: newIndex,
            }),
        });
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>> ++++ Item ",
            newIndex,
            " Added to end"
        );
    }

    if (
        lowestLoadedItemIndex > 0 &&
        lowestVisibleItemIndex - lowestLoadedItemIndex < extraLoading
    ) {
        setLoadedItems({
            [lowestLoadedItemIndex - 1]: React.cloneElement(children, {
                index: lowestLoadedItemIndex - 1,
            }),
            ...loadedItems,
        });
        console.log(
            ">>>>>>>>>>>> ---- Item ",
            lowestLoadedItemIndex - 1,
            " Added to start"
        );
    }

    // useEffect(() => {
    //     const loadLimit = extraLoading + 3;
    //     if (lowestVisibleItemIndex - lowestLoadedItemIndex > loadLimit) {
    //         setLoadedItems(
    //             removeFromStart(loadedItems, lowestVisibleItemIndex - loadLimit)
    //         );
    //         console.log(
    //             "$$$$$$$$$$$ Sliced $$$$$$$$$$$$$$$$$$$$$ from start smaller than:",
    //             lowestVisibleItemIndex - loadLimit
    //         );
    //     }
    //     if (highestLoadedItemIndex - highestVisibleItemIndex > loadLimit) {
    //         setLoadedItems(
    //             removeFromEnd(loadedItems, highestVisibleItemIndex + loadLimit)
    //         );
    //         console.log(
    //             "$$$$$$$$$$$ Sliced $$$$$$$$$$$$$$$$$$$$$ from end bigger than:",
    //             highestVisibleItemIndex + loadLimit
    //         );
    //     }
    //     // eslint-disable-next-line
    // }, [loadedItems, visibilityStatus]);

    console.log(
        "###### ",
        "Total Loaded:",
        loadedItemsLength,
        "extraLoading:",
        extraLoading,
        " ##### ",
        "L:",
        lowestLoadedItemIndex,
        "V:",
        lowestVisibleItemIndex,
        "D:",
        -(lowestLoadedItemIndex - lowestVisibleItemIndex),
        "|",
        "TV:",
        visibleCount,
        "|",
        "D:",
        highestLoadedItemIndex - highestVisibleItemIndex,
        "V:",
        highestVisibleItemIndex,
        "L:",
        highestLoadedItemIndex
    );
    // console.log("visibilityStatus", visibilityStatus);
    // console.log("loadedItems", loadedItems);
    // console.log(
    //     "visibilityStatus.length",
    //     Object.keys(visibilityStatus).length
    // );

    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { fullWidth: fullWidth },
        className
    );

    return (
        <div ref={ref} className={joinedClassNames} {...restProps}>
            {Object.entries(loadedItems).map(([key, value]) => (
                <RenderOnVisible
                    key={key}
                    onVisibilityChange={(visible) =>
                        handleOnVisibilityChange(visible, Number(key))
                    }
                >
                    <h1>{key}</h1>
                    {value}
                </RenderOnVisible>
            ))}
        </div>
    );
});

function removeFromStart<T>(
    obj: Record<number, T>,
    start: number
): Record<number, T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => Number(key) >= start)
    );
}
function removeFromEnd<T>(
    obj: Record<number, T>,
    end: number
): Record<number, T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => Number(key) <= end)
    );
}
