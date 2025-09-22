"use client";

import { Container, Card, WithInteractions } from "@yakad/ui";

export default function Page() {
    return (
        <Container size="md">
            <h1>Click Outside Listener</h1>
            <h1>Example :</h1>
            <WithInteractions
                onOutsideClick={() => alert("You click of the out side card")}
            >
                <Card>
                    <h1 style={{ textAlign: "center" }}>
                        if you click on the card nothing happens
                    </h1>
                </Card>
            </WithInteractions>
        </Container>
    );
}
