import redis, { createClient } from 'redis'

const client = createClient({
    url: 'redis://redis-database:6379'
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Error on Redis:', err);
});

client.connect();

export { client }