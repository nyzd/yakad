"use client";

import { useEffect, useImperativeHandle } from "react";
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
} from "..";
import styles from "./Popup.module.css";
import { createPortal } from "react-dom";
import { useOnOutsideClick } from "@yakad/use-interactions";

export interface PopupProps extends CardProps, OverlayProps {
    heading?: string;
    teleport?: boolean;
    ref?: React.Ref<HTMLDivElement>;
}

export function Popup({
    align,
    onClose,
    heading,
    className,
    children,
    teleport = false,
    ref,
    ...restProps
}: PopupProps) {
    const localRef = useOnOutsideClick<HTMLDivElement>(() => {
        onClose?.();
    });

    const doTeleport = () => {
        const portalRoot =
            document.getElementsByClassName("portalRoot")[0] || document;
        const t = portalRoot && createPortal(popup(), portalRoot);
        return t;
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "initial";
        };
    }, []);

    useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    const popup = () => (
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

    return teleport ? doTeleport() : popup();
}
