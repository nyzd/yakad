import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./ListItem.module.css";

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
    align?: "start" | "space" | "center" | "end";
    ref?: React.Ref<HTMLLIElement>;
}

export function ListItem({
    align,
    className,
    children,
    ...restProps
}: ListItemProps) {
    return (
        <li
            {...restProps}
            className={classNames(
                boxingStyles.flexColumnBox,
                { [boxingStyles[align as string]]: align },
                { [boxingStyles.demandChildsToBeFullWidth]: true },
                styles.listItem,
                className
            )}
        >
            {children}
        </li>
    );
}
