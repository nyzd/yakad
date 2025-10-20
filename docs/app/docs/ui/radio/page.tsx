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
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@yakad/ui";

import Example1 from "./example1";
import Example2 from "./example2";

export default function Page() {
    return (
        <Container size="md">
            <h1>Radio Group & Radio Button</h1>
            <Hr />
            <p>
                Radio Group allow users to select a single option from a list of
                mutually exclusive options.
            </p>
            <Howtouze />
            <Properties />
            <DefultValue />
            <Lable />
            <Disable />
            <Examples />
        </Container>
    );
}

const Howtouze = () => (
    <>
        <Card>
            <Row>
                <span>
                    <code>{'import { Radio } from "@yakad/ui"'}</code>
                    <br />
                    <br />
                    <code>{"<RadioGroup><RadioButton /></RadioGroup>"}</code>
                </span>
                <Spacer />
                <Button icon={<Symbol icon="content_copy" />}></Button>
            </Row>
        </Card>
    </>
);

const Properties = () => (
    <>
        {" "}
        <h2>Properties</h2>
        <h3>Radio Group Props</h3>
        <p>Radio Group Properties that are accepted as attributes:</p>
        <Table>
            <Thead>
                <Tr>
                    <Th>Property</Th>
                    <Th>Value</Th>
                    <Th>Default</Th>
                    <Th>Required</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Name</Td>
                    <Td>String</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>DefultValue </Td>
                    <Td>String</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
        <h3>Radio Button Props</h3>
        <p>Also, the Radio accepts the default attributes of a Html elemnt.</p>
        <Table>
            <Thead>
                <Tr>
                    <Th>Property</Th>
                    <Th>Value</Th>
                    <Th>Default</Th>
                    <Th>Required</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Value</Td>
                    <Td>String | Number</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>Lable </Td>
                    <Td>String</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>dataFromRadioGroup</Td>
                    <Td>String</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>Name</Td>
                    <Td>String</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>onSelect</Td>
                    <Td>Function</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>Checked</Td>
                    <Td>Boolean</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    </>
);

const DefultValue = () => (
    <>
        <h3>Default Value</h3>
        <p>
            For this section, we assign a default value to the radio group and a
            unique value to each radio button. Any radio button whose value
            matches the group's default value will be automatically selected.
        </p>
        <Card>
            <h3>Default Value =&gt;one</h3>
            <RadioGroup name="B" defaultValue="one">
                <RadioButton value="zero" label="value = Zero" />
                <RadioButton value="one" label="value = One" />
                <RadioButton value="two" label="value = two" />
            </RadioGroup>
        </Card>
    </>
);

const Lable = () => (
    <>
        <h3>Label</h3>
        <p>
            We use a label element for the radio button. This label displays the
            descriptive text next to the radio button and also provides built-in
            spacing between the two.
        </p>
        <Card>
            <RadioGroup name="C">
                <RadioButton label="zero" value="a" />
                <RadioButton label="one" value="b" />
                <RadioButton label="two" value="c" />
            </RadioGroup>
        </Card>
    </>
);

const Disable = () => (
    <>
        <h3>disabled</h3>
        <p>
            As a result of this problem, the radio button becomes unclickable
            and cannot be selected.
        </p>
        <Card style={{ marginBottom: "3rem" }}>
            <RadioGroup name="E">
                <RadioButton value="bir" label="enable" />
                <RadioButton value="iki" label="disable" disabled />
            </RadioGroup>
        </Card>
    </>
);

const Examples = () => (
    <>
        <h2>Examples</h2>

        <Example1 />
        <Example2 />
    </>
);
const Links = () => (
    <>
        <h2>Links</h2>
        <a
            target="_blank"
            href="https://github.com/NatiqQuran/yakad/tree/main/packages/ui/theme"
        >
            Source code in github
        </a>
        <br />
        <a
            target="_blank"
            href="https://github.com/NatiqQuran/yakad/tree/main/packages/ui/theme"
        >
            Source code in github
        </a>
    </>
);
