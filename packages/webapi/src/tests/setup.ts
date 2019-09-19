import dotenv from "dotenv";
import { asyncForEach } from "@blendsdk/stdlib";
import { createConnection, closeConnection as closeConnectionServer } from "@blendsdk/sqlkit";
import { database } from "../../schema/database";
import * as fs from "fs";
import * as path from "path";

dotenv.config({ path: ".env.test" });

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

export async function rebuildDatabase(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Rebuilding database: " + process.env.PGDATABASE);
            const sql = database.create(),
                connection = openConnection();
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

export async function seedDatabase(sqlFile: string) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`Seeding database ${process.env.PGDATABASE} ${sqlFile}`);
            const sql = fs
                    .readFileSync(path.join(process.cwd(), "src", "tests", sqlFile))
                    .toString()
                    .split(";"),
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
