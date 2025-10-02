"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Hr, LoadingIcon, Stack, StackProps, WithInteractions } from "..";

export interface RenderByVisibilityProps extends StackProps {
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
        style,
        children,
        ...restProps
    },
    ref
) {
    const childrenArray = React.Children.toArray(children);

    // Calculate Parrent top on first load
    const [parrentTop, setParrentTop] = useState<number>(0);

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
        <Stack
            ref={ref}
            {...restProps}
            style={{ minHeight: "100vh", ...style }}
        >
            {rendered.lowest >= 0 && (
                <WithInteractions
                    style={{
                        height: "1px",
                        background: "red",
                        marginBottom: `${60}px`,
                    }}
                    onVisibilityChange={(v) => setIsVisibleLowSideLoadingBox(v)}
                />
            )}
            {childrenArray.map(
                (child, i) =>
                    i >= rendered.lowest &&
                    i <= rendered.highest && (
                        <WithInteractions
                            key={i}
                            ref={(el) => {
                                childRefs.current[i] = el;
                            }}
                            onVisible={() => handleOnVisible(i)}
                            style={{ scrollMarginTop: `${80}px` }}
                        >
                            {child}
                        </WithInteractions>
                    )
            )}
        </Stack>
    );
});
