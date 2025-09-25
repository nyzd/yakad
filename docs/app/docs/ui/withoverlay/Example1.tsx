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
} from "../../../../../packages/ui/src";

export default function Example1() {
    return (
        <>
            <H3>Example 1</H3>
            <Container size="sm">
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
