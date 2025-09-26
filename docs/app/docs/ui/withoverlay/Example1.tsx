"use client";

import { useState } from "react";
import {
    Button,
    Card,
    Container,
    H1,
    H3,
    Popup,
    WithOverlay,
    WithDropdawn,
    Dropdown,
    WithInteractions,
} from "../../../../../packages/ui/src";
import { randomBytes } from "crypto";

export default function Example1() {
    return (
        <>
            <H3>Example </H3>
            <Container size="sm">
                <WithInteractions
                    onScrollChange={(scrolling) => console.log(scrolling)}
                >
                    <div style={{ height: "40rem", overflow: "auto" }}>
                        {Array.from({ length: 1000 }).map((_, index) => (
                            <Button key={index} variant="tonal">
                                WithInteractions
                            </Button>
                        ))}
                    </div>
                </WithInteractions>
                <Card align="space" style={{ height: "50rem" }}>
                    <WithOverlay
                        overlay={
                            <Popup>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                            </Popup>
                        }
                    >
                        <Button variant="outlined">Open Popup</Button>
                    </WithOverlay>
                    <WithOverlay
                        overlay={
                            <Dropdown>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                                <H1>Hello</H1>
                            </Dropdown>
                        }
                    >
                        <Button variant="filled">Open New Popup</Button>
                    </WithOverlay>
                    <WithDropdawn>
                        <Button variant="outlined">Open Dropdawn</Button>
                    </WithDropdawn>
                </Card>
            </Container>
        </>
    );
}
