import { Button, HStack } from "@hope-ui/solid";
import { A } from "@solidjs/router";

export default function Nav() {
    return (
        <>
            <HStack spacing="$2">
                <A href="/"><Button>Home</Button></A>
                <A href="/list"><Button>List</Button></A>
                <A href="/login"><Button>Login</Button></A>
            </HStack>
        </>
    )
}