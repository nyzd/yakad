import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export function useOnSwipe<T extends HTMLElement = HTMLElement>(
    callback: (e: TouchEvent, direction: "left" | "right" | "up" | "down") => void
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const [swipeCoordinates, setSwipeCoordinates] = useState({
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
    });

    const touchStart = useCallback(
        (e: TouchEvent) => {
            const t = e.touches[0];
            setSwipeCoordinates(prev => ({...prev, startX: t.clientX, startY: t.clientY, endX: t.clientX, endY: t.clientY}))
        },
        []
    );

    const touchMove = useCallback((e: TouchEvent) => {
        const t = e.touches[0];
        setSwipeCoordinates(prev => ({
            ...prev,
            endX: t.clientX,
            endY: t.clientY
        }));
    }, []);

    const touchEnd = useCallback((e: TouchEvent) => {
        // Could do unpacking of object but its not necessary
        const dx = swipeCoordinates.endX - swipeCoordinates.startX;
        const dy = swipeCoordinates.endY - swipeCoordinates.startY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const threshold = 30;

        if (absDx > absDy) {
            if (dx > threshold) callback(e, "right");
            if (dx < -threshold) callback(e, "left");
        } else {
            if (dy > threshold) callback(e, "down");
            if (dy < -threshold) callback(e, "up");
        }
    }, [callback, swipeCoordinates.endX, swipeCoordinates.startX, swipeCoordinates.endY, swipeCoordinates.startY]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener("touchstart", touchStart, { passive: true });
        element.addEventListener("touchmove", touchMove, { passive: true });
        element.addEventListener("touchend", touchEnd, { passive: true });

        return () => {
            element.removeEventListener("touchstart", touchStart);
            element.removeEventListener("touchmove", touchMove);
            element.removeEventListener("touchend", touchEnd);
        };
    }, [touchStart, touchMove, touchEnd]);

    return ref;
}

