"use client";

import { forwardRef, useImperativeHandle } from "react";
import classNames from "classnames";
import { Symbol } from "@yakad/symbols";
import {
    Button,
    Card,
    CardProps,
    OverlayProps,
    Row,
    Screen,
    Spacer,
    Stack,
    Text,
    useOnOutsideClick,
} from "..";
import styles from "./Popup.module.css";

export interface PopupProps extends CardProps, OverlayProps {
    heading?: string;
}

export const Popup = forwardRef<HTMLDivElement, PopupProps>(function Popup(
    { align, onClose, heading, className, children, ...restProps },
    forwardedRef
) {
    const localRef = useOnOutsideClick<HTMLDivElement>(() => {
        onClose?.();
    });

    useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);

    return (
        <Screen align="center" className={styles.popupscreen}>
            <Card
                ref={localRef}
                {...restProps}
                className={classNames(styles.popup, className)}
            >
                <Row style={{ marginBottom: "2rem" }}>
                    <Text variant="heading4">{heading}</Text>
                    <Spacer />
                    <Button
                        title="Close"
                        icon={<Symbol icon="close" />}
                        onClick={onClose}
                    />
                </Row>
                <Stack
                    align={align}
                    style={{ width: "100%", overflowY: "auto" }}
                >
                    {children}
                </Stack>
            </Card>
        </Screen>
    );
});
