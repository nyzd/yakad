import { Symbol } from "@yakad/symbols";
import {
    Button,
    Container,
    Card,
    Row,
    Hr,
    CodeField,
    Spacer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from "@yakad/ui";
import Example1 from "./example1";
import Example2 from "./example2";
import Example3 from "./example3";

export default function Page() {
    return (
        <Container size="md">
            <h1>CodeField</h1>
            <Hr />
            <p>input for your codes.</p>
            <Howtouze />
            <Properties />
            <Lenght />
            <Examples />
            <Links />
        </Container>
    );
}

const Howtouze = () => (
    <>
        <Card>
            <Row>
                <span>
                    <code>{'import { CodeField } from "@yakad/ui"'}</code>
                    <br />
                    <br />
                    <code>{"<CodeField />"}</code>
                </span>
                <Spacer />
                <Button icon={<Symbol icon="content_copy" />}></Button>
            </Row>
        </Card>
    </>
);
const Properties = () => (
    <>
        <h2>Properties</h2>
        <p>Properties that are accepted as attributes:</p>
        <Table>
            <Thead>
                <Tr>
                    <Th>Property</Th>
                    <Th>Value</Th>
                    <Th>Defult</Th>
                    <Th>Required</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>length</Td>
                    <Td>number</Td>
                    <Td>undefined</Td>

                    <Td>
                        <Symbol type="sharp" icon="check"></Symbol>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
        <p>
            Also, the CodeField accepts the default attributes of a Html elemnt.
        </p>
    </>
);

const Lenght = () => (
    <>
        <h3>length</h3>
        <p>
            With this property, you can specify the number of lines in your
            CodeField.
        </p>

        <Card>
            <p>length = 4</p>
            <CodeField length={4} />
            <Hr />

            <p>length = 6</p>
            <CodeField length={6} />
            <Hr />

            <p>length = 8</p>
            <CodeField length={8} />
            <Hr />

            <p>length = 10</p>
            <CodeField length={10} />
        </Card>
    </>
);
const Examples = () => (
    <>
        <h2>Examples</h2>
        <h3>Example 1</h3>
        <Example1 />

        <h3>Example 2</h3>
        <Example2 />

        <h3>Example 3</h3>
        <Example3 />
    </>
);

const Links = () => (
    <>
        {" "}
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
