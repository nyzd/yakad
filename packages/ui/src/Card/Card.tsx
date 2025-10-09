import { forwardRef } from "react";
import classNames from "classnames";
import { Stack, StackProps } from "..";
import styles from "./Card.module.css";
import "./card.css";

export interface CardProps extends StackProps {
    blur?: boolean;
    level?: "transparent" | "low" | "mid" | "high";
    hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
    { blur, level, hoverEffect, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.card,
        { [styles.blur]: blur },
        { [styles.elevated]: level !== "transparent" },
        {
            yakadCardAutoLevel: !level || level === "transparent",
            yakadCardLowLevel: level === "low",
            yakadCardMidLevel: level === "mid",
            yakadCardHighLevel: level === "high",
        },
        { [styles.hoverEffect]: hoverEffect },
        className
    );

    return (
        <Stack ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </Stack>
    );
});
