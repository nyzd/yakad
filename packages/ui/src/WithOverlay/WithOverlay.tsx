"use client";

import { useState, cloneElement, useEffect, useRef, RefObject } from "react";
import {
    Dropdown,
    DropdownProps,
    Popup,
    PopupProps,
    WithInteractions,
} from "..";
import { createPortal } from "react-dom";

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
    children?: React.ReactElement;
}

export function WithOverlay({
    trigger = "onClick",
    overlay,
    children,
}: WithOverlayProps) {
    // Get Triggers ref and send to Overlay
    const triggerRef = useRef<HTMLDivElement | null>(null);

    const [showOverlay, setShowOverlay] = useState(false);

    // Disable Body Scroll on showOverlay
    useEffect(() => {
        document.body.style.overflow = showOverlay ? "hidden" : "initial";

        return () => {
            document.body.style.overflow = "initial";
        };
    }, [showOverlay]);

    // Teleport Overlay to portalRoot or body
    const teleport =
        overlay &&
        createPortal(
            cloneElement(overlay, {
                triggerref: triggerRef,
                onClose: () => {
                    overlay.props.onClose?.();
                    setShowOverlay(false);
                },
            }),
            document.getElementsByClassName("portalRoot")[0] || document.body
        );

    return (
        <>
            <WithInteractions
                ref={triggerRef}
                onRightClick={() =>
                    trigger === "onRightClick" && setShowOverlay(true)
                }
                onClick={() => trigger === "onClick" && setShowOverlay(true)}
            >
                {children}
            </WithInteractions>
            {showOverlay && teleport}
        </>
    );
}
