import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Avatar.module.css";
import { Symbol } from "@yakad/symbols";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
    { src, className, ...restProps },
    ref
) {
    const joinedClassNames = classNames(styles.profileContainer, className);

    return (
        <div
            ref={ref}
            {...restProps}
            className={joinedClassNames}
            style={src ? { backgroundImage: `url(${src})` } : {}}
        >
            <div className={styles.editOverlay}>
                <Symbol icon="edit" />
            </div>
        </div>
    );
});

export default Avatar;
