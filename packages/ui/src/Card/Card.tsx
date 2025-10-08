import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Card.module.css";
import "./card.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidthOnParentDemand?: boolean;
    blur?: boolean;
    level?: "transparent" | "low" | "mid" | "high";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
    {
        align,
        fullWidthOnParentDemand = true,
        blur,
        level,
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
        styles.card,
        { [styles.blur]: blur },
        { [styles.elevated]: level !== "transparent" },
        {
            yakadCardAutoLevel: !level || level === "transparent",
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
