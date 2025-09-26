import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Row.module.css";
import { BoxProps } from "../boxing";

export interface RowProps
    extends BoxProps,
        React.HTMLAttributes<HTMLDivElement> {
    overflow?: "shrink" | "wrap" | "scroll";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    children?: React.ReactNode;
}

export const Row = forwardRef<HTMLDivElement, RowProps>(function Row(
    {
        align,
        fullWidth = true,
        overflow = "shrink",
        size = "xl",
        className,
        children,
        ...restProps
    },
    ref
) {
    const joinedClassNames = classNames(
        boxingStyles.flexRowBox,
        { [boxingStyles[align as string]]: align },
        boxingStyles[overflow],
        styles.row,
        { fullWidth: fullWidth },
        styles[size],
        className
    );

    return (
        <div ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
});
