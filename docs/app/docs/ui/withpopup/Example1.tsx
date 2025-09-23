import { Button, Card, Container, H1, H3 } from "@yakad/ui";
import { WithPopup } from "@yakad/ui";
// import { WithPopup } from "../../../../../packages/ui/src";

export default function Example1() {
    return (
        <>
            <H3>Example 1</H3>
            <Container size="sm">
                <Card align="center">
                    <WithPopup popupChildren={<H1>Hello</H1>}>
                        <Button variant="outlined">Open Popup</Button>
                    </WithPopup>
                </Card>
            </Container>
        </>
    );
}
