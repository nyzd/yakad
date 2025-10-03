"use client";

import { useState } from "react";
import { Time } from "./Time";
import { Container } from "@yakad/ui";
import {
    ActiveOnVisible,
    Footer,
    InputField,
    RenderByScroll,
} from "../../../../packages/ui/src";

export default function Page() {
    const [loadingInProgress, setLoadingInProgress] = useState<boolean>(true);
    const [jumpToIndex, setjumpToIndex] = useState<number>(0);

    return (
        <Container size="md">
            <RenderByScroll
                scrollMarginTop={12}
                // jumpToIndex={jumpToIndex}
                jumpToIndex={40}
                stopNewRenders={loadingInProgress}
                newChildRendered={() => setLoadingInProgress(true)}
            >
                {Array.from({ length: 78 }).map((_, i) => (
                    <Time index={i} onLoad={() => setLoadingInProgress(false)}>
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
    );
}
