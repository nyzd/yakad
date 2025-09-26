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
} from "../../../../../packages/ui/src";

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
