import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Spacer.module.css";

export interface SpacerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(function Spacer(
    { className, ...restProps },
    ref
) {
    const joinedClassNames = classNames(styles.spacer, className);

    return <div ref={ref} {...restProps} className={joinedClassNames} />;
});
