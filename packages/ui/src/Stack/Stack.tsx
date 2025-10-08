import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Stack.module.css";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidthOnParentDemand?: boolean;
    children?: React.ReactNode;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
    {
        align,
        fullWidthOnParentDemand = true,
        className,
        children,
        ...restProps
    },
    ref
) {
    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { demandChildsToBeFullWidth: true },
        { fullWidthOnParentDemand: fullWidthOnParentDemand },
        styles.stack,
        className
    );

    return (
        <div ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
});
