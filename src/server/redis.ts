import Redis from 'ioredis';

async function connectToRedis(redisUrl: string): Promise<Error | Redis> {
    const client = new Redis(redisUrl);

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