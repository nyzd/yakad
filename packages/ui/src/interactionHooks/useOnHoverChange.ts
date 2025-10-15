import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnHoverChange<T extends HTMLElement = HTMLElement>(
    callback: (e: MouseEvent, hover: boolean) => void,
    ref?: RefObject<T | null> | undefined
): RefObject<T | null> {
    const defaultRef = useRef<T | null>(null);
    const targetRef = ref ?? defaultRef;

    const handleMouseEnter = useCallback(
        (e: MouseEvent) => {
            window.matchMedia("(pointer: fine)").matches && callback(e, true);
        },
        [callback]
    );

    const handleMouseLeave = useCallback(
        (e: MouseEvent) => {
            window.matchMedia("(pointer: fine)").matches && callback(e, false);
        },
        [callback]
    );

    useEffect(() => {
        const element = targetRef.current;
        if (!element) return;
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseEnter, handleMouseLeave, targetRef]);

    return targetRef;
}
