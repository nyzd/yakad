import { Container, LoadingControlV2 } from "../../../../packages/ui/src";
import { Time } from "./Time";

export default function Page() {
    return (
        <Container size="md">
            <LoadingControlV2>
                <Time />
            </LoadingControlV2>
        </Container>
    );
}
