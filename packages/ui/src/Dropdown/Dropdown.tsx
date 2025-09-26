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
        const containerRef = useRef<HTMLDivElement>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);

        // Let the parent access our DOM node
        useImperativeHandle(
            forwardedRef,
            () => dropdownRef.current as HTMLDivElement
        );

        const [dropdownTop, setDropdownTop] = useState<number>(0);
        const [dropdownX, setDropdownX] = useState<number>(0);
        const [arrowTop, setArrowTop] = useState<number>(0);
        const [arrowX, setArrowX] = useState<number>(0);

        const [isPlacedAbove, setIsPlacedAbove] = useState<boolean>(false);
        const [placed, setPlaced] = useState<boolean>(false);

        useEffect(() => {
            if (triggerRef?.current && dropdownRef.current) {
                console.log("We have Trigger REf!");

                const triggerRect = triggerRef.current.getBoundingClientRect();
                const dropdownRect =
                    dropdownRef.current.getBoundingClientRect();
                const padding = 10;

                let dTop = triggerRect.bottom + padding;
                let dX = triggerRect.width / 2;
                let aTop = dTop;
                const aX = dX;

                // Prevent overflow bottom
                if (dTop + dropdownRect.height > window.innerHeight) {
                    dTop = triggerRect.top - dropdownRect.height - padding;
                    aTop = triggerRect.top - padding;
                    setIsPlacedAbove(true);
                } else setIsPlacedAbove(false);

                // Prevent overflow right
                if (dX + dropdownRect.width / 2 > window.innerWidth - padding) {
                    dX = window.innerWidth - dropdownRect.width / 2 - padding;
                }

                // Prevent overflow left
                if (dX - dropdownRect.width / 2 < padding) {
                    dX = dropdownRect.width / 2 + padding;
                }

                setDropdownTop(dTop);
                setDropdownX(dX);

                // Arrow Placing
                setArrowTop(aTop);
                setArrowX(aX);

                setPlaced(true);
            } else if (containerRef.current && dropdownRef.current) {
                const baseRect = containerRef.current.getBoundingClientRect();
                const dropdownRect =
                    dropdownRef.current.getBoundingClientRect();

                // Prevent overflow bottom
                if (
                    window.innerWidth - baseRect.bottom < dropdownRect.height &&
                    baseRect.top > dropdownRect.height
                ) {
                    setIsPlacedAbove(true);
                } else setIsPlacedAbove(false);

                // Dropdown Placing
                setDropdownTop(0);
                setDropdownX(0);

                // Arrow Placing
                setArrowTop(0);
                setArrowX(0);

                setPlaced(true);
            }
        }, [children]);

        return (
            <div ref={containerRef} className={styles.dropdownContainer}>
                <span
                    className={classNames(
                        styles.arrow,
                        {
                            [styles.isPlacedAbove]: isPlacedAbove,
                        },
                        { [styles.blur]: blur }
                    )}
                    style={{
                        visibility: placed ? "visible" : "hidden",
                    }}
                />
                <WithInteractions onOutsideClick={onClose}>
                    <Card
                        ref={dropdownRef}
                        blur={blur}
                        level={level}
                        {...restProps}
                        className={classNames(
                            styles.dropdownCard,
                            { [styles.isPlacedAbove]: isPlacedAbove },
                            className
                        )}
                        style={{
                            visibility: placed ? "visible" : "hidden",
                            ...style,
                        }}
                    >
                        {children}
                    </Card>
                </WithInteractions>
            </div>
        );
    }
);
