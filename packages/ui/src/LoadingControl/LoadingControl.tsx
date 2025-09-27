"use client";

import React, { forwardRef, useEffect, useState } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import { DisplayOnVisible } from "../DisplayOnVisible/DisplayOnVisible";

export interface LoadingControlProps
    extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidth?: boolean;
    children: React.ReactElement<{
        index?: number;
    }>;
}

export const LoadingControl = forwardRef<HTMLDivElement, LoadingControlProps>(
    function LoadingControl(
        { align, fullWidth = true, className, children, ...restProps },
        ref
    ) {
        const [maxVisibledItem, setMaxVisibledItem] = useState<number>(0);
        const [loadedItems, setloadedItems] = useState<any[]>([
            React.cloneElement(children, { index: 0 }),
        ]);

        const handleOnVisible = (index: number) => {
            if (maxVisibledItem < index) setMaxVisibledItem(index);
        };

        useEffect(() => {
            if (loadedItems.length <= maxVisibledItem + 5) {
                console.log("Item ", loadedItems.length, " Added!");
                setloadedItems([
                    ...loadedItems,
                    React.cloneElement(children, {
                        index: loadedItems.length,
                    }),
                ]);
            }
        }, [loadedItems, maxVisibledItem]);

        console.log("maxVisibledItem", maxVisibledItem);

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
                        key={index}
                        onVisible={() => handleOnVisible(index)}
                    >
                        {item}
                    </DisplayOnVisible>
                ))}
            </div>
        );
    }
);
