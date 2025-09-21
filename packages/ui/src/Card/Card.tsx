import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    blur?: boolean;
    children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ align, blur, className, children, ...restProps }, ref) => {
        const joinedClassNames = classNames(
            boxingStyles.flexColumnBox,
            { [boxingStyles[align as string]]: align },
            "fullWidthLover",
            styles.card,
            { [styles.blur]: blur },
            className
        );

        return (
            <div ref={ref} {...restProps} className={joinedClassNames}>
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";
