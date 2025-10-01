"use client";

import { Container } from "@yakad/ui";
import { RenderByVisibility } from "../../../../packages/ui/src";
import { useState } from "react";
import { Time } from "./Time";

export default function Page() {
    const [loadingInProgress, setLoadingInProgress] = useState<boolean>(false);

    return (
        <Container size="md">
            <RenderByVisibility
                extraRender={5}
                jumpToIndex={20}
                stopNewRenders={loadingInProgress}
                newChildRendered={() => setLoadingInProgress(true)}
            >
                {Array.from({ length: 78 }).map((_, i) => (
                    <Time index={i} onLoad={() => setLoadingInProgress(false)}>
                        {i}
                    </Time>
                ))}
            </RenderByVisibility>
        </Container>
    );
}
