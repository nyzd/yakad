import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Stack.module.css";
import { BoxProps } from "../boxing";

export interface StackProps
    extends BoxProps,
        React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
    { align, fullWidth = true, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { fullWidth: fullWidth },
        styles.stack,
        className
    );

    return (
        <div ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
});
