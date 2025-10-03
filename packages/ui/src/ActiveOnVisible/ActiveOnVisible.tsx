"use client";

import {
    Activity,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { StackProps, WithInteractions } from "..";

export interface ActiveOnVisibleProps extends StackProps {}

export const ActiveOnVisible = forwardRef<HTMLDivElement, ActiveOnVisibleProps>(
    function ActiveOnVisible({ style, children, ...restProps }, forwardedRef) {
        const localRef = useRef<HTMLDivElement | null>(null);
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

        return (
            <WithInteractions
                ref={localRef}
                {...restProps}
                style={{ height: boxHeight || "auto", ...style }}
                onVisible={handleOnVisible}
                onHidden={handleOnHidden}
            >
                <Activity mode={isVisible ? "visible" : "hidden"}>
                    {children}
                </Activity>
            </WithInteractions>
        );
    }
);
