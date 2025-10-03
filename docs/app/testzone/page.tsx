"use client";

import { useState } from "react";
import { Time } from "./Time";
import { Footer, InputField, Container, Theme } from "@yakad/ui";
import { RenderByScroll } from "../../../packages/ui/src";

export default function Page() {
    const [loadingInProgress, setLoadingInProgress] = useState<boolean>(true);
    const [jumpToIndex, setjumpToIndex] = useState<number>(50);

    return (
        <Theme>
            <Container size="md">
                <RenderByScroll
                    scrollMarginTop={12}
                    jumpToIndex={jumpToIndex}
                    stopNewRenders={loadingInProgress}
                    newChildRendered={() => setLoadingInProgress(true)}
                >
                    {Array.from({ length: 78 }).map((_, i) => (
                        <Time
                            index={i}
                            onLoad={() => setLoadingInProgress(false)}
                        >
                            {i}
                        </Time>
                    ))}
                </RenderByScroll>
                <Footer position="sticky" align="center">
                    <InputField
                        style={{ width: "100%" }}
                        variant="filled"
                        type="number"
                        placeholder="Jump to Index"
                        value={jumpToIndex}
                        onChange={(e) => setjumpToIndex(Number(e.target.value))}
                    />
                </Footer>
            </Container>
        </Theme>
    );
}
