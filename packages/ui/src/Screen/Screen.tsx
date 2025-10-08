import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Screen.module.css";

export interface ScreenProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    children?: React.ReactNode;
}

export const Screen = forwardRef<HTMLDivElement, ScreenProps>(function Screen(
    { align, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { demandChildsToBeFullWidth: true },
        styles.screen,
        className
    );

    return (
        <div ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
});
