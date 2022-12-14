import { Anchor, ListItem, UnorderedList, Text, Button } from '@hope-ui/solid';
import { A } from '@solidjs/router';
import { createResource, For } from 'solid-js';
import { client } from '../services/feathers';

export default function List() {

    const items = client.service('items');

    const [data, { mutate, refetch }] = createResource<any[]>(() => {
        return items.find().then(res => res.data)
    });

    return (
        <>
            <Text>{data.loading && 'Loading...'}</Text>
            <UnorderedList>
                <For each={data()}>
                    {(item) => <ListItem><Anchor as={A} href={`/item/${item.id}`}>{item.label}</Anchor></ListItem>}
                </For>
            </UnorderedList>

            <A href="/new"><Button>Add New</Button></A>
        </>

    )
}