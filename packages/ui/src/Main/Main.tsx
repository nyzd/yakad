import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Main.module.css";

export interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "center" | "end";
    navopen?: boolean;
    children?: React.ReactNode;
}

export const Main = forwardRef<HTMLDivElement, MainProps>(
    ({ align, navopen = false, className, children, ...restProps }, ref) => {
        const joinedClassNames = classNames(
            boxingStyles.flexColumnBox,
            { [boxingStyles[align as string]]: align },
            styles.main,
            { [styles.navOpen]: navopen },
            className
        );

        return (
            <main ref={ref} {...restProps} className={joinedClassNames}>
                {children}
            </main>
        );
    }
);
Main.displayName = "Main";
