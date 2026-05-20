import redis from 'ioredis';
import fs from 'node:fs';

async function connectToRedis() {
    const redisUrl = fs.readFileSync('redisUrl.txt', 'utf8');

    const client = new redis(redisUrl);

    client.on('connect', () => {
        return true;
    });
    client.on('error', (err) => {
        return err;
    });

    return client;
}

export {
    connectToRedis
};