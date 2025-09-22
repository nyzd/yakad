import { forwardRef } from "react";
import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./ListItem.module.css";

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
    align?: "start" | "space" | "center" | "end";
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
    function ListItem({ align, className, children, ...restProps }, ref) {
        return (
            <li
                ref={ref}
                {...restProps}
                className={classNames(
                    boxingStyles.flexColumnBox,
                    { [boxingStyles[align as string]]: align },
                    styles.listItem,
                    className
                )}
            >
                {children}
            </li>
        );
    }
);
