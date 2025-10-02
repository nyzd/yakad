"use client";

import { Container } from "@yakad/ui";
import {
    Footer,
    InputField,
    RenderByVisibility,
    WithInteractions,
} from "../../../../packages/ui/src";
import { useState } from "react";
import { Time } from "./Time";

export default function Page() {
    const [loadingInProgress, setLoadingInProgress] = useState<boolean>(true);
    const [jumpToIndex, setjumpToIndex] = useState<number>(0);

    return (
        <Container size="md">
            <RenderByVisibility
                scrollMarginTop={12}
                jumpToIndex={jumpToIndex}
                stopNewRenders={loadingInProgress}
                newChildRendered={() => setLoadingInProgress(true)}
            >
                {Array.from({ length: 78 }).map((_, i) => (
                    <Time index={i} onLoad={() => setLoadingInProgress(false)}>
                        {i}
                    </Time>
                ))}
            </RenderByVisibility>
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
