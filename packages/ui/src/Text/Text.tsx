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

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    variant?: TextVariant;
    color?: "onSurfaceColor" | "onSurfaceVariantColor";
    children?: React.ReactNode;
}
export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>(function H1(
    { variant = "heading1", color, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: color === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: color === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h1 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h1>
    );
});

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>(function H2(
    { variant = "heading2", color, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: color === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: color === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h2 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h2>
    );
});

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>(function H3(
    { variant = "heading3", color, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: color === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: color === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h3 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h3>
    );
});

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>(function H4(
    { variant = "heading4", color, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: color === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: color === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h4 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h4>
    );
});

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>(function H5(
    { variant = "heading5", color, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: color === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: color === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h5 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h5>
    );
});

export const H6 = forwardRef<HTMLHeadingElement, HeadingProps>(function H6(
    { variant = "heading6", color, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: color === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: color === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <h6 ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </h6>
    );
});

export interface ParagraphProps
    extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: TextVariant;
    children?: React.ReactNode;
}
export const P = forwardRef<HTMLParagraphElement, ParagraphProps>(function P(
    { variant = "body5", color, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: color === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: color === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <p ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </p>
    );
});

export interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: TextVariant;
    children?: React.ReactNode;
}
export const Span = forwardRef<HTMLSpanElement, SpanProps>(function Span(
    { variant = "span", color, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        styles.text,
        styles[variant as string],
        {
            [styles.onSurfaceColor]: color === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: color === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <span ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </span>
    );
});

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: TextVariant;
    children?: React.ReactNode;
}
export const Text = forwardRef<HTMLDivElement, TextProps>(function Text(
    { variant = "body5", color, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(styles[variant as string], className);
    return (
        <div ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
});
