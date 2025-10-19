import classNames from "classnames";
import styles from "./Hr.module.css";

export interface HrProps extends React.HTMLAttributes<HTMLHRElement> {
    variant?: "dotted" | "dashed" | "shortLine";
    height?: number;
    marginx?: number;
    ref?: React.Ref<HTMLHRElement>;
}

export function Hr({
    variant,
    height,
    marginx,
    className,
    style,
    ...restProps
}: HrProps) {
    const joinedClassNames = classNames(
        styles.hr,
        variant && styles[variant],
        className
    );

    const joinedStyles = {
        ...style,
        borderTopWidth: height ? `${height}rem` : style?.borderTopWidth,
        marginTop: marginx ? `${marginx}rem` : style?.marginTop,
        marginBottom: marginx ? `${marginx}rem` : style?.marginBottom,
    };

    return (
        <hr {...restProps} className={joinedClassNames} style={joinedStyles} />
    );
}
