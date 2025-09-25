"use client";

import { useState, cloneElement, useEffect } from "react";
import {
    Dropdown,
    DropdownProps,
    Popup,
    PopupProps,
    WithInteractions,
} from "..";

type AllowedOverlays =
    | React.ReactElement<PopupProps, typeof Popup>
    | React.ReactElement<DropdownProps, typeof Dropdown>;

export interface WithPopupProps {
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
}: WithPopupProps) {
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
                    cloneElement(children, {
                        onClick: (e: React.MouseEvent<HTMLElement>) => {
                            children.props.onClick?.(e);
                            trigger === "onClick" && setShowOverlay(true);
                        },
                    })}
            </WithInteractions>
            {showOverlay &&
                overlay &&
                cloneElement(overlay, {
                    onClose: () => {
                        overlay.props.onClose;
                        setShowOverlay(false);
                    },
                })}
        </>
    );
}
