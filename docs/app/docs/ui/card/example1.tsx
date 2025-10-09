import { GridContainer, GridItem, Card } from "@yakad/ui";

export default function Example1() {
    return (
        <GridContainer>
            <GridItem xs={12} md={6} xl={4}>
                <Card level="high" align="center">
                    <p>Card</p>
                </Card>
            </GridItem>
            <GridItem xs={12} md={6} xl={4}>
                <Card level="mid" align="center">
                    <p>Card</p>
                </Card>
            </GridItem>
            <GridItem xs={12} md={6} xl={4}>
                <Card level="low" align="center">
                    <p>Card</p>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
