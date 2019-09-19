import { asyncForEach } from "@blendsdk/stdlib";
import { createConnection, closeConnection as closeConnectionServer } from "@blendsdk/sqlkit";
import * as fs from "fs";
import * as path from "path";
import { getConfig } from "../config";
import { initializeDatabase } from "../database";

process.env.NODE_ENV = "test";

const config = getConfig();
initializeDatabase();

export const openConnection = () => {
    return createConnection();
};

export const closeConnection = (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            await closeConnectionServer();
            resolve(true);
        } catch (err) {
            console.log(err);
            reject(false);
        }
    });
};

export async function seedDatabase(sqlFile: string) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`Seeding database ${config.PG_DATABASE} ${sqlFile}`);
            const sql = fs
                    .readFileSync(path.join(process.cwd(), "src", "tests", sqlFile))
                    .toString()
                    .split("///"),
                connection = await openConnection();
            await asyncForEach(sql, async stmt => {
                await connection.query(stmt);
                process.stdout.write(".");
            });
            resolve(true);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}
