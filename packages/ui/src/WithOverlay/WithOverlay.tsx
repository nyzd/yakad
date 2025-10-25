"use client";

import {
    useState,
    useRef,
    RefObject,
    useImperativeHandle,
    cloneElement,
} from "react";
import {
    Dropdown,
    DropdownProps,
    Popup,
    PopupProps,
    Stack,
    StackProps,
} from "..";
import { useOnRightClick } from "@yakad/use-interactions";

export interface OverlayProps {
    triggerref?: RefObject<HTMLElement | null>;
    onClose?: () => void;
}
type AllowedOverlays =
    | React.ReactElement<PopupProps, typeof Popup>
    | React.ReactElement<DropdownProps, typeof Dropdown>;

export interface WithOverlayProps extends StackProps {
    trigger?: "onClick" | "onRightClick";
    overlay?: AllowedOverlays;
    children?: React.ReactElement;
    ref?: React.Ref<HTMLDivElement>;
}

export function WithOverlay({
    trigger = "onClick",
    overlay,
    children,
    onClick,
    ref,
    ...restProps
}: WithOverlayProps) {
    // Get Triggers ref and send to Overlay
    const localRef = useRef<HTMLDivElement | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);

    useOnRightClick(() => {
        setShowOverlay(true);
    }, localRef);

    const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
        trigger === "onClick" && setShowOverlay((prev) => !prev);
        onClick?.(e);
    };

    // Let the parent access our DOM node
    useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    const clonedOverlay = cloneElement(overlay!, {
        triggerref: localRef,
        onClose: () => {
            overlay?.props.onClose?.();
            setShowOverlay(false);
        },
    });

    return (
        <>
            <Stack ref={localRef} {...restProps} onClick={onClickHandler}>
                {children}
            </Stack>
            {showOverlay && clonedOverlay}
        </>
    );
}
