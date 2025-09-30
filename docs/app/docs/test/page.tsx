"use client";

import { useState } from "react";
import { Container, LoadingControlV4 } from "../../../../packages/ui/src";
import { Time } from "./Time";

export default function Page() {
    const [renderLimit, setRenderLimit] = useState<number>(0);

    console.log("renderLimit", renderLimit);

    return (
        <Container size="md">
            <LoadingControlV4 renderLimit={40}>
                {Array.from({ length: 100 }).map((_, i) => (
                    <Time key={i} index={i} />
                ))}
            </LoadingControlV4>
        </Container>
    );
}
