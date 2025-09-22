import { forwardRef } from "react";
import {
    Button,
    Card,
    CardProps,
    Row,
    Spacer,
    Stack,
    Text,
    WithInteractions,
} from "@yakad/ui";
import { Symbol } from "@yakad/symbols";
import styles from "./Xpopup.module.css";
import classNames from "classnames";

export interface XpopupProps extends CardProps {
    align?: "start" | "space" | "center" | "end";
    heading?: string;
    onCloseButtClick?: () => void;
    children?: React.ReactNode;
}

export const Xpopup = forwardRef<HTMLDivElement, XpopupProps>(function Xpopup(
    { align, heading, onCloseButtClick, className, children, ...restProps },
    ref
) {
    return (
        <div className={styles.xpopupscreen}>
            <WithInteractions onOutsideClick={onCloseButtClick}>
                <Card
                    ref={ref}
                    {...restProps}
                    className={classNames(styles.xpopup, className)}
                >
                    <Row style={{ marginBottom: "2rem" }}>
                        <Text variant="heading4">{heading}</Text>
                        <Spacer />
                        <Button
                            title="Close"
                            icon={<Symbol icon="close" />}
                            onClick={onCloseButtClick}
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
