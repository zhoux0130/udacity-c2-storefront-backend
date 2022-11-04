
import dotenv from 'dotenv';
import { Pool } from "pg";

dotenv.config();

const {
    DB_HOST,
    DB_NAME,
    TEST_DB_NAME,
    DB_USER,
    DB_PORT,
    DB_PASSWORD,
    ENV
} = process.env;

let Client: Pool;


if (ENV === "dev") {
    Client = new Pool({
        host: DB_HOST,
        database: DB_NAME,
        ...(DB_PORT && { port: parseInt(DB_PORT) }),
        user: DB_USER,
        password: DB_PASSWORD
    });
} else if (ENV === "test") {
    Client = new Pool({
        host: DB_HOST,
        database: TEST_DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD
    });
} else {
    Client = new Pool({
        host: DB_HOST,
        database: DB_NAME,
        ...(DB_PORT && { port: parseInt(DB_PORT) }),
        user: DB_USER,
        password: DB_PASSWORD
    });
}

export default Client;