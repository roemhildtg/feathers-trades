import { Button, Heading, Input, InputGroup, InputLeftAddon, VStack } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { client } from "../services/feathers";

export default function Create() {
    const [title, setTitle] = createSignal('');
    const [descr, setDescr] = createSignal('');
    const [amount, setAmount] = createSignal(0);
    const nav = useNavigate();

    function createItem(title: string, descr: string, amount: number) {
        return client.service('items').create({
            label: title,
            description: descr,
            price_estimate: amount,
        }).then(() => nav('/list'))
    }

    return (
        <>
            <VStack spacing="$4">
                <Heading>Create new item</Heading>
                <Input placeholder="Item title" value={title()} oninput={(e) => setTitle(e.currentTarget.value)}></Input>
                <Input placeholder="Item description" value={descr()} onInput={(e) => setDescr(e.currentTarget.value)}></Input>
                <InputGroup>
                    <InputLeftAddon>$</InputLeftAddon>
                    <Input placeholder="Item cost (estimated)" value={amount()}
                        onInput={(e) => setAmount(parseFloat(e.currentTarget.value))}></Input>
                </InputGroup>
                <Button type="submit" color="$primary1" onClick={() => createItem(title(), descr(), amount())}>Upload Item</Button>
            </VStack>

        </>
    )
}