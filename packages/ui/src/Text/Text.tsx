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
    ref?: React.Ref<T>;
}

export function H1({
    variant = "heading1",
    palette,
    className,
    children,
    ...restProps
}: TextProps<HTMLHeadingElement>) {
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
        <h1 {...restProps} className={joinedClassNames}>
            {children}
        </h1>
    );
}

export function H2({
    variant = "heading2",
    palette,
    className,
    children,
    ...restProps
}: TextProps<HTMLHeadingElement>) {
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
        <h2 {...restProps} className={joinedClassNames}>
            {children}
        </h2>
    );
}

export function H3({
    variant = "heading3",
    palette,
    className,
    children,
    ...restProps
}: TextProps<HTMLHeadingElement>) {
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
        <h3 {...restProps} className={joinedClassNames}>
            {children}
        </h3>
    );
}

export function H4({
    variant = "heading4",
    palette,
    className,
    children,
    ...restProps
}: TextProps<HTMLHeadingElement>) {
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
        <h4 {...restProps} className={joinedClassNames}>
            {children}
        </h4>
    );
}

export function H5({
    variant = "heading5",
    palette,
    className,
    children,
    ...restProps
}: TextProps<HTMLHeadingElement>) {
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
        <h5 {...restProps} className={joinedClassNames}>
            {children}
        </h5>
    );
}

export function H6({
    variant = "heading6",
    palette,
    className,
    children,
    ...restProps
}: TextProps<HTMLHeadingElement>) {
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
        <h6 {...restProps} className={joinedClassNames}>
            {children}
        </h6>
    );
}

export function P({
    variant = "body5",
    palette,
    className,
    children,
    ...restProps
}: TextProps<HTMLParagraphElement>) {
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
        <p {...restProps} className={joinedClassNames}>
            {children}
        </p>
    );
}

export function Span({
    variant = "span",
    palette,
    className,
    children,
    ...restProps
}: TextProps<HTMLSpanElement>) {
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
        <span {...restProps} className={joinedClassNames}>
            {children}
        </span>
    );
}

export function Text({
    variant = "body5",
    palette,
    className,
    children,
    ...restProps
}: TextProps<HTMLDivElement>) {
    const joinedClassNames = classNames(
        styles[variant as string],
        {
            [styles.onSurfaceColor]: palette === "onSurfaceColor",
            [styles.onSurfaceVariantColor]: palette === "onSurfaceVariantColor",
        },
        className
    );
    return (
        <div {...restProps} className={joinedClassNames}>
            {children}
        </div>
    );
}
