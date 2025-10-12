import { Symbol } from "@yakad/symbols";
import {
    Button,
    Container,
    Row,
    Stack,
    Hr,
    Card,
    Table,
    Tr,
    Th,
    Td,
    Thead,
    Tbody,
    Spacer,
} from "@yakad/ui";

export default function Page() {
    return (
        <>
            <Container size="md">
                <h1>Buttons</h1>
                <Hr />
                <p>
                    Buttons allow users to take actions, and make choices, with
                    a single tap.
                </p>
                <Howtouze />
                <Properties />
                <Size />
                <Variant />
                <BorderStyle />
                <Fabsize />
                <Icon />
            </Container>
            <ButtonLoading />
        </>
    );
}
const Howtouze = () => (
    <>
        <Card>
            <Row>
                <span>
                    <code>{'import { Button } from "@yakad/ui"'}</code>
                    <br />
                    <br />
                    <code>{"<Button>Button</Button>"}</code>
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
                    <Th>Default</Th>
                    <Th>Required</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>fullWidthOnParentDemand</Td>
                    <Td>boolean</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>size</Td>
                    <Td>small | medium | large </Td>
                    <Td>medium</Td>
                    <Td>
                        <Symbol type="sharp" icon="check"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>varient</Td>
                    <Td>
                        text | outlined | filled | filledtonal | tonal |
                        elevated | link | fab
                    </Td>
                    <Td>text</Td>
                    <Td>
                        <Symbol type="sharp" icon="check"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>borderStyle</Td>
                    <Td>none | semi | squircle | rounded</Td>
                    <Td>rounded</Td>
                    <Td>
                        <Symbol type="sharp" icon="check"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>icon</Td>
                    <Td>React.ReactNode</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>iconPosition</Td>
                    <Td>start | end</Td>
                    <Td>start</Td>
                    <Td>
                        <Symbol type="sharp" icon="check"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>loadingPosition</Td>
                    <Td>auto | center</Td>
                    <Td>auto</Td>
                    <Td>
                        <Symbol type="sharp" icon="check"></Symbol>
                    </Td>
                </Tr>
                <Tr>
                    <Td>loadingVariant</Td>
                    <Td>scaleOut | dots | spinner</Td>
                    <Td>undefined</Td>
                    <Td>
                        <Symbol type="sharp" icon="close"></Symbol>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    </>
);
const Size = () => (
    <>
        <p>Also, the AppBar accepts the default attributes of a Html elemnt.</p>
        <h3>Size:</h3>
        <p>you can use different size button.</p>
        <Card
            align="center"
            style={{
                maxWidth: "60rem",
                margin: "auto",
            }}
        >
            <Row
                style={{
                    justifyContent: "center",
                }}
            >
                <Button variant="filledtonal" size="small">
                    SMALL
                </Button>
                <Button variant="filledtonal" size="medium">
                    MEDIUM
                </Button>
                <Button variant="filledtonal" size="large">
                    LARGE
                </Button>
            </Row>
        </Card>
    </>
);

