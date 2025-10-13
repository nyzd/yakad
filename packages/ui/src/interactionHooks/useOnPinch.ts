import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export function useOnPinch<T extends HTMLElement = HTMLElement>(
    callback: (e: TouchEvent, action: "in" | "out") => void
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const [startDistance, setStartDistance] = useState(0);

    const getDistance = (t1: Touch, t2: Touch) =>
        Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

    const handleStart = useCallback(
        (e: TouchEvent) => {
            if (e.touches.length === 2) {
                const [t1, t2] = e.touches;
                setStartDistance(getDistance(t1, t2));
            }
        },
        []
    );

    const handleMove = useCallback(
        (e: TouchEvent) => {
            if (e.touches.length === 2) {
                const [t1, t2] = e.touches;
                const dist = getDistance(t1, t2);

                if (dist < startDistance - 20) callback(e, "in");
                if (dist > startDistance + 20) callback(e, "out");
            }
        }, [callback, startDistance]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        element.addEventListener("touchstart", handleStart);
        element.addEventListener("touchmove", handleMove);
        return () => {
            element.removeEventListener("touchstart", handleStart);
            element.removeEventListener("touchmove", handleMove);
        };
    }, [handleMove, handleStart]);

    return ref;
}
