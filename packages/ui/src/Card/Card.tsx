import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Card.module.css";
import "./card.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    blur?: boolean;
    level?: "low" | "mid" | "high";
    children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
    { align, blur, level, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { fullWidthLover: true },
        styles.card,
        // { [styles.blur]: blur },
        {
            yakadCardAutoLevel: level === undefined,
            yakadCardLowLevel: level === "low",
            yakadCardMidLevel: level === "mid",
            yakadCardHighLevel: level === "high",
        },
        className
    );

    return (
        <div ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
});
