import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnResizeChange<T extends HTMLElement = HTMLElement>(
    callback: (e: ResizeObserverEntry) => void,
    ref?: RefObject<T | null> | undefined
): RefObject<T | null> {
    const defaultRef = useRef<T | null>(null);
    const targetRef = ref ?? defaultRef;

    const handleResize = useCallback(
        (e: ResizeObserverEntry) => {
            callback(e);
        },
        [callback]
    );

    useEffect(() => {
        const element = targetRef.current;
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
    }, [handleResize, targetRef]);

    return targetRef;
}
