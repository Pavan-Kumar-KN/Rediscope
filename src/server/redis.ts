import redis from 'ioredis';
import fs from 'node:fs';

function connectToRedis(){
    const redisUrl = fs.readFileSync('redisurl.txt', 'utf8');
    const client = new redis(redisUrl);
    client.on('connect', () => {
        console.log('Connected to Redis');
    });
    client.on('error', (err) => {
        console.error('Redis error:', err);
    });
    return client;
}

export {
    connectToRedis
};