import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Screen.module.css";

export interface ScreenProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}

export function Screen({
    align,
    className,
    children,
    ...restProps
}: ScreenProps) {
    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { [boxingStyles.demandChildsToBeFullWidth]: true },
        styles.screen,
        className
    );

    return (
        <div {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
}
