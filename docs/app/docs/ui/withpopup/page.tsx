import { Symbol } from "@yakad/symbols";
import { Button, Container, Row, Hr, Card, Spacer } from "@yakad/ui";
import Example1 from "./Example1";

export default function Page() {
    return (
        <Container size="md">
            <h1>WithPopup</h1>
            <Hr />
            <p>Use popup as a new page or inside your page</p>
            <Card>
                <Row>
                    <span>
                        <code>{'import { WithPopup } from "@yakad/ui"'}</code>
                        <br />
                        <br />
                        <code>{"<Button>Button</Button>"}</code>
                    </span>
                    <Spacer />
                    <Button icon={<Symbol icon="content_copy" />}></Button>
                </Row>
            </Card>
            <Example1 />
        </Container>
    );
}
