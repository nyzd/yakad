"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Card, LoadingIcon, Stack, WithInteractions } from "..";

export interface RenderByVisibilityProps {
    extraRender?: number;
    jumpToIndex?: number;
    stopNewRenders?: boolean;
    newChildRendered?: (index: number) => void;
    children?: React.ReactNode;
}

const data = Array.from({ length: 78 });

export const RenderByVisibility = forwardRef<
    HTMLDivElement,
    RenderByVisibilityProps
>(function RenderByVisibility(
    {
        extraRender = 5,
        jumpToIndex = 0,
        stopNewRenders,
        newChildRendered,
        children,
        ...restProps
    },
    ref
) {
    const childrenArray = React.Children.toArray(children);

    // Scroll Zone
    const childRefs = useRef<Record<number, HTMLElement | null>>({});
    const scrollTo = (i: number) => childRefs.current[i]?.scrollIntoView({});

    // Collect Visibled Childs
    const [visibled, setVisibled] = useState<{
        lowest: number;
        highest: number;
    }>({ lowest: jumpToIndex, highest: jumpToIndex });
    const handleOnVisible = (i: number) => {
        if (i < visibled.lowest) setVisibled({ ...visibled, lowest: i });
        if (i > visibled.highest) setVisibled({ ...visibled, highest: i });
    };

    // Collect Rendered Childs
    const [rendered, setRendered] = useState<{
        lowest: number;
        highest: number;
    }>({ lowest: jumpToIndex, highest: jumpToIndex });
    const overRenderedOnLowSide = visibled.lowest - rendered.lowest;
    const overRenderedOnHighSide = rendered.highest - visibled.highest;

    // Is Visible Loading Box
    const [isVisibleLowSideLoadingBox, setIsVisibleLowSideLoadingBox] =
        useState<boolean>(false);
    const [isVisibleHighSideLoadingBox, setIsVisibleHighSideLoadingBox] =
        useState<boolean>(false);

    // Render new Childs if needed
    useEffect(() => {
        if (!stopNewRenders) {
            if (overRenderedOnHighSide <= overRenderedOnLowSide) {
                if (
                    rendered.highest < data.length &&
                    overRenderedOnHighSide < extraRender
                ) {
                    setRendered({ ...rendered, highest: rendered.highest + 1 });
                    newChildRendered?.(rendered.highest + 1);
                }
            } else {
                if (
                    rendered.lowest > 0 &&
                    overRenderedOnLowSide < extraRender
                ) {
                    if (isVisibleLowSideLoadingBox) {
                        scrollTo(rendered.lowest);
                    }
                    setRendered({ ...rendered, lowest: rendered.lowest - 1 });
                    newChildRendered?.(rendered.lowest - 1);
                }
            }
        }
    }, [visibled, rendered, stopNewRenders]);

    // Scroll to jumpToIndex
    useEffect(() => {
        const isJumpToIndexOutOfRenderedRange =
            jumpToIndex < rendered.lowest || jumpToIndex > rendered.highest;
        if (isJumpToIndexOutOfRenderedRange) {
            setVisibled({ lowest: jumpToIndex, highest: jumpToIndex });
            setRendered({ lowest: jumpToIndex, highest: jumpToIndex });
        }
        scrollTo(jumpToIndex);
    }, [jumpToIndex]);

    // console.log("visibled", visibled);
    // console.log("rendered", rendered);
    // console.log("stopNewRenders", stopNewRenders);

    return (
        <Stack ref={ref} {...restProps} style={{ minHeight: "100vh" }}>
            {rendered.lowest > 0 && (
                <WithInteractions
                    style={{ height: "1px", background: "red" }}
                    onVisibilityChange={(v) => setIsVisibleLowSideLoadingBox(v)}
                />
            )}
            {childrenArray.map(
                (child, i) =>
                    i >= rendered.lowest &&
                    i <= rendered.highest && (
                        <WithInteractions
                            ref={(el) => {
                                childRefs.current[i] = el;
                            }}
                            key={i}
                            onVisible={() => handleOnVisible(i)}
                        >
                            <h1>{i}</h1>
                            {child}
                        </WithInteractions>
                    )
            )}
        </Stack>
    );
});
