import fs from "node:fs";

async function saveRedisFile(url: string): Promise<Error | boolean> {

    fs.writeFile("redisUrl.txt" , url , 'utf-8', (err) => {
        if (err) {
            return err
          }
    })

    return true;
}

export {
    saveRedisFile
}