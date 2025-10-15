import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnScroll<T extends HTMLElement = HTMLElement>(
    callback: (scrolling: boolean) => void,
    ref?: RefObject<T | null> | undefined
): RefObject<T | null> {
    const defaultRef = useRef<T | null>(null);
    const targetRef = ref ?? defaultRef;
    const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const scrollingRef = useRef(false);

    const handleScroll = useCallback(() => {
        if (!scrollingRef.current) {
            scrollingRef.current = true;
            callback(true);
        }

        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            scrollingRef.current = false;
            callback(false);
        }, 150);
    }, [callback]);

    useEffect(() => {
        const element = targetRef.current;
        if (!element) return;

        element.addEventListener("scroll", handleScroll);
        return () => {
            element.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeoutRef.current);
        };
    }, [handleScroll, targetRef]);

    return targetRef;
}
