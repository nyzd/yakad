"use client";

import React, { forwardRef, useEffect, useState } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import { DisplayOnVisible } from "../DisplayOnVisible/DisplayOnVisible";
import { Hr } from "../Hr/Hr";

type LoadingControlV2Children = React.ReactElement<{
    index?: number;
}>;

export interface LoadingControlV1Props
    extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidth?: boolean;
    loadingLimit?: number;
    children: LoadingControlV2Children;
}

export const LoadingControlV1 = forwardRef<
    HTMLDivElement,
    LoadingControlV1Props
>(function LoadingControlV1(
    {
        align,
        fullWidth = true,
        loadingLimit = 20,
        className,
        children,
        ...restProps
    },
    ref
) {
    const [maxLoadedItem, setMaxLoadedItem] = useState<number>(0);
    const [maxVisibledItem, setMaxVisibledItem] = useState<number>(0);
    const [loadedItems, setLoadedItems] = useState<LoadingControlV2Children[]>([
        React.cloneElement(children, {
            index: 0,
        }),
    ]);

    const handleOnVisible = (i?: number) => {
        if (i !== undefined && maxVisibledItem < i) setMaxVisibledItem(i);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useEffect(() => {
        if (maxLoadedItem < maxVisibledItem + 5) {
            const prevIndex = maxLoadedItem;
            setMaxLoadedItem(prevIndex + 1);
            setLoadedItems(
                [
                    ...loadedItems,
                    React.cloneElement(children, {
                        index: prevIndex + 1,
                    }),
                ].slice(loadedItems.length >= loadingLimit ? 1 : 0)
            );
        }
    }, [loadedItems, maxVisibledItem]);

    console.log(
        "loadedItems.length",
        loadedItems.length,
        "maxLoadedItem",
        maxLoadedItem,
        "maxVisibledItem",
        maxVisibledItem
    );

    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { fullWidth: fullWidth },
        className
    );

    return (
        <div ref={ref} className={joinedClassNames} {...restProps}>
            {loadedItems.map((item, index) => (
                <DisplayOnVisible
                    key={item.props.index}
                    onVisible={() => handleOnVisible(item.props.index)}
                >
                    <Hr />
                    <h1>{item.props.index}</h1>
                    {item}
                </DisplayOnVisible>
            ))}
        </div>
    );
});
