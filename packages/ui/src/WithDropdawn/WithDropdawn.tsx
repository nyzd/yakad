"use client";

import { useRef, useState, useEffect, cloneElement } from "react";
import classNames from "classnames";
import { WithInteractions } from "../";
import boxingStyles from "../boxing.module.css";
import styles from "./WithDropdawn.module.css";

export interface WithDropdawnProps
    extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "center" | "end";
    blur?: boolean;
    trigger?: "onClick" | "onRightClick";
    dropdawnChildren?: React.ReactElement;
    children?: React.ReactElement<{
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    }>;
}

export const WithDropdawn = ({
    align,
    blur,
    trigger = "onClick",
    dropdawnChildren,
    className,
    style,
    children,
    ...restProps
}: WithDropdawnProps) => {
    const toggleElementRef = useRef<HTMLElement | null>(null);
    const dropdawnRef = useRef<HTMLDivElement | null>(null);
    const [showDropdawn, setShowDropdawn] = useState(false);

    const [dropdawnOnTop, setDropdawnOnTop] = useState(false);
    const [top, setTop] = useState<number>(0);
    const [dropdawnX, setDropdawnX] = useState<number>(0);
    const [arrowTop, setArrowTop] = useState<number>(0);
    const [arrowX, setArrowX] = useState<number>(0);

    const toggleShowDropdawn = () => setShowDropdawn((prev) => !prev);

    useEffect(() => {
        if (toggleElementRef.current && dropdawnRef.current) {
            const buttonRect = toggleElementRef.current.getBoundingClientRect();
            const dropdawnRect = dropdawnRef.current.getBoundingClientRect();
            const padding = 10;

            let dTop = buttonRect.bottom + padding;
            let dX = buttonRect.x + buttonRect.width / 2;
            let aTop = top;
            let aX = dX;

            // Prevent overflow bottom
            if (dTop + dropdawnRect.height > window.innerHeight) {
                dTop = buttonRect.top - dropdawnRect.height - padding;
                aTop = buttonRect.top - padding;
                setDropdawnOnTop(true);
            } else setDropdawnOnTop(false);

            // Prevent overflow right
            if (dX + dropdawnRect.width / 2 > window.innerWidth - padding) {
                dX = window.innerWidth - dropdawnRect.width / 2 - padding;
            }

            // Prevent overflow left
            if (dX - dropdawnRect.width / 2 < padding) {
                dX = dropdawnRect.width / 2 + padding;
            }

            setTop(dTop);
            setDropdawnX(dX);

            // Arrow Placing
            setArrowTop(aTop);
            setArrowX(aX);
        }
    }, [showDropdawn, dropdawnChildren]);

    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        styles.dropdawnCard,
        { [styles.blur]: blur },
        className
    );

    return (
        <>
            <WithInteractions
                ref={toggleElementRef}
                onRightClick={() =>
                    trigger === "onRightClick" && setShowDropdawn(true)
                }
            >
                {children &&
                    cloneElement(children, {
                        onClick: (e: React.MouseEvent<HTMLElement>) => {
                            children.props.onClick?.(e);
                            trigger === "onClick" && toggleShowDropdawn();
                        },
                    })}
            </WithInteractions>
            <span
                className={classNames(
                    styles.arrow,
                    {
                        [styles.dropdawnOnTop]: dropdawnOnTop,
                    },
                    { [styles.blur]: blur }
                )}
                style={{
                    top: arrowTop,
                    left: arrowX,
                    visibility: showDropdawn ? "visible" : "hidden",
                }}
            />
            <WithInteractions onOutsideClick={() => setShowDropdawn(false)}>
                <div
                    ref={dropdawnRef}
                    {...restProps}
                    className={joinedClassNames}
                    style={{
                        top: top,
                        left: dropdawnX,
                        visibility: showDropdawn ? "visible" : "hidden",
                        ...style,
                    }}
                >
                    {dropdawnChildren}
                </div>
            </WithInteractions>
        </>
    );
};
WithDropdawn.displayName = "WithDropdawn";
