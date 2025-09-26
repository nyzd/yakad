"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import { WithInteractions } from "..";
import { BoxProps } from "../boxing";

export interface RenderOnVisibleProps
    extends BoxProps,
        React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const RenderOnVisible = forwardRef<HTMLDivElement, RenderOnVisibleProps>(
    function RenderOnVisible(
        { align, fullWidth = true, className, style, children, ...restProps },
        forwardedRef
    ) {
        const localRef = useRef<HTMLDivElement>(null);
        // Let the parent access our DOM node
        useImperativeHandle(
            forwardedRef,
            () => localRef.current as HTMLDivElement
        );

        const [boxHeight, setBoxHeight] = useState<number>(0);
        const isVisible = boxHeight === 0;

        const handleOnVisible = () => {
            setBoxHeight(0);
        };
        const handleOnHidden = () => {
            if (localRef.current) {
                const boxRect = localRef.current.getBoundingClientRect();
                setBoxHeight(boxRect.height);
            }
        };

        const joinedClassNames = classNames(
            boxingStyles.flexColumnBox,
            { [boxingStyles[align as string]]: align },
            { fullWidth: fullWidth },
            className
        );

        return (
            <WithInteractions
                onVisible={handleOnVisible}
                onHidden={handleOnHidden}
            >
                <div
                    ref={localRef}
                    {...restProps}
                    className={joinedClassNames}
                    style={{ height: boxHeight || "auto", ...style }}
                >
                    {isVisible && children}
                </div>
            </WithInteractions>
        );
    }
);
