import { forwardRef } from "react";
import classNames from "classnames";
import { LoadingIcon } from "..";
import styles from "./Button.module.css";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "small" | "medium" | "large";
    variant?:
        | "text"
        | "outlined"
        | "filled"
        | "filledtonal"
        | "tonal"
        | "elevated"
        | "link"
        | "fab";
    borderStyle?: "none" | "semi" | "squircle" | "rounded";
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
    loadingPosition?: "auto" | "center";
    loadingVariant?: "scaleOut" | "dots" | "spinner";
    children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    function Button(
        {
            size = "medium",
            variant = "text",
            borderStyle = "rounded",
            icon,
            iconPosition = "start",
            loadingPosition = "auto",
            loadingVariant,
            className,
            children,
            ...restProps
        },
        ref
    ) {
        const childrenFirst: boolean = Boolean(iconPosition === "end");
        const isloadingPositionCenter: boolean = Boolean(
            !icon || loadingPosition === "center"
        );

        const joinedClassNames = classNames(
            styles.button,
            styles[variant],
            { [styles.loading]: loadingVariant },
            { [styles.loadingPositionCenter]: isloadingPositionCenter },
            styles[size],
            styles[borderStyle],
            { [styles.iconButton]: !children && icon },
            className
        );

        return (
            <button ref={ref} className={joinedClassNames} {...restProps}>
                {childrenFirst && children}
                {loadingVariant && (
                    <div
                        className={classNames(styles.displayOnDisabled, {
                            [styles.positionCenter]: isloadingPositionCenter,
                        })}
                    >
                        <LoadingIcon size={size} variant={loadingVariant} />
                    </div>
                )}
                {icon}
                {!childrenFirst && children}
            </button>
        );
    }
);
