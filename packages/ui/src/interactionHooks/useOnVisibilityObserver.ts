import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnVisibilityObserver<T extends HTMLElement = HTMLElement>(
    callback: (action: "visible" | "hidden") => void
): RefObject<T | null> {
    const ref = useRef<T>(null);

    const handleVisibility = useCallback(
        (action: "visible" | "hidden") => {
            callback(action);
        },
        [callback]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const intersectionObserver = new IntersectionObserver((entries) => {
            entries[0].isIntersecting ? handleVisibility("visible") : handleVisibility("hidden");
        });

        intersectionObserver.observe(element);

        return () => {
            intersectionObserver?.disconnect();
        };
    }, [handleVisibility]);

    return ref;
}
