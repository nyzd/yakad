"use client";

import { useState, cloneElement, useEffect, useRef, RefObject } from "react";
import {
    Dropdown,
    DropdownProps,
    Popup,
    PopupProps,
    WithInteractions,
} from "..";
import { mergeRefs } from "@yakad/lib";

export interface OverlayProps {
    triggerref?: RefObject<HTMLElement | null>;
    onClose?: () => void;
}
type AllowedOverlays =
    | React.ReactElement<PopupProps, typeof Popup>
    | React.ReactElement<DropdownProps, typeof Dropdown>;

export interface WithOverlayProps {
    trigger?: "onClick" | "onRightClick";
    overlay?: AllowedOverlays;
    children?: React.ReactElement<{
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    }>;
}

export function WithOverlay({
    trigger = "onClick",
    overlay,
    children,
}: WithOverlayProps) {
    const triggerRef = useRef<HTMLElement>(null);

    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showOverlay ? "hidden" : "initial";

        return () => {
            document.body.style.overflow = "initial";
        };
    }, [showOverlay]);

    return (
        <>
            <WithInteractions
                onRightClick={() =>
                    trigger === "onRightClick" && setShowOverlay(true)
                }
            >
                {children &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    cloneElement(children as React.ReactElement<any, any>, {
                        ref: mergeRefs(
                            triggerRef,
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (children as any).props?.ref
                        ),
                        onClick: (e: React.MouseEvent<HTMLElement>) => {
                            children.props.onClick?.(e);
                            trigger === "onClick" && setShowOverlay(true);
                        },
                    })}
            </WithInteractions>
            {showOverlay &&
                overlay &&
                cloneElement(overlay, {
                    triggerref: triggerRef,
                    onClose: () => {
                        overlay.props.onClose?.();
                        setShowOverlay(false);
                    },
                })}
        </>
    );
}
