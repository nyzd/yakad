import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Main.module.css";

export interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    navOpen?: boolean;
    children?: React.ReactNode;
}

export const Main = forwardRef<HTMLDivElement, MainProps>(function Main(
    { align, navOpen = false, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        styles.main,
        { [styles.navOpen]: navOpen },
        className
    );

    return (
        <main ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </main>
    );
});