const Variant = () => (
    <>
        <h3>Variant:</h3>
        <p>
            Here you can see different models and colors of buttons, which can
            be called with the variant property.
        </p>
        <Card
            align="center"
            style={{
                maxWidth: "60rem",
                padding: "50px",
                margin: "auto",
            }}
        >
            <Row
                style={{
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                <Button variant="elevated">ELEVATED</Button>
                <Button variant="fab">FAB</Button>
                <Button variant="filled">FILLED</Button>
                <Button variant="filledtonal">FILLEDTONAL</Button>
            </Row>

            <Row
                style={{
                    justifyContent: "center",
                }}
            >
                <Button variant="link">LINK</Button>
                <Button variant="outlined">OUTLINEDE</Button>
                <Button variant="text">TEXT</Button>
                <Button variant="tonal">TONAL</Button>
            </Row>
        </Card>
    </>
);

const BorderStyle = () => (
    <>
        <h3>borderStyle:</h3>
        <p>
            With this feature, you can easily and beautifully change the style
            of the button borders.
        </p>

        <Card
            align="center"
            style={{
                maxWidth: "60rem",
                padding: "50px",
                margin: "auto",
            }}
        >
            <Row
                style={{
                    justifyContent: "center",
                }}
            >
                <Button variant="filledtonal" borderStyle="none">
                    NONE
                </Button>
                <Button variant="filledtonal" borderStyle="rounded">
                    ROUNDED
                </Button>
                <Button variant="filledtonal" borderStyle="semi">
                    SEMI
                </Button>
                <Button variant="filledtonal" borderStyle="squircle">
                    squircle
                </Button>
            </Row>
        </Card>
    </>
);

const Fabsize = () => (
    <>
        <h3>FAB size:</h3>
        <p>Different sizes of buttons with variant fab</p>
        <Card
            align="center"
            style={{
                maxWidth: "60rem",
                margin: "auto",
            }}
        >
            <Stack>
                <Row
                    style={{
                        justifyContent: "center",
                    }}
                >
                    <Button variant="fab" size="small">
                        SMALL
                    </Button>
                    <Button variant="fab" size="medium">
                        MEDIUM
                    </Button>
                    <Button variant="fab" size="large">
                        LARGE
                    </Button>
                </Row>
                <Row
                    style={{
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="fab"
                        size="small"
                        icon={<Symbol icon="add" />}
                    ></Button>
                    <Button
                        variant="fab"
                        size="medium"
                        icon={<Symbol icon="add" />}
                    ></Button>
                    <Button
                        variant="fab"
                        size="large"
                        icon={<Symbol icon="add" />}
                    ></Button>
                </Row>
            </Stack>
        </Card>
    </>
);

const Icon = () => (
    <>
        <h3>icon:</h3>
        <p>
            With this property, you can easily add different icons on your
            buttons.
        </p>
        <Card
            align="center"
            style={{
                maxWidth: "60rem",
                padding: "50px",
                margin: "auto",
            }}
        >
            <Row
                style={{
                    justifyContent: "center",
                }}
            >
                <Button variant="outlined" icon={<Symbol icon="search" />}>
                    Search
                </Button>
                <Button
                    iconPosition="end"
                    variant="outlined"
                    icon={<Symbol icon="search" />}
                >
                    Search
                </Button>
                <Button
                    variant="outlined"
                    icon={<Symbol icon="search" />}
                ></Button>
            </Row>
        </Card>
    </>
);

function ButtonLoading() {
    return (
        <Container size="md">
            <h3>Loading:</h3>
            <p>With this option, you can put a loading sign on the buttons</p>
            <Card align="center" style={{ maxWidth: "60rem", margin: "auto" }}>
                <Row style={{ justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingPosition="auto"
                        loadingVariant="dots"
                        disabled
                    >
                        Loading
                    </Button>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingPosition="auto"
                        loadingVariant="dots"
                        iconPosition="end"
                        disabled
                    >
                        Loading
                    </Button>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingPosition="auto"
                        loadingVariant="dots"
                        iconPosition="end"
                        disabled
                    ></Button>
                </Row>
                <Row style={{ justifyContent: "center", padding: "20px" }}>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingPosition="auto"
                        loadingVariant="scaleOut"
                        disabled
                    >
                        Loading
                    </Button>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingPosition="auto"
                        loadingVariant="scaleOut"
                        iconPosition="end"
                        disabled
                    >
                        Loading
                    </Button>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingPosition="auto"
                        loadingVariant="scaleOut"
                        disabled
                    ></Button>
                </Row>

                <Row style={{ justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingPosition="auto"
                        loadingVariant="spinner"
                        disabled
                    >
                        Loading
                    </Button>{" "}
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingPosition="auto"
                        loadingVariant="spinner"
                        iconPosition="end"
                        disabled
                    >
                        Loading
                    </Button>{" "}
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingPosition="auto"
                        loadingVariant="spinner"
                        disabled
                    ></Button>
                </Row>
            </Card>
            <h3>Loading Variant:</h3>
            <p>
                And this is also different loading models that you can use
                whichever you like.
            </p>
            <Card style={{ maxWidth: "60rem", margin: "auto" }}>
                <Row>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingVariant="dots"
                        loadingPosition="auto"
                        disabled
                    >
                        Loading
                    </Button>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingVariant="scaleOut"
                        disabled
                    >
                        Loading
                    </Button>
                    <Button
                        variant="outlined"
                        icon={<Symbol icon="search" />}
                        loadingVariant="spinner"
                        disabled
                    >
                        Loading
                    </Button>
                </Row>
            </Card>
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
        </Container>
    );
}
