import { Heading, Text } from "@hope-ui/solid";
import { A, useParams } from "@solidjs/router"
import { createResource } from "solid-js";
import { client } from "../services/feathers";
import { getItem, IItem } from "../services/items";


export default function Item() {
    const params = useParams();
    const items = client.service('items');

    // fetch user based on the id path parameter
    const [item] = createResource<IItem>(() => items.get(parseInt(params.id, 10)));

    return (
        <>
            <Heading>{item()?.label}: ${item()?.price_estimate}</Heading>
            <Text>{item()?.description}</Text>

            <Text><A href="/list">Back</A></Text>
        </>
    )
}