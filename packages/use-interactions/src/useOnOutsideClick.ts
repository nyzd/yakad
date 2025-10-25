import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnOutsideClick<T extends HTMLElement = HTMLElement>(
    callback: (e: MouseEvent) => void,
    ref?: RefObject<T | null> | undefined
): RefObject<T | null> {
    const defaultRef = useRef<T | null>(null);
    const targetRef = ref ?? defaultRef;

    const handleClick = useCallback(
        (e: MouseEvent) => {
            e.preventDefault();
            const element = targetRef.current;
            if (!element) return;
            if (!element.contains(e.target as Node)) {
                callback(e);
            }
        },
        [callback, targetRef]
    );

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick)
        };
    }, [handleClick]);

    return targetRef;
}
