import { forwardRef } from "react";
import classNames from "classnames";
import { BoxProps } from "../boxing";
import boxingStyles from "../boxing.module.css";
import styles from "./Card.module.css";
import "./card.css";

export interface CardProps
    extends BoxProps,
        React.HTMLAttributes<HTMLDivElement> {
    blur?: boolean;
    level?: "low" | "mid" | "high";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
    { fullWidth = true, align, blur, level, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { fullWidth: fullWidth },
        styles.card,
        { [styles.blur]: blur },
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
