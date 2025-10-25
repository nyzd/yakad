import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export function useOnDoubleTap<T extends HTMLElement = HTMLElement>(
    callback: (e: TouchEvent) => void,
    ref?: RefObject<T | null> | undefined
): RefObject<T | null> {
    const defaultRef = useRef<T | null>(null);
    const targetRef = ref ?? defaultRef;
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
        const element = targetRef.current;
        if (!element) return;

        element.addEventListener("touchend", handleDoubleTap);

        return () => {
            element.removeEventListener("touchend", handleDoubleTap)
        };
    }, [handleDoubleTap, targetRef]);

    return targetRef;
}
