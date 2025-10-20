import classNames from "classnames";
import styles from "./Spacer.module.css";

export interface SpacerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    ref?: React.Ref<HTMLDivElement>;
}

export function Spacer({ className, ...restProps }: SpacerProps) {
    const joinedClassNames = classNames(styles.spacer, className);

    return <div {...restProps} className={joinedClassNames} />;
}
