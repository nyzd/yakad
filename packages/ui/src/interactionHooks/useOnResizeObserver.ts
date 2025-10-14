import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnResizeObserver<T extends HTMLElement = HTMLElement>(
    callback: (e: ResizeObserverEntry) => void
): RefObject<T | null> {
    const ref = useRef<T>(null);

    const handleResize = useCallback(
        (e: ResizeObserverEntry) => {
            callback(e);
        },
        [callback]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                handleResize(entry);
            }
        })

        resizeObserver.observe(element);

        return () => {
            resizeObserver?.disconnect();
        };
    }, [handleResize]);

    return ref;
}
