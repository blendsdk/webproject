import chalk from "chalk";
import * as path from "path";
import { asyncForEach, wrapInArray, ensureFilePath } from "@blendsdk/stdlib";
import { generateInterfacesFromTables, generateDataAccessLayer } from "@blendsdk/codekit";
import { createConnection, closeConnection } from "@blendsdk/sqlkit";
import { database } from "../dbschema";
import { fromRoot } from "./utils";
import { ConfigurationService } from "@blendsdk/webapi-config";

interface IConfig {
    PG_HOST?: string;
    PG_DATABASE?: string;
    CODE_GEN_DBTYPES?: string | string[];
}

const config = new ConfigurationService<IConfig>([
    fromRoot("config", "config.base.js"),
    fromRoot("config", "config.%NODE_ENV%.js"),
    fromRoot("config", ".config.local.js"),
    fromRoot("config", "config.codegen.js")
]).getConfig();

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
    console.log(`PG_HOST: ${chalk.green(config.PG_HOST)}`);
    console.log(`PG_DATABASE: ${chalk.green(config.PG_DATABASE)}`);
    console.log(`CODE_GEN_DBTYPES: ${chalk.green(wrapInArray(config.CODE_GEN_DBTYPES).join(", "))}`);
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
    wrapInArray<string>(config.CODE_GEN_DBTYPES || []).forEach(fileName => {
        fileName = fromRoot(fileName);
        console.log(chalk.green("Generating Database Types: " + fileName));
        ensureFilePath(fileName);
        generateInterfacesFromTables(fileName, database.getTables());
    });
}
