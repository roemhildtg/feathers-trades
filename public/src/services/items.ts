
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzAyOTcyOTQsImV4cCI6MTY3MDM4MzY5NCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjEiLCJqdGkiOiIwYWI2OTc1OC1hYmM4LTRjYjktYTJjZi0wNzEzMTU2MGQ0ZGUifQ.laoDhl6WEVDj5dLibfcR19rSsZXvzOwkTztywioAczc';


export interface IItem {
    label: string;
    description: string;
    price_estimate: number;
}

export interface IItemCreated extends IItem {
    id: number;
}

export async function getItems() {
    const items = await fetch('/api/items', { headers: { Authorization: token } })
        .then(result => result.json())
        .then(res => res.data);
    return items;
}

export async function getItem(id: number) {
    const item = await fetch(`/api/items/${id}`, { headers: { Authorization: token } })
        .then(result => result.json())

    return item;
}

export async function createItem(i: IItem): Promise<IItemCreated> {
    const item = await fetch('/api/items/', { method: 'POST', headers: { Authorization: token }, body: JSON.stringify(i) })
        .then(result => result.json())
    return item;
}