import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Row.module.css";

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidthOnParentDemand?: boolean;
    overflow?: "shrink" | "wrap" | "scroll";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}

export function Row({
    align,
    fullWidthOnParentDemand = true,
    overflow = "shrink",
    size = "xl",
    className,
    children,
    ...restProps
}: RowProps) {
    const joinedClassNames = classNames(
        boxingStyles.flexRowBox,
        { [boxingStyles[align as string]]: align },
        boxingStyles[overflow],
        styles.row,
        { [boxingStyles.fullWidthOnParentDemand]: fullWidthOnParentDemand },
        styles[size],
        className
    );

    return (
        <div {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
}
