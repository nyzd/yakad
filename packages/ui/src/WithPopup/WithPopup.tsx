"use client";

import { useState, cloneElement } from "react";
import { Popup, PopupProps, WithInteractions } from "..";

export interface WithPopupProps extends Omit<PopupProps, "onCloseButtClick"> {
    align?: "start" | "space" | "center" | "end";
    blur?: boolean;
    trigger?: "onClick" | "onRightClick";
    popupChildren?: React.ReactElement;
    children?: React.ReactElement<{
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    }>;
}

export function WithPopup({
    trigger = "onClick",
    popupChildren,
    children,
    ...restProps
}: WithPopupProps) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div>
            <WithInteractions
                onRightClick={() =>
                    trigger === "onRightClick" && setShowPopup(true)
                }
            >
                {children &&
                    cloneElement(children, {
                        onClick: (e: React.MouseEvent<HTMLElement>) => {
                            children.props.onClick?.(e);
                            trigger === "onClick" && setShowPopup(true);
                        },
                    })}
            </WithInteractions>
            <div>
                {showPopup && (
                    <Popup
                        onCloseButtClick={() => setShowPopup(false)}
                        {...restProps}
                    >
                        {popupChildren}
                    </Popup>
                )}
            </div>
        </div>
    );
}
