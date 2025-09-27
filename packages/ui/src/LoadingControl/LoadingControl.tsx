"use client";

import React, { forwardRef, useState } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import { RenderOnVisible } from "../RenderOnVisible/RenderOnVisible";
import { Button } from "../Button/Button";

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
        const [biggestVisibledItem, setbiggestVisibledItem] =
            useState<number>(0);
        const [biggestLoadedItem, setbiggestLoadedItem] = useState<number>(0);

        const [loadedItems, setloadedItems] = useState<any[]>([
            React.cloneElement(children, { index: 0 }),
        ]);
        // const loadedItems = [React.cloneElement(children, { index: 0 })];
        // const loadedItems = [children];

        // const handleOnVisible = (index: number, visible: boolean) => {
        //     if (visible)
        //         if (biggestVisibledItem < index) setbiggestVisibledItem(index);
        //         else if (biggestLoadedItem < index + 10)
        //             setbiggestLoadedItem(biggestLoadedItem + 1);
        // };

        console.log(
            "biggestLoadedItem",
            biggestLoadedItem,
            "biggestVisibledItem",
            biggestVisibledItem
        );

        const joinedClassNames = classNames(
            boxingStyles.flexColumnBox,
            { [boxingStyles[align as string]]: align },
            { fullWidth: fullWidth },
            className
        );

        return (
            <>
                <div ref={ref} className={joinedClassNames} {...restProps}>
                    {loadedItems.map((item, index) => (
                        <React.Fragment key={index}>{item}</React.Fragment>
                    ))}
                </div>
                <Button
                    variant="filled"
                    onClick={() => {
                        console.log(
                            "new item ",
                            loadedItems.length,
                            " requested."
                        );
                        setloadedItems([
                            ...loadedItems,
                            React.cloneElement(children, {
                                index: loadedItems.length,
                            }),
                        ]);
                    }}
                >
                    Load More: {loadedItems.length}
                </Button>
            </>
        );
    }
);
