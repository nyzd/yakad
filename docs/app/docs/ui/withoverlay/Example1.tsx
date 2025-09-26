"use client";

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
    RenderOnVisible,
} from "../../../../../packages/ui/src";

export default function Example1() {
    return (
        <>
            <H3>Example </H3>
            <Container size="sm">
                <div style={{ height: "40rem", overflow: "auto" }}>
                    {Array.from({ length: 100 }).map((_, index) => (
                        <RenderOnVisible key={index}>
                            <Button
                                key={index}
                                variant="filled"
                                style={{
                                    height: "10rem",
                                    marginBottom: "2rem",
                                }}
                            >
                                WithInteractions
                            </Button>
                        </RenderOnVisible>
                    ))}
                </div>
                <Card align="start" style={{ height: "50rem" }}>
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
                                <Button variant="filled">
                                    HelloHelloHelloHello
                                </Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                                <Button variant="filled">Hello</Button>
                            </Dropdown>
                        }
                    >
                        <Button variant="filled">xxYxx</Button>
                    </WithOverlay>
                    <WithDropdawn>
                        <Button variant="outlined">Open Dropdawn</Button>
                    </WithDropdawn>
                </Card>
            </Container>
        </>
    );
}
