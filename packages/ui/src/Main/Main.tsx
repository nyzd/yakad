import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Main.module.css";

export interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    navOpen?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}

export function Main({
    align,
    navOpen = false,
    className,
    children,
    ...restProps
}: MainProps) {
    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { [boxingStyles.demandChildsToBeFullWidth]: true },
        styles.main,
        { [styles.navOpen]: navOpen },
        className
    );

    return (
        <main {...restProps} className={joinedClassNames}>
            {children}
        </main>
    );
}
