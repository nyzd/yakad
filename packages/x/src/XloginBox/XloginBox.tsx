import { forwardRef } from "react";
import classNames from "classnames";
import { AppBar, Card, Main, Screen, ScreenProps } from "@yakad/ui";
import styles from "./XloginBox.module.css";

export interface XloginBoxProps extends ScreenProps {
    classNameCard?: string;
    stylecard?: React.CSSProperties;
    children?: React.ReactNode;
}

export const XloginBox = forwardRef<HTMLDivElement, XloginBoxProps>(
    function XloginBox(
        { classNameCard, stylecard, children, ...restProps },
        ref
    ) {
        return (
            <Screen ref={ref} {...restProps}>
                <AppBar className={styles.header}></AppBar>
                <Main className={styles.main}>
                    <Card
                        className={classNames(styles.card, classNameCard)}
                        style={stylecard}
                    >
                        {children}
                    </Card>
                </Main>
            </Screen>
        );
    }
);
