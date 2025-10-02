"use client";

import { Activity, forwardRef, useState } from "react";
import { StackProps, WithInteractions } from "..";

export interface ActiveOnVisibleProps extends StackProps {}

export const ActiveOnVisible = forwardRef<HTMLDivElement, ActiveOnVisibleProps>(
    function ActiveOnVisible({ children, ...restProps }, ref) {
        const [isVisible, setIsVisible] = useState<boolean>(true);

        return (
            <WithInteractions
                ref={ref}
                {...restProps}
                onVisibilityChange={(v) => setIsVisible(v)}
            >
                <Activity mode={isVisible ? "visible" : "hidden"}>
                    {children}
                </Activity>
            </WithInteractions>
        );
    }
);
