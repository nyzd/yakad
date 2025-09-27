import { Container, LoadingControl } from "../../../../packages/ui/src";
import { Time } from "./Time";

export default function Page() {
    return (
        <Container size="md">
            <LoadingControl>
                <Time />
            </LoadingControl>
        </Container>
    );
}
