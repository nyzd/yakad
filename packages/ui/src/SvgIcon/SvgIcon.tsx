import classNames from "classnames";
import styles from "./SvgIcon.module.css";

export interface SvgIconProps extends React.HTMLAttributes<HTMLElement> {
    size?: number;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}

export function SvgIcon({
    size,
    className,
    style,
    children,
    ...restProps
}: SvgIconProps) {
    const joinedClassNames = classNames(styles.svg, className!);

    const sizeStyle = size && { width: `${size}rem`, height: `${size}rem` };

    return (
        <div
            {...restProps}
            className={joinedClassNames}
            style={{
                ...style,
                ...sizeStyle,
            }}
        >
            {children}
        </div>
    );
}
