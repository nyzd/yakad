"use client";

import {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import classNames from "classnames";
import { Card, CardProps, WithInteractions, OverlayProps } from "..";
import styles from "./Dropdown.module.css";

export interface DropdownProps extends CardProps, OverlayProps {}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
    function Dropdown(
        {
            fullWidth = false,
            blur,
            level = "high",
            triggerRef,
            onClose,
            className,
            style,
            children,
            ...restProps
        },
        forwardedRef
    ) {
        const fallbackTriggerRef = useRef<HTMLDivElement>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);

        const placementTargetRef = triggerRef || fallbackTriggerRef;

        // Let the parent access our DOM node
        useImperativeHandle(
            forwardedRef,
            () => dropdownRef.current as HTMLDivElement
        );

        const [arrowPosition, setArrowPosition] = useState<{
            top: number;
            left: number;
        }>({
            top: 0,
            left: 0,
        });
        const [dropdownPosition, setDropdownPosition] = useState<{
            top: number;
            left: number;
        }>({
            top: 0,
            left: 0,
        });

        const [isPlacedAbove, setIsPlacedAbove] = useState<boolean>(false);
        const [isPlaced, setIsPlaced] = useState<boolean>(false);

        useEffect(() => {
            if (placementTargetRef?.current && dropdownRef.current) {
                const placementTarget =
                    placementTargetRef.current.getBoundingClientRect();
                const dropdownRect =
                    dropdownRef.current.getBoundingClientRect();
                const padding = 10;

                let dropdownY = placementTarget.bottom + padding;
                let dropdownXPos =
                    placementTarget.left + placementTarget.width / 2;
                let arrowY = dropdownY;
                const arrowX = dropdownXPos;

                // Prevent overflow bottom
                if (
                    dropdownY + dropdownRect.height > window.innerHeight &&
                    placementTarget.top > dropdownRect.height
                ) {
                    dropdownY = placementTarget.top - padding;
                    arrowY = placementTarget.top - padding;
                    setIsPlacedAbove(true);
                } else setIsPlacedAbove(false);

                // Prevent overflow right
                if (
                    dropdownXPos + dropdownRect.width / 2 >
                    window.innerWidth - padding
                ) {
                    dropdownXPos =
                        window.innerWidth - dropdownRect.width / 2 - padding;
                }

                // Prevent overflow left
                if (dropdownXPos - dropdownRect.width / 2 < padding) {
                    dropdownXPos = dropdownRect.width / 2 + padding;
                }

                setDropdownPosition({
                    top: dropdownY,
                    left: dropdownXPos,
                });

                setArrowPosition({
                    top: arrowY,
                    left: arrowX,
                });

                setIsPlaced(true);
            }
        }, [children, placementTargetRef]);

        return (
            <>
                {!triggerRef && <div ref={fallbackTriggerRef} />}
                <WithInteractions onOutsideClick={onClose}>
                    <Card
                        ref={dropdownRef}
                        fullWidth={fullWidth}
                        blur={blur}
                        level={level}
                        {...restProps}
                        className={classNames(
                            styles.dropdownCard,
                            { [styles.isPlacedAbove]: isPlacedAbove },
                            className
                        )}
                        style={{
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                            visibility: isPlaced ? "visible" : "hidden",
                            ...style,
                        }}
                    >
                        {children}
                    </Card>
                </WithInteractions>
                <span
                    className={classNames(
                        styles.arrow,
                        {
                            [styles.isPlacedAbove]: isPlacedAbove,
                        },
                        { [styles.blur]: blur }
                    )}
                    style={{
                        top: arrowPosition.top,
                        left: arrowPosition.left,
                        visibility: isPlaced ? "visible" : "hidden",
                    }}
                />
            </>
        );
    }
);
