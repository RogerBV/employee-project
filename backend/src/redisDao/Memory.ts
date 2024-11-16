import { client } from './Connection'

async function saveKeyValue(key, value) {
    await client.set(key, value);
    console.log(`Saved: ${key} = ${value}`);
}

async function getValueByKey(key) {
    const valor = await client.get(key);
    return valor;
}

export { saveKeyValue, getValueByKey }