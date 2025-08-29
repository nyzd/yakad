import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Navigation.module.css";

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
    align?: "start" | "center" | "end";
    anchor?: "left" | "right" | "top" | "bottom" | "auto";
    open: boolean;
    children?: React.ReactNode;
}

export const Navigation = forwardRef<HTMLDivElement, NavigationProps>(
    (
        {
            align,
            anchor = "auto",
            open = false,
            className,
            children,
            ...restProps
        },
        ref
    ) => {
        const joinedClassNames = classNames(
            boxingStyles.flexColumnBox,
            { [boxingStyles[align as string]]: align },
            styles.navigation,
            styles[anchor],
            {
                [styles.open]: open,
            },
            className
        );

        return (
            <nav ref={ref} {...restProps} className={joinedClassNames}>
                {children}
            </nav>
        );
    }
);
Navigation.displayName = "Navigation";
