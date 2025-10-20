import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./List.module.css";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
    direction?: "row" | "column";
    collapsed?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLUListElement>;
}

export function List({
    direction = "row",
    collapsed,
    className,
    children,
    ...restProps
}: ListProps) {
    const joinedClassNames = classNames(
        { [boxingStyles.fullWidthOnParentDemand]: true },
        styles.list,
        styles[direction],
        { [styles.collapsed]: collapsed },
        className
    );

    return (
        <ul {...restProps} className={joinedClassNames}>
            {children}
        </ul>
    );
}
