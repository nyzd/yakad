import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export function useOnRotate<T extends HTMLElement = HTMLElement>(
    callback: (e: TouchEvent, deltaAngle: number) => void,
    ref?: RefObject<T | null> | undefined
): RefObject<T | null> {
    const defaultRef = useRef<T | null>(null);
    const targetRef = ref ?? defaultRef;
    const [startAngle, setStartAngle] = useState(0);

    const getAngle = (t1: Touch, t2: Touch) =>
        Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) *
        (180 / Math.PI);

    const handleStart = useCallback((e: TouchEvent) => {
        if (e.touches.length === 2) {
            const [t1, t2] = e.touches;
            setStartAngle(getAngle(t1, t2))
        }
    }, []);

    const handleMove = useCallback((e: TouchEvent) => {
        if (e.touches.length === 2) {
            const [t1, t2] = e.touches;
            const angle = getAngle(t1, t2);

            const deltaAngle = angle - startAngle;
            if (Math.abs(deltaAngle) > 15) {
                callback(e, deltaAngle);
            }
        }
    }, [callback, startAngle]);

    useEffect(() => {
        const element = targetRef.current;
        if (!element) return;

        element.addEventListener("touchstart", handleStart);
        element.addEventListener("touchmove", handleMove);
        return () => {
            element.removeEventListener("touchstart", handleStart);
            element.removeEventListener("touchmove", handleMove);
        };
    }, [handleMove, handleStart, targetRef]);

    return targetRef;
}
