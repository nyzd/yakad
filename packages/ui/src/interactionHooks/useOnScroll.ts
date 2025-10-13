import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnScroll<T extends HTMLElement = HTMLElement>(
    callback: (action: "start" | "stop") => void
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const scrollingRef = useRef(false);

    const handleScroll = useCallback(() => {
        console.log("bb123");

        if (!scrollingRef.current) {
            scrollingRef.current = true;
            callback("start");
        }

        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            scrollingRef.current = false;
            callback("stop");
        }, 150);
    }, [callback]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener("scroll", handleScroll);
        return () => {
            element.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeoutRef.current);
        };
    }, [handleScroll]);

    return ref;
}
