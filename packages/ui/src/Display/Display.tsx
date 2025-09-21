import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Display.module.css";

export interface DisplayProps extends React.HTMLAttributes<HTMLElement> {
    minWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    children?: React.ReactNode;
}

export const Display = forwardRef<HTMLDivElement, DisplayProps>(
    function Display(
        { minWidth, maxWidth, className, children, ...restProps },
        ref
    ) {
        const joinedClassNames = classNames(
            { fullWidthLover: true },
            { [styles[`${minWidth}MinWidth`]]: minWidth },
            { [styles[`${maxWidth}MaxWidth`]]: maxWidth },
            className
        );

        return (
            <div ref={ref} {...restProps} className={joinedClassNames}>
                {children}
            </div>
        );
    }
);
