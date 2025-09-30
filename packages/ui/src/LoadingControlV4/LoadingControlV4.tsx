"use client";

import React, { forwardRef, useEffect, useState } from "react";
import classNames from "classnames";
import { DisplayOnVisible, RenderOnVisible, WithInteractions } from "..";
import boxingStyles from "../boxing.module.css";

export interface LoadingControlV4ChildrenProps {
    onLoad?: () => void;
}

export interface LoadingControlV4Props
    extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidth?: boolean;
    children: React.ReactElement<LoadingControlV4ChildrenProps>[];
}

export const LoadingControlV4 = forwardRef<
    HTMLDivElement,
    LoadingControlV4Props
>(function LoadingControlV4(
    { align, fullWidth = true, className, children, ...restProps },
    ref
) {
    // Collect Visibility Data
    const [visibilityStatus, setVisibilityStatus] = useState<
        Record<number, boolean>
    >({});
    const handleOnVisibilityChange = (index: number, visible: boolean) => {
        if (index !== undefined)
            if (visibilityStatus[index] !== visible)
                setVisibilityStatus((prev) => ({ ...prev, [index]: visible }));
    };
    const visibleIndexes = Object.entries(visibilityStatus)
        // eslint-disable-next-line
        .filter(([_, isVisible]) => isVisible)
        .map(([index]) => parseInt(index));
    const visibleCount = Object.values(visibilityStatus).filter(Boolean).length;
    const lowestVisibleChildIndex = visibleIndexes.length
        ? Math.min(...visibleIndexes)
        : 0;
    const highestVisibleChildIndex = visibleIndexes.length
        ? Math.max(...visibleIndexes)
        : 0;

    // Calculate Extra Loading
    const [maxTotalVisibledChilds, setMaxTotalVisibledChilds] =
        useState<number>(3); // Min: default
    if (visibleCount > maxTotalVisibledChilds) {
        setMaxTotalVisibledChilds(visibleCount);
    }
    const extraLoading = maxTotalVisibledChilds * 2;

    // Render Zone
    const childrenArray = React.Children.toArray(children);
    const [lowestRenderedChild, setLowestRenderedChild] = useState<number>(0);
    const [highestRenderedChild, setHighestRenderedChild] = useState<number>(1);

    const renderArray = (
        childrenArray as React.ReactElement<LoadingControlV4ChildrenProps>[]
    ).slice(lowestRenderedChild, highestRenderedChild);

    useEffect(() => {
        if (lowestVisibleChildIndex - lowestRenderedChild < extraLoading) {
            setLowestRenderedChild(Math.max(0, lowestRenderedChild - 1));
        }
        if (highestRenderedChild - highestVisibleChildIndex < extraLoading) {
            setHighestRenderedChild(
                Math.min(childrenArray.length, highestRenderedChild + 1)
            );
        }
    }, [visibleIndexes]);

    console.log(
        "L:",
        lowestRenderedChild,
        "V:",
        lowestVisibleChildIndex,
        "|",
        "V:",
        highestVisibleChildIndex,
        "L:",
        highestRenderedChild
    );

    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { fullWidth: fullWidth },
        className
    );

    return (
        <div ref={ref} className={joinedClassNames} {...restProps}>
            {renderArray.map((child, index) => (
                <WithInteractions
                    key={index}
                    onVisibilityChange={(visible) =>
                        handleOnVisibilityChange(index, visible)
                    }
                >
                    <div>{child}</div>
                </WithInteractions>
            ))}
        </div>
    );
});
