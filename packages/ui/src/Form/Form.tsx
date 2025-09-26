import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Form.module.css";
import boxingStyles from "../boxing.module.css";

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    align?: "start" | "space" | "center" | "end";
    fullWidth?: boolean;
    children?: React.ReactNode;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
    { align, fullWidth = true, className, children, ...restProps },
    ref
) {
    const joinedClassNames = classNames(
        boxingStyles.flexColumnBox,
        { [boxingStyles[align as string]]: align },
        { fullWidth: fullWidth },
        styles.form,
        className
    );

    return (
        <form ref={ref} {...restProps} className={joinedClassNames}>
            {children}
        </form>
    );
});
