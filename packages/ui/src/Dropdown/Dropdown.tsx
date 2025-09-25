"use client";

import { useRef, useState, useEffect, RefObject } from "react";
import classNames from "classnames";
import { WithInteractions } from "..";
import boxingStyles from "../boxing.module.css";
import styles from "./Dropdown.module.css";

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    blur?: boolean;
    triggerRef?: RefObject<HTMLElement>;
    onClose?: () => void;
    children?: React.ReactNode;
}

export function Dropdown({
    align,
    blur,
    triggerRef,
    onClose,
    className,
    style,
    children,
    ...restProps
}: DropdownProps) {
    const triggedFromRef = useRef<HTMLDivElement | null>(null);
    const locationRef = triggerRef || triggedFromRef;
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [dropdownOnTop, setDropdownOnTop] = useState(false);
    const [top, setTop] = useState<number>(0);
    const [dropdownX, setDropdownX] = useState<number>(0);
    const [arrowTop, setArrowTop] = useState<number>(0);
    const [arrowX, setArrowX] = useState<number>(0);

    const [located, setLocated] = useState<boolean>(false);

    useEffect(() => {
        if (locationRef.current && dropdownRef.current) {
            const buttonRect = locationRef.current.getBoundingClientRect();
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const padding = 10;

            let dTop = buttonRect.bottom + padding;
            let dX = buttonRect.x + buttonRect.width / 2;
            let aTop = dTop;
            const aX = dX;

            // Prevent overflow bottom
            if (dTop + dropdownRect.height > window.innerHeight) {
                dTop = buttonRect.top - dropdownRect.height - padding;
                aTop = buttonRect.top - padding;
                setDropdownOnTop(true);
            } else setDropdownOnTop(false);

            // Prevent overflow right
            if (dX + dropdownRect.width / 2 > window.innerWidth - padding) {
                dX = window.innerWidth - dropdownRect.width / 2 - padding;
            }

            // Prevent overflow left
            if (dX - dropdownRect.width / 2 < padding) {
                dX = dropdownRect.width / 2 + padding;
            }

            setTop(dTop);
            setDropdownX(dX);

            // Arrow Placing
            setArrowTop(aTop);
            setArrowX(aX);

            setLocated(true);
        }
    }, [children]);

    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        styles.dropdownCard,
        { [styles.blur]: blur },
        className
    );

    return (
        <>
            {triggerRef || (
                <div ref={triggedFromRef} style={{ display: "inline-block" }} />
            )}
            <span
                className={classNames(
                    styles.arrow,
                    {
                        [styles.dropdownOnTop]: dropdownOnTop,
                    },
                    { [styles.blur]: blur }
                )}
                style={{
                    top: arrowTop,
                    left: arrowX,
                    visibility: located ? "visible" : "hidden",
                }}
            />
            <WithInteractions onOutsideClick={onClose}>
                <div
                    ref={dropdownRef}
                    {...restProps}
                    className={joinedClassNames}
                    style={{
                        top: top,
                        left: dropdownX,
                        visibility: located ? "visible" : "hidden",
                        ...style,
                    }}
                >
                    {children}
                </div>
            </WithInteractions>
        </>
    );
}
