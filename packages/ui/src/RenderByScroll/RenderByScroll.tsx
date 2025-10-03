"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Stack, StackProps, WithInteractions } from "..";

export interface RenderByScrollProps extends StackProps {
    scrollMarginTop?: number;
    extraRender?: number;
    jumpToIndex?: number;
    stopNewRenders?: boolean;
    newChildRendered?: (index: number) => void;
    children?: React.ReactNode;
}

const data = Array.from({ length: 78 });

export const RenderByScroll = forwardRef<HTMLDivElement, RenderByScrollProps>(
    function RenderByScroll(
        {
            scrollMarginTop = 2, // Sticky Header Height
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

        // Scroll Zone
        const childRefs = useRef<Record<number, HTMLElement | null>>({});
        const scrollTo = (i: number, smooth?: boolean) =>
            childRefs.current[i]?.scrollIntoView({
                behavior: smooth ? "smooth" : "auto",
            });

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
        const [isVisibleLowSideLimitBox, setIsVisibleLowSideLimitBox] =
            useState<boolean>(false);

        // Render new Childs if needed
        useEffect(() => {
            if (!stopNewRenders) {
                if (
                    overRenderedOnHighSide < 1 ||
                    overRenderedOnHighSide - 1 <= overRenderedOnLowSide
                ) {
                    if (
                        rendered.highest < data.length &&
                        overRenderedOnHighSide < extraRender
                    ) {
                        const newHigh = rendered.highest + 1;
                        setRendered({ ...rendered, highest: newHigh });
                        newChildRendered?.(newHigh);
                    }
                } else {
                    if (
                        rendered.lowest > 0 &&
                        overRenderedOnLowSide < extraRender
                    ) {
                        if (isVisibleLowSideLimitBox) {
                            scrollTo(rendered.lowest, true);
                        }
                        const newLow = rendered.lowest - 1;
                        setRendered({ ...rendered, lowest: newLow });
                        newChildRendered?.(newLow);
                    }
                }
            }
            // eslint-disable-next-line
        }, [visibled, rendered, extraRender, stopNewRenders]);

        // Scroll to jumpToIndex
        useEffect(() => {
            const isJumpToIndexOutOfRenderedRange =
                jumpToIndex < rendered.lowest || jumpToIndex > rendered.highest;
            if (isJumpToIndexOutOfRenderedRange) {
                setVisibled({ lowest: jumpToIndex, highest: jumpToIndex });
                setRendered({ lowest: jumpToIndex, highest: jumpToIndex });
            }
            const timeout = setTimeout(() => {
                scrollTo(jumpToIndex, true);
            }, 300);
            return () => clearTimeout(timeout);
            // eslint-disable-next-line
        }, [jumpToIndex]);

        const LowSideLimitBox = () =>
            rendered.lowest > 0 && (
                <WithInteractions
                    style={{
                        marginBottom: `${scrollMarginTop}rem`,
                    }}
                    onVisibilityChange={(v) => setIsVisibleLowSideLimitBox(v)}
                />
            );

        return (
            <Stack
                ref={ref}
                {...restProps}
                style={{ minHeight: "100vh", ...style }}
            >
                <LowSideLimitBox />
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
                                style={{
                                    scrollMarginTop: `${scrollMarginTop}rem`,
                                }}
                            >
                                {child}
                            </WithInteractions>
                        )
                )}
            </Stack>
        );
    }
);
