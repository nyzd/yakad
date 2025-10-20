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

export default function Example1() {
    return (
        <Container size="md">
            <h3>Example 1</h3>
            <Card style={{ maxWidth: "60rem" }}>
                <h3>Choose the color you want!</h3>
                <Hr />
                <RadioGroup name="Example">
                    <RadioButton value="num1" label="Blue" />
                    <RadioButton value="num2" label="Red" />
                    <RadioButton value="num3" label="Yellow" />
                </RadioGroup>
                <Row align="end" style={{ marginTop: "20px" }}>
                    <Button variant="outlined">CLOSE</Button>
                    <Button variant="filled">ENTER</Button>
                </Row>
            </Card>
        </Container>
    );
}
