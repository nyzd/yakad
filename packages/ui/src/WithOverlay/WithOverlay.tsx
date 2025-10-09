"use client";

import {
    useState,
    cloneElement,
    useEffect,
    useRef,
    RefObject,
    forwardRef,
    useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import {
    Dropdown,
    DropdownProps,
    Popup,
    PopupProps,
    WithInteractions,
    WithInteractionsProps,
} from "..";

export interface OverlayProps {
    triggerref?: RefObject<HTMLElement | null>;
    onClose?: () => void;
}
type AllowedOverlays =
    | React.ReactElement<PopupProps, typeof Popup>
    | React.ReactElement<DropdownProps, typeof Dropdown>;

export interface WithOverlayProps extends WithInteractionsProps {
    trigger?: "onClick" | "onRightClick";
    overlay?: AllowedOverlays;
    children?: React.ReactElement;
}

export const WithOverlay = forwardRef<HTMLDivElement, WithOverlayProps>(
    function WithOverlay(
        {
            trigger = "onClick",
            overlay,
            children,
            onRightClick,
            onClick,
            ...restProps
        },
        forwardedRef
    ) {
        // Get Triggers ref and send to Overlay
        const triggerRef = useRef<HTMLDivElement | null>(null);
        // Let the parent access our DOM node
        useImperativeHandle(
            forwardedRef,
            () => triggerRef.current as HTMLDivElement
        );

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
                document.getElementsByClassName("portalRoot")[0] ||
                    document.body
            );

        return (
            <>
                <WithInteractions
                    ref={triggerRef}
                    {...restProps}
                    onRightClick={(e) => {
                        trigger === "onRightClick" && setShowOverlay(true);
                        onRightClick?.(e);
                    }}
                    onClick={(e) => {
                        trigger === "onClick" && setShowOverlay(true);
                        onClick?.(e);
                    }}
                >
                    {children}
                </WithInteractions>
                {showOverlay && teleport}
            </>
        );
    }
);
