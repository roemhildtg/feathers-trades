import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, CloseButton, Heading, HStack, Input, InputGroup, InputLeftAddon, VStack } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

import { client } from "../services/feathers";

export interface IMessage {
    level?: 'info' | 'success' | 'warning' | 'danger';
    header?: string;
    message?: string;
}

export default function Login() {
    const [email, setEmail] = createSignal('');
    const [pass, setPass] = createSignal('');
    const [message, setMessage] = createSignal<IMessage>({ message: '' });
    const navigate = useNavigate();

    function alert(opt: IMessage) {
        setMessage({
            header: '',
            level: 'info',
            message: '',
            ...opt,
        })
    }

    function login(user: string, pass: string) {
        setMessage({ level: undefined })
        return client.authenticate({
            strategy: 'local',
            email: user,
            password: pass,
        })
            .then(() => navigate('/list'))
            .catch(e => alert({ level: 'danger', header: 'Error', message: e.message }))
    }

    function register(user: string, pass: string) {
        setMessage({ level: undefined })
        return client.service('users').create({
            email: user,
            password: pass,
        })
            .then(() => alert({ message: 'User account created. Please sign in' }))
            .catch(e => alert({ level: 'danger', header: 'Error', message: e.message }))
    }

    return (
        <>
            <VStack spacing="$4">

                <Show when={message().level}>
                    <Alert status={message().level} width="$full">
                        <AlertIcon mr="$2_5" />
                        <AlertTitle mr="$2_5">{message().header}</AlertTitle>
                        <AlertDescription>{message().message}</AlertDescription>
                        <CloseButton position="absolute" right="8px" top="8px" />
                    </Alert>
                </Show>

                <Heading>Login</Heading>
                <Input placeholder="Username" value={email()} oninput={(e) => setEmail(e.currentTarget.value)}></Input>
                <Input placeholder="Password" type="password" value={pass()} onInput={(e) => setPass(e.currentTarget.value)}></Input>

                <HStack spacing="$4">
                    <Button type="submit" color="$primary1" onClick={() => register(email(), pass())}>Register</Button>
                    <Button type="submit" color="$primary1" onClick={() => login(email(), pass())}>Login</Button>
                </HStack>


            </VStack>


        </>
    )
}