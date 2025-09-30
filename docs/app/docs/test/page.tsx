import { Container, LoadingControlV4 } from "../../../../packages/ui/src";
import { Time } from "./Time";

export default function Page() {
    return (
        <Container size="md">
            {/* <LoadingControl>
                <Time />
            </LoadingControl> */}
            <LoadingControlV4>
                {Array.from({ length: 100 }).map((_, i) => (
                    <Time key={i} index={i} />
                ))}
            </LoadingControlV4>
        </Container>
    );
}
