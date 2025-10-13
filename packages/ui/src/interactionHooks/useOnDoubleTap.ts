import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export function useOnDoubleTap<T extends HTMLElement = HTMLElement>(
    callback: (e: TouchEvent) => void
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const [lastTap, setLastTap] = useState(0);

    const handleDoubleTap = useCallback(
        (e: TouchEvent) => {
            const now = Date.now();
            if (now - lastTap < 300) {
                callback(e);
            }
            setLastTap(now);
        },
        [callback, lastTap]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener("touchend", handleDoubleTap);

        return () => {
            element.removeEventListener("touchend", handleDoubleTap)
        };
    }, [handleDoubleTap]);

    return ref;
}
