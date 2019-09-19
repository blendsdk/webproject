import chalk from "chalk";
import * as path from "path";
import { asyncForEach, wrapInArray } from "@blendsdk/stdlib";
import { generateInterfacesFromTables, generateDataAccessLayer } from "@blendsdk/codekit";
import { createConnection, closeConnection } from "@blendsdk/sqlkit";
import { database } from "../dbschema";
import { loadConfiguration } from "@blendsdk/express";
import { fromRoot } from "./utils";

loadConfiguration([
    fromRoot("config", "config.base.json"),
    fromRoot("config", "config.codegen.json")
]);

const command = process.argv[2] || "";

(async () => {
    switch (command) {
        case "--gen-types":
            generateDatabaseTypes();
            break;
        case "--gen-database":
            generateDatabase();
            break;
        default:
            console.log(chalk.yellow("No command specified! Use --gen-types or --gen-database"));
            break;
    }
})();

function showEnv() {
    console.log("-".repeat(80));
    console.log(`PGHOST: ${chalk.green(process.env.PGHOST)}`);
    console.log(`PGDATABASE: ${chalk.green(process.env.PGDATABASE)}`);
    console.log(`CODE_GEN_DBTYPES: ${chalk.green(process.env.CODE_GEN_DBTYPES)}`);
    console.log("-".repeat(80));
}

async function generateDatabase() {
    showEnv();
    const connection = createConnection();
    console.log(chalk.green("Creating DB Tables"));
    const sql = database.create();
    await asyncForEach(sql, async stmt => {
        await connection.query(stmt);
        process.stdout.write(".");
    });
    console.log();
    await closeConnection();
}

function generateDatabaseTypes() {
    showEnv();
    (process.env.CODE_GEN_DBTYPES || "").split(",").forEach(fileName => {
        fileName = fromRoot(fileName);
        console.log(chalk.green("Generating Database Types: " + fileName));
        generateInterfacesFromTables(fileName, database.getTables());
    });
}