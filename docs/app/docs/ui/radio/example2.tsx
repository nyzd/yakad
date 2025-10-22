import { Symbol } from "@yakad/symbols";
import {
    Button,
    Card,
    Container,
    Hr,
    RadioButton,
    RadioGroup,
    Row,
    Spacer,
    Stack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@yakad/ui";

export default function Example2() {
    return (
        <Container size="md">
            <h3>Example 2</h3>

            <Card style={{ maxWidth: "60rem" }}>
                <h3>How do you think our site is?</h3>
                <Hr />
                <RadioGroup name="Example">
                    <RadioButton value="n1" label="Excellent" />
                    <RadioButton value="n2" label="Good" />
                    <RadioButton value="n3" label="Not Bad" />
                    <RadioButton value="n4" label="Bad" />
                </RadioGroup>
                <Row align="center">
                    <Button variant="filled">Comment</Button>
                </Row>
                <Hr />
                <Row align="center" style={{ marginTop: "2rem" }}>
                    <Button variant="outlined">No</Button>
                    <h3>Do you like these questions?</h3>
                    <Button variant="outlined">Yes</Button>
                </Row>
            </Card>
        </Container>
    );
}
