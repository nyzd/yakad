"use client";

import React, { forwardRef, useEffect, useState } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import { DisplayOnVisible } from "..";

type LoadingControlV2Children = React.ReactElement<{
    index?: number;
}>;

export interface LoadingControlV2Props
    extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidth?: boolean;
    loadingLimit?: number;
    children: LoadingControlV2Children;
}

export const LoadingControlV2 = forwardRef<
    HTMLDivElement,
    LoadingControlV2Props
>(function LoadingControlV2(
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [loadedItems, setLoadedItems] = useState<any[]>([
        React.cloneElement(children, {
            index: 0,
        }),
    ]);
    const [visibilityStatus, setVisibilityStatus] = useState<
        Record<number, boolean>
    >({});

    const handleOnVisibilityChange = (visible: boolean, i?: number) => {
        if (i !== undefined && visibilityStatus[i] !== visible)
            setVisibilityStatus((prev) => ({ ...prev, [i]: visible }));
    };

    const visibleIndexes = Object.entries(visibilityStatus)
        .filter(([_, isVisible]) => isVisible)
        .map(([index]) => parseInt(index));
    const visibleCount = Object.values(visibilityStatus).filter(Boolean).length;
    const lowestVisibleItemIndex = visibleIndexes.length
        ? Math.min(...visibleIndexes)
        : 0;
    const highestVisibleItemIndex = visibleIndexes.length
        ? Math.max(...visibleIndexes)
        : 0;

    const lowestLoadedItemIndex = loadedItems[0].props.index;
    const highestLoadedItemIndex =
        loadedItems[loadedItems.length - 1].props.index;

    useEffect(() => {
        if (
            highestLoadedItemIndex < loadingLimit &&
            highestLoadedItemIndex < highestVisibleItemIndex + extraLoading
        ) {
            setLoadedItems(
                [
                    ...loadedItems,
                    React.cloneElement(children, {
                        index: highestLoadedItemIndex + 1,
                    }),
                ].slice(
                    // Slice from start
                    lowestVisibleItemIndex - lowestLoadedItemIndex >
                        extraLoading
                        ? 1
                        : 0
                )
            );
            console.log(
                ">>>>>>>>>>>>>>>>>>>>>>>> ++++ Item ",
                highestLoadedItemIndex + 1,
                " Added to end"
            );
        }

        if (
            lowestLoadedItemIndex > 0 &&
            lowestLoadedItemIndex > lowestVisibleItemIndex - extraLoading
        ) {
            setLoadedItems(
                [
                    React.cloneElement(children, {
                        index: lowestLoadedItemIndex - 1,
                    }),
                    ...loadedItems,
                ].slice(
                    // Slice from end
                    0,
                    highestLoadedItemIndex - highestVisibleItemIndex >
                        extraLoading
                        ? -1
                        : undefined
                )
            );
            console.log(
                ">>>>>>>>>>>> ---- Item ",
                lowestLoadedItemIndex - 1,
                " Added to start"
            );
        }

        if (visibleCount > maxTotalVisibledItems) {
            setMaxTotalVisibledItems(visibleCount);
        }
    }, [visibilityStatus]);

    console.log(
        "###### ",
        "Total Loaded:",
        loadedItems.length,
        "visibleCount:",
        visibleCount,
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
        "D:",
        highestLoadedItemIndex - highestVisibleItemIndex,
        "V:",
        highestVisibleItemIndex,
        "L:",
        highestLoadedItemIndex
    );
    // console.log("visibilityStatus", visibilityStatus);
    // console.log(
    //     "loadedItems",
    //     loadedItems.map((item) => item.props.index)
    // );
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
            {loadedItems.map((item) => (
                <DisplayOnVisible
                    key={item.props.index}
                    onVisibilityChange={(visible) =>
                        handleOnVisibilityChange(visible, item.props.index)
                    }
                >
                    <h1>{item.props.index}</h1>
                    {item}
                </DisplayOnVisible>
            ))}
        </div>
    );
});
