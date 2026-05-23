import fs from "node:fs";
import path from "node:path";
import { PATHS } from "./constants/path";

async function saveRedisFile(url: string): Promise<Error | boolean> {
    const configPath = path.join(__dirname, "../../", PATHS.REDIS_CONFIG_DIR);
    // we are asuming that .redis directory is already created so.

    if (!fs.existsSync(configPath)) {
        fs.mkdirSync(configPath);
    }

    // if the data already exists then we wil not overwrite it, we will just return true.
    if (fs.existsSync(`${configPath}/${PATHS.REDIS_CONFIG_FILE}`)) {
        const content = await fs.promises.readFile(`${configPath}/${PATHS.REDIS_CONFIG_FILE}`, 'utf-8');
        if (content) {
            return true;
        }
    }

    const data = {
        "connections": [
            {
                "name": "default",
                "url": url
            }
        ]
    }

    await fs.promises.writeFile(`${configPath}/${PATHS.REDIS_CONFIG_FILE}`, JSON.stringify(data), 'utf-8');

    return true;
}


async function verifyConfig() : Promise<Error | boolean> {
    const configPath = path.join(__dirname, "../../", PATHS.REDIS_CONFIG_DIR);
    const content = await fs.promises.readFile(`${configPath}/${PATHS.REDIS_CONFIG_FILE}`, 'utf-8');

    if (!fs.existsSync(`${configPath}/${PATHS.REDIS_CONFIG_FILE}`) || !fs.existsSync(configPath) || JSON.parse(content).connections.length <= 0) {
        return false
    }
    
    return true;
}

// saveRedisFile("redis://localhost:6379").then((result) => {
//     if (result instanceof Error) {
//         console.error("Error saving Redis URL:", result);
//     } else {
//         console.log("Redis URL saved successfully.");
//     }
// }).catch((error) => {
//     console.error("Unexpected error:", error);
// });



export {
    saveRedisFile,
    verifyConfig
}