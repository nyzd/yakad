"use client";

import { Container } from "@yakad/ui";
import { LoadingPages } from "./LoadPages";

export default function Page() {
    return (
        <Container size="md">
            <LoadingPages jump={20} />
        </Container>
    );
}
