import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnOutsideClick<T extends HTMLElement = HTMLElement>(
    callback: (e: MouseEvent) => void
): RefObject<T | null> {
    const ref = useRef<T>(null);

    const handleClick = useCallback(
        (e: MouseEvent) => {
            e.preventDefault();
            const element = ref.current;
            if (!element) return;
            if (!element.contains(e.target as Node)) {
                callback(e);
            }
        },
        [callback]
    );

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick)
        };
    }, [handleClick]);

    return ref;
}
