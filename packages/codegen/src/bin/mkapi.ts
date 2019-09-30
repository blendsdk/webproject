import chalk from "chalk";
import { generateRestFramework } from "@blendsdk/codekit";
import { tokenAuthSpec } from "../specs";
import { fromRoot } from "./utils";

const command = process.argv[2] || "";

(async () => {
    switch (command) {
        case "--gen-routes":
            generateRoutes();
            break;
        default:
            console.log(chalk.yellow("No command specified! Use --gen-routes"));
            break;
    }
})();

function generateRoutes() {
    console.log(chalk.green("Creating TokenAuthentication API"));
    generateRestFramework(tokenAuthSpec, {
        routerOutFile: fromRoot("packages/token-auth/src/routes.ts"),
        routerTypesOutFile: fromRoot("packages/token-auth/src/types/route_types.ts"),
        clientOutFile: fromRoot("temp/src/api/client.ts"),
        clientTypesOutFile: fromRoot("temp/src/api/api_types.ts")
    });
}
