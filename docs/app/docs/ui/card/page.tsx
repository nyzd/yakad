import {
    Button,
    Card,
    Container,
    Hr,
    Row,
    Spacer,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@yakad/ui";
import { Symbol } from "@yakad/symbols";

import Example1 from "./example1";
import Example2 from "./example2";
import Example3 from "./example3";

export default function Page() {
    return (
        <Container size="md">
            <h1>Card</h1>
            <Hr />
            <p>Cards contain content and actions about a subject.</p>
            <Howtouze />
            <Properties />
            <Align />
            <CardBlur />
            <CardLevel />
            <Exampels />
            <Links />
        </Container>
    );
}

const Howtouze = () => (
    <>
        <Card>
            <Row>
                <span>
                    <code>{'import { Card } from "@yakad/ui"'}</code>
                    <br />
                    <br />
                    <code>{"<Card>Card</Card>"}</code>
                </span>
                <Spacer />
                <Button icon={<Symbol icon="content_copy" />}></Button>
            </Row>
        </Card>
    </>
);

const Align = () => (
    <>
        <h3>Align</h3>
        <p>Align the content to the center, right, or left.</p>
        <Card align="space" style={{ gap: "2rem" }}>
            <Card
                align="start"
                level="high"
                style={{
                    maxWidth: "60rem",
                    height: "20rem",
                }}
            >
                <Text>Start</Text>
                <Text>Start</Text>
            </Card>
            <Card
                align="space"
                level="high"
                style={{
                    maxWidth: "60rem",
                    height: "20rem",
                }}
            >
                <Text>Space</Text>
                <Text>Space</Text>
            </Card>
            <Card
                align="center"
                level="high"
                style={{
                    maxWidth: "60rem",
                    height: "20rem",
                }}
            >
                <Text>Center</Text>
                <Text>Center</Text>
            </Card>
            <Card
                align="end"
                level="high"
                style={{
                    maxWidth: "60rem",
                    height: "20rem",
                }}
            >
                <Text>End</Text>
                <Text>End</Text>
            </Card>
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
                    <Th>Default</Th>
                    <Th>Required</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>align</Td>
                    <Td>start | space | center | end</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>fullWidthOnParentDemand</Td>
                    <Td>boolean</Td>
                    <Td>true</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>blur</Td>
                    <Td>boolean</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>level</Td>
                    <Td>transparent | low | mid | high</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
        <p>Also, the Card accepts the default attributes of a div elemnt.</p>
    </>
);

const CardBlur = () => (
    <>
        <h3>Blur</h3>
        <p>
            This is a sample text that is displayed through the blur effect.
            This effect gives a beautiful and modern look to the design.
        </p>
        <Card style={{ maxWidth: "70rem" }}>
            <p style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Numquam a eveniet ex nostrum quod quaerat eius omnis officiis,
                recusandae facilis illo voluptate aut dignissimos libero quos,
                at nobis! Saepe, nam. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quae in aut at, aperiam commodi saepe odit
                quod est voluptate deserunt. Ut veniam, in aliquam ducimus
                voluptatibus esse et velit fuga!
            </p>
            <Card
                align="center"
                blur
                style={{
                    marginTop: "-7rem",
                    height: "10rem",
                }}
            >
                Card Blur
            </Card>
        </Card>
    </>
);

const CardLevel = () => (
    <>
        <h3>Level</h3>
        <p>
            Manually select a level to change the card's background color, or
            leave it on auto.
        </p>
        <Card align="center" style={{ maxWidth: "400rem" }}>
            <Card align="center">
                <Card align="center">
                    <Text variant="body4">High Level</Text>
                </Card>
                <Text variant="body5" style={{ marginTop: "1rem" }}>
                    Mid Level
                </Text>
            </Card>
            <Text variant="body6" style={{ marginTop: "1rem" }}>
                Low Level
            </Text>
        </Card>
    </>
);

const Exampels = () => (
    <>
        <h2>Examples</h2>

        <p>yakad cards are here to edit your site professionally!</p>
        <h3>Example 1</h3>
        <p>
            Working with these cards is very easy and you can easily organize
            your site with it cards. An example of a card using a grid:
        </p>
        <Example1 />
        <h3>Example 2</h3>
        <p>
            You can put anything you want inside the cards, such as: text,
            photo, video and...
        </p>
        <Example2 />
        <h3>Example 3</h3>
        <p>You can even put a very large text inside using Yakad Card.</p>
        <Example3 />
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
