import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnVisibilityChange<T extends HTMLElement = HTMLElement>(
    callback: (visible: boolean) => void,
    ref?: RefObject<T | null> | undefined
): RefObject<T | null> {
    const defaultRef = useRef<T | null>(null);
    const targetRef = ref ?? defaultRef;

    const handleVisibility = useCallback(
        (visible: boolean) => {
            callback(visible);
        },
        [callback]
    );

    useEffect(() => {
        const element = targetRef.current;
        if (!element) return;

        const intersectionObserver = new IntersectionObserver((entries) => {
            entries[0].isIntersecting ? handleVisibility(true) : handleVisibility(false);
        });

        intersectionObserver.observe(element);

        return () => {
            intersectionObserver?.disconnect();
        };
    }, [handleVisibility, targetRef]);

    return targetRef;
}
