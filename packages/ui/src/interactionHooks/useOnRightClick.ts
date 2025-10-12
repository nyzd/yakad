import { RefObject, useCallback, useEffect, useRef } from "react";

export function useOnRightClick<T extends HTMLElement = HTMLElement>(
    callback: (e: MouseEvent) => void
): RefObject<T | null> {
    const ref = useRef<T>(null);

    const handleContextMenu = useCallback(
        (e: MouseEvent) => {
            e.preventDefault();
            callback(e);
        },
        [callback]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener("contextmenu", handleContextMenu);
        return () => {
            element.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [handleContextMenu]);

    return ref;
}
