import { forwardRef } from "react";
import classNames from "classnames";
import { BoxProps } from "../boxing";
import boxingStyles from "../boxing.module.css";
import styles from "./Display.module.css";

export interface DisplayProps
    extends BoxProps,
        React.HTMLAttributes<HTMLDivElement> {
    minWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    children?: React.ReactNode;
}

export const Display = forwardRef<HTMLDivElement, DisplayProps>(
    function Display(
        {
            align,
            fullWidth = true,
            minWidth,
            maxWidth,
            className,
            children,
            ...restProps
        },
        ref
    ) {
        const joinedClassNames = classNames(
            boxingStyles.flexColumnBox,
            { [boxingStyles[align as string]]: align },
            { fullWidth: fullWidth },
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
