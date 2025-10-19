import React from "react";
import classNames from "classnames";
import { Symbol } from "@yakad/symbols";
import { Button, Card } from "..";
import boxingStyles from "../boxing.module.css";
import styles from "./CodeBox.module.css";

export interface CodeBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    copyButton?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}

export function CodeBox({
    copyButton,
    className,
    children,
    ...restProps
}: CodeBoxProps) {
    const joinedClassNames = classNames(
        { [boxingStyles.fullWidthOnParentDemand]: true },
        styles.ZZZZZZZZZZ,
        className
    );

    return (
        <Card {...restProps} className={joinedClassNames}>
            <pre>{children}</pre>
            {copyButton && <Button icon={<Symbol icon="copy_all" />} />}
        </Card>
    );
}
