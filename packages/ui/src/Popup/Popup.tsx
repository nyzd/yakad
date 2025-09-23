"use client";

import { forwardRef } from "react";
import classNames from "classnames";
import { Symbol } from "@yakad/symbols";
import {
    Button,
    Card,
    CardProps,
    Row,
    Spacer,
    Stack,
    Text,
    WithInteractions,
} from "..";
import styles from "./Popup.module.css";

export interface PopupProps extends CardProps {
    align?: "start" | "space" | "center" | "end";
    heading?: string;
    onClose?: () => void;
    children?: React.ReactNode;
}

export const Popup = forwardRef<HTMLDivElement, PopupProps>(function Popup(
    { align, heading, onClose, className, children, ...restProps },
    ref
) {
    return (
        <div className={styles.popupscreen}>
            <WithInteractions onOutsideClick={onClose}>
                <Card
                    ref={ref}
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
            </WithInteractions>
        </div>
    );
});
