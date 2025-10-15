"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Stack, StackProps, useOnVisibilityChange } from "..";

export interface ActiveOnVisibleProps extends StackProps {
    onVisibilityChange?: (visible: boolean) => void;
}

export const ActiveOnVisible = forwardRef<HTMLDivElement, ActiveOnVisibleProps>(
    function ActiveOnVisible(
        { onVisibilityChange, style, children, ...restProps },
        forwardedRef
    ) {
        const localRef = useRef<HTMLDivElement | null>(null);
        const [boxHeight, setBoxHeight] = useState<number>(0);
        // const isVisible = boxHeight === 0;

        // Let the parent access our DOM node
        useImperativeHandle(
            forwardedRef,
            () => localRef.current as HTMLDivElement
        );

        useOnVisibilityChange((visible) => {
            onVisibilityChange?.(visible);
            if (visible) {
                setBoxHeight(0);
            } else {
                const boxRect = localRef.current?.getBoundingClientRect();
                setBoxHeight(boxRect!.height);
            }
        }, localRef);

        return (
            <Stack
                ref={localRef}
                {...restProps}
                style={{ height: boxHeight || "auto", ...style }}
            >
                {/* <Activity mode={isVisible ? "visible" : "hidden"}> */}
                {children}
                {/* </Activity> */}
            </Stack>
        );
    }
);
