import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnRightClick<T extends HTMLElement = HTMLElement>(
    callback: (e: MouseEvent) => void,
    ref?: RefObject<T | null> | undefined
): RefObject<T | null> {
    const defaultRef = useRef<T | null>(null);
    const targetRef = ref ?? defaultRef;

    const handleContextMenu = useCallback(
        (e: MouseEvent) => {
            e.preventDefault();
            callback(e);
        },
        [callback]
    );

    useEffect(() => {
        const element = targetRef.current;
        if (!element) return;

        element.addEventListener("contextmenu", handleContextMenu);
        return () => {
            element.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [handleContextMenu, targetRef]);

    return targetRef;
}
