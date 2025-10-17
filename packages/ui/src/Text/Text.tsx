import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Text.module.css";

type TextVariant =
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "heading6"
    | "body1"
    | "body2"
    | "body3"
    | "body4"
    | "body5"
    | "body6"
    | "caption"
    | "span";

export interface TextProps<T> extends React.HTMLAttributes<T> {
    variant?: TextVariant;
    palette?: "onSurfaceColor" | "onSurfaceVariantColor";
    children?: React.ReactNode;
} 

export const H1 = forwardRef<HTMLHeadingElement, TextProps<HTMLHeadingElement>>(function H1(
    { variant = "heading1", palette, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h1 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h1>
    );
});

export const H2 = forwardRef<HTMLHeadingElement, TextProps<HTMLHeadingElement>>(function H2(
    { variant = "heading2", palette, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h2 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h2>
    );
});

export const H3 = forwardRef<HTMLHeadingElement, TextProps<HTMLHeadingElement>>(function H3(
    { variant = "heading3", palette, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h3 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h3>
    );
});

export const H4 = forwardRef<HTMLHeadingElement, TextProps<HTMLHeadingElement>>(function H4(
    { variant = "heading4", palette, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h4 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h4>
    );
});

export const H5 = forwardRef<HTMLHeadingElement, TextProps<HTMLHeadingElement>>(function H5(
    { variant = "heading5", palette, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h5 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h5>
    );
});

export const H6 = forwardRef<HTMLHeadingElement, TextProps<HTMLHeadingElement>>(function H6(
    { variant = "heading6", palette, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h6 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h6>
    );
});

export const P = forwardRef<HTMLParagraphElement, TextProps<HTMLParagraphElement>>(function P(
    { variant = "body5", palette, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <p ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </p>
    );
});

export const Span = forwardRef<HTMLSpanElement, TextProps<HTMLSpanElement>>(function Span(
    { variant = "span", palette, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <span ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </span>
    );
});

export const Text = forwardRef<HTMLDivElement, TextProps<HTMLDivElement>>(function Text(
    { variant = "body5", palette, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <div ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
});
