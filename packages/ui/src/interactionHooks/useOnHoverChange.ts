import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnHoverChange<T extends HTMLElement = HTMLElement>(
    callback: (e: MouseEvent, change: "leave" | "enter") => void
): RefObject<T | null> {
    const ref = useRef<T>(null);

    const handleMouseEnter = useCallback(
        (e: MouseEvent) => {
            window.matchMedia("(pointer: fine)").matches && callback(e, "enter");
        },
        [callback]
    );

    const handleMouseLeave = useCallback(
        (e: MouseEvent) => {
            window.matchMedia("(pointer: fine)").matches && callback(e, "leave");
        },
        [callback]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseEnter, handleMouseLeave]);

    return ref;
}
