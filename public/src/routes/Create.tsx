import { Button, Heading, Input, InputGroup, InputLeftAddon, VStack } from "@hope-ui/solid";
import { createSignal } from "solid-js";
import { createItem } from "../services/items";

export default function Create() {
    const [title, setTitle] = createSignal('');
    const [descr, setDescr] = createSignal('');
    const [amount, setAmount] = createSignal(0);

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
                <Button type="submit" color="$primary1" onClick={() => createItem({
                    label: title(),
                    description: descr(),
                    price_estimate: amount(),
                })}>Upload Item</Button>
            </VStack>

        </>
    )
}