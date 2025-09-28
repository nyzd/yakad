"use client";

import React, { forwardRef, useEffect, useState } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import { DisplayOnVisible } from "../DisplayOnVisible/DisplayOnVisible";
import { Button } from "../Button/Button";
import { Hr } from "../Hr/Hr";

export interface LoadingControlProps
    extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidth?: boolean;
    loadingLimit?: number;
    children: React.ReactElement<{
        index?: number;
        onLoad?: () => void;
    }>;
}

export const LoadingControl = forwardRef<HTMLDivElement, LoadingControlProps>(
    function LoadingControl(
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
        const [loadedItems, setLoadedItems] = useState<any[]>([
            React.cloneElement(children, {
                index: 0,
            }),
        ]);

        const handleOnVisible = (i: number) => {
            if (maxVisibledItem < i) setMaxVisibledItem(i);
        };

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
    }
);
